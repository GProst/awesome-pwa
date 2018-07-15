import winston, {format} from 'winston'
import minimist from 'minimist'

const args = minimist(process.argv.slice(2))

const myFormatter = format(info => {
  if (info instanceof Error) {
    info.message = info.stack
  }
  const splat = info[Symbol.for('splat')] // it is an array of arguments that were provided after the first argument
  if (splat) {
    info.message = `${info.message} ${splat.map(
      message => message instanceof Error
        ? message.stack
        : typeof message !== 'object'
          ? message
          : JSON.stringify(message)
    ).join(' ')}`
  }
  return info
})

const myPrinter = format.printf(info => {
  return `${info.level}: ${info.message}`
})

export const logger = winston.createLogger({
  level: args.loglevel === 'debugger' ? 'debug' : args.loglevel || 'info', // can't pass 'debug' as an argument to node :P
  format: format.combine(
    format.colorize(),
    myFormatter(),
    myPrinter
  ),
  transports: [
    new winston.transports.Console()
  ]
})
