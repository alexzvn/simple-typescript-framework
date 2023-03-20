import { defineProvider } from '@/utils/ProviderHelper'
import chalk from 'chalk'
import { Handler } from 'express'
import ExampleMiddleware from '~/http/middlewares/ExampleMiddleware'

type MiddlewareMap = {
  [key: string]: Handler|Handler[]
}

const middlewares: MiddlewareMap = {
  // '/': ExampleMiddleware,
  // '/': [ExampleMiddleware, ExampleMiddleware],
}

export default defineProvider(({ express, logger }) => {
  const output = []

  for (const [path, middleware] of Object.entries(middlewares)) {
    Array.isArray(middleware)
      ? express.use(path, ...middleware)
      : express.use(path, middleware)

    const handlers = Array.isArray(middleware) ? middleware : [middleware]
    const list  = handlers.map(handler => handler.name).join(', ')
    output.push(`[HTTP] ${chalk.yellow(path)} -> ${chalk.green(list)}`)

    express.use(path, ...handlers)
  }

  logger.info('MiddlewareProvider initialized')
})
