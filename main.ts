import { createApplication } from '@/Application'
import { provider as routerProvider } from '@/providers/Router'
import { bindAutoloadProviders, defineProvider } from '@/utils/ProviderHelper'

const port = process.env.APP_PORT || 3000

const main = async () => {
  const { http, logger } = createApplication()

  await bindAutoloadProviders()
  await defineProvider(routerProvider)

  http.listen(port, () => {
    logger.info(`Server started on port ${port}`)
  })

  process.on('SIGTERM', async () => {
    http.close(() => {
      logger.info('Gracefully shutting down application')
    })
  
    process.exit(0)
  })
}


main()
