import { Router } from 'express'
import { join, dirname, basename } from 'path'
import { globIterateSync } from 'glob'
import { Provider } from '@/utils/ProviderHelper.js'

const router = Router()
const controllerPath = join(process.cwd(), 'src/http/controllers')

const register = async (path: string) => {
  const [folder, file] = ['/' + (dirname(path) === '.' ? '' : dirname(path)), basename(path)]
  const filepath = join(controllerPath, path)

  const { router: subroute } = await import(filepath)

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
