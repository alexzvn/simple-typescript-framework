import dotenv from 'dotenv'

dotenv.config()

export const env = <T>(key: string, value?: T|CallableFunction) => {
  if (value instanceof Function) {
    return process.env[key] as unknown as T || value()
  }

  return process.env[key] as unknown as T || value
}

export const envOrFail = (key: string) => env(key, () => {
  throw new Error(`Environment (.env) ${key} is not defined`)
})
