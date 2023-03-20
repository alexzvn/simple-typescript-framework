import { EventEmitter } from 'events'
import { Request } from 'express'

export type CycleParams = {
  after: () => unknown
  shutdown: () => unknown
  request: (req: Request) => unknown
}

export type CycleEvents = keyof CycleParams

type EventParams<T extends CycleEvents> = Parameters<CycleParams[T]>
type EventHandler<T extends CycleEvents> = (...e: EventParams<T>) => unknown
type EmitWaiter = (event: CycleEvents, ...params: EventParams<typeof event>) => Promise<unknown>|unknown

export interface CycleEmitter extends EventEmitter {
  on(event: CycleEvents, listener?: EventHandler<typeof event>): this
  emit(event: CycleEvents, ...params: EventParams<typeof event>): boolean
}

export const emitter: CycleEmitter = new EventEmitter()

export const emitWait: EmitWaiter = (event, ...params) => Promise.all(
  emitter.listeners(event).map((listener) => listener(...params))
)
