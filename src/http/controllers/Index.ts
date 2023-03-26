import { defineHandler } from '@/providers/Router'
import { Handler } from 'express'

/**
 * export http method you want to handle
 * index files will be map to "/" in url
 */
export const get: Handler = (_, res) => res.send('Hello World')

/**
 * export this if you want this middleware to be applied to all http methods in current file
 */
const middleware: Handler = async (req, res, next) => {
  console.log('Middleware called')
  next()
}

export const post = defineHandler((req, res) => {
  res.send('Hello World')
}, middleware)
