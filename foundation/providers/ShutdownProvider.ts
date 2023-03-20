import { emitWait } from '@/utils/Cycle'
import { Provider } from '@/utils/ProviderHelper'

/**
 * Gracefully shutdown application providers
 */
export const provider: Provider = ({ http, logger }) => {
  process.on('SIGTERM', async () => {
    await emitWait('shutdown')

    http.close(() => {
      logger.info('Gracefully shutting down application')
    })

    process.exit(0)
  })
}
