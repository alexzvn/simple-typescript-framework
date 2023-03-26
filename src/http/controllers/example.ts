import { Router } from 'express'
export const router = Router()

/**
 * 2nd way to write controller by export router instance
 * this will automap from current folder as uri
 */
router.get('/example', (req, res) => {
  res.send('Hello world from example')
})
