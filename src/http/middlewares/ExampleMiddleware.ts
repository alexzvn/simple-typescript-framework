import { Handler } from 'express'

const handler: Handler = (req, res, next) => {
  // Do something here
  next()
}

export default handler
