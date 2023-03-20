import { createApplication } from '@/Application'
import { provider as routerProvider } from '@/providers/Router'
import { provider as shutdownProvider } from '@/providers/ShutdownProvider'
import { bindAutoloadProviders, defineProvider } from '@/utils/ProviderHelper'
import { emitWait } from '@/utils/Cycle'

const port = process.env.APP_PORT || 3000

const main = async () => {
  const { http, logger } = createApplication()

  await bindAutoloadProviders()
  await defineProvider(routerProvider)
  await defineProvider(shutdownProvider)

  http.listen(port, () => {
    emitWait('after')
    logger.info(`Server started on port ${port}`)
  })
}

main()
