import { Application, $app } from '@/Application'
import { globIterate } from 'glob'

export interface Provider {
  (app: Application): Partial<ProviderRegistry>|Promise<Partial<ProviderRegistry>>|Promise<void>|void
}

export interface ProviderRegistry {
  provide: {
    [key: string]: any
  }
}

export const defineProvider = async (provider: Provider) => {
  const data = await provider($app)

  if (! data) {
    return
  }

  if (data.provide) {
    for (const [key, value] of Object.entries(data.provide)) {
      ($app as any)['$' + key] = value
    }
  }
}

export const bindAutoloadProviders = async () => {
  const files = globIterate(process.cwd() + '/src/providers/**/*.ts')

  for await (const file of files) {
    const mod = await import(file)

    if (mod.default && mod.default instanceof Promise) {
      await mod.default
    }
  }
}
