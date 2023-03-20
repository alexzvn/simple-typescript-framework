import express, { Express } from 'express'
import { IncomingMessage, Server, ServerResponse, createServer } from 'http'
import { Logger } from 'winston'
import { logger } from './utils/Logger'
import { emitter, CycleEvents } from './utils/Cycle'

const hook = (event: CycleEvents, fn: () => unknown) => {
  emitter.on(event, fn)
}

export interface Application {
  express: Express
  logger: Logger
  hook: typeof hook
  http: Server<typeof IncomingMessage, typeof ServerResponse>
}

export let $app: Application

export const createApplication = (): Application => {
  const app = express()
  const http = createServer(app)

  app.use((req, res, next) => {
    req.$app = $app
    emitter.emit('request', req)
    next()
  })

  return $app = { express: app, logger, http, hook } as any
}

declare global {
  namespace Express {
    interface Request {
      $app: typeof $app
    }
  }
}
