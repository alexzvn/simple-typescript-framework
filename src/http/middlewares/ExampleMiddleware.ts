import { Handler } from 'express'

/**
 * ExampleMiddleware is a sample Express middleware that demonstrates
 * the structure of a middleware function. It does not perform any
 * specific action, but serves as a template for creating new middleware.
 * 
 * Replace the contents of this function with your desired middleware logic.
 */
const handler: Handler = (req, res, next) => {
  // Do something here
  // For example, you can add a custom header:
  // res.setHeader('X-Example-Middleware', 'Middleware executed')

  // Make sure to call next() to continue the middleware chain
  next()
}

export default handler
