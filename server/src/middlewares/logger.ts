import { format, createLogger, transports } from 'winston'
const { combine, timestamp, printf, colorize, errors, json } = format

const buildDevLogger = () => {
  const logFormat = printf(({ level, message, stack, timestamp }) => {
    return `${timestamp} - ${level}: ${stack || message}`
  })

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  return createLogger({
    level: 'debug',
    format: combine(colorize(), timestamp({ format: dateFormat }), errors({ stack: true }), logFormat),
    transports: [new transports.Console()],
  })
}

const buildProdLogger = () => {
  return createLogger({
    level: 'http',
    format: combine(timestamp(), errors({ stack: true }), json({ space: 2 })),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  })
}

export const logger = process.env.NODE_ENV === 'production' ? buildProdLogger() : buildDevLogger()
