import Express, { urlencoded, json } from 'express'
import cors from 'cors'
import { defineProvider } from '@/utils/ProviderHelper'
import { envOrFail } from '@/utils/Env'

const target = envOrFail('APP_TARGET')

export default defineProvider((app) => {
  const { express } = app

  express.use(Express.static('public'))
  express.use(urlencoded({ extended: true }))
  express.use(json())
  express.use(cors({ origin: target }))
})
