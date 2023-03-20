import { EventEmitter } from 'events'

export type CycleParams = {
  after: () => unknown
  shutdown: () => unknown
}

export type CycleEvents = keyof CycleParams

export interface CycleEmitter extends EventEmitter {
  on<T extends CycleEvents>(event: T, listener: CycleParams[T]): this
}

export const emitter: CycleEmitter = new EventEmitter()

export const emitWait = (event: keyof CycleParams) => Promise.all(
  emitter.listeners(event).map((listener) => listener())
)
