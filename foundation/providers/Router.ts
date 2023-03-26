import { Handler, Router } from 'express'
import { join, dirname, basename, parse } from 'path'
import { globIterateSync } from 'glob'
import { Provider } from '@/utils/ProviderHelper.js'

const router = Router()
const controllerPath = join(process.cwd(), 'src/http/controllers')
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

const normalizeHandlers = (handler: Handler|Handler[]) => {
  return Array.isArray(handler) ? handler : [handler]
}

const mergeHandlers = (...handlers: (Handler|Handler[]|undefined)[]) => {
  return handlers.filter(Boolean).map(normalizeHandlers as any).flat() as Handler[]
}

const bindURI = (mod: any, folder: string, filename: string) => {
  const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']
  const { name } = parse(filename)
  const uri = name === 'index' ? folder : `${folder !== '/' ? folder : ''}/${name}`

  for (const method of methods) {
    const handler = mod[method]

    if (handler) {
      router[method](uri, ...mergeHandlers(mod.middleware, handler))
    }
  }
}

const register = async (path: string) => {
  const [folder, file] = ['/' + (dirname(path) === '.' ? '' : dirname(path)), basename(path)]
  const filepath = join(controllerPath, path)

  const mod = await import(filepath)

  if (mod.router) {
    return router.use(folder, mod.router)
  }

  bindURI(mod, folder, file)
}

export const provider: Provider = async ({ express, logger }) => {
  for (const file of globIterateSync('**/*.ts', { cwd: controllerPath })) {
    await register(file)
  }

  express.use(router)
  logger.info('Router initialized')
}

export const defineHandler = (handler: Handler, ...middlewares: Handler[]) => {
  return [...middlewares, handler]
}
