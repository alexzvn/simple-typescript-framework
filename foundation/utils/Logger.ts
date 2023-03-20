import winston, { format } from 'winston'

const display = (info: any) => `${formatDateTime(info.timestamp)} ${info.level}: ${info.message}`

const createLoggerProduction = () => winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console(
      { format: format.combine(format.colorize(), format.printf(display)) },
    )
  ],
})

const formatDateTime = (timestamp: number) => 
  new Date(timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '')

const createLoggerDevelopment = () => winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(display),
  ),
  transports: [
    new winston.transports.Console(),
  ],
})

export const logger = process.env.NODE_ENV === 'production'
  ? createLoggerProduction()
  : createLoggerDevelopment()

export const error = (err: any) => logger.error(err)
export const info = (message: string) => logger.info(message)
export const warn = (message: string) => logger.warn(message)
export const debug = (message: string) => logger.debug(message)
