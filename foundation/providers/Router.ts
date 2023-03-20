import { Router } from 'express'
import { join, dirname, basename } from 'path'
import { globIterateSync } from 'glob'
import { Provider } from '@/utils/ProviderHelper.js'

const router = Router()
const controllerPath = join(process.cwd(), 'src/http/controllers')

const register = async (path: string) => {
  const [folder, file] = ['/' + (dirname(path) === '.' ? '' : dirname(path)), basename(path)]
  const filepath = join(controllerPath, path)

  const { router: subroute, middleware, default: module } = await import(filepath)

  if (file.startsWith('_middleware')) {
    const middlewares = module ? (Array.isArray(module) ? module : [module]) : undefined
    return middlewares && router.use(folder, ...middlewares)
  }

  const middlewares = middleware ? (Array.isArray(middleware) ? middleware : [middleware]) : undefined

  if (subroute && middlewares) {
    return router.use(folder, ...middlewares, subroute)
  }

  if (subroute) {
    return router.use(folder, subroute)
  }
}

export const provider: Provider = async ({ express, logger }) => {
  for (const file of globIterateSync('**/*.ts', { cwd: controllerPath })) {
    await register(file)
  }

  express.use(router)
  logger.info('Router initialized')
}
