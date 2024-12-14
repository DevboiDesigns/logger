import winston from "winston"
const { combine, timestamp, json, printf } = winston.format
const timestampFormat = "HH:mm:ss - MMM DD YYYY"
import { NODE_ENV } from "../config/env.keys"
import { censor } from "../utils/censor"

/**
 *
 * * Logger - Winston
 *  Winston is a logger for just about everything
 *  It is designed to be a simple and universal logging library with support for multiple transports.
 *  A transport is essentially a storage device for your logs.
 *  Each instance of a winston logger can have multiple transports configured at different levels.
 *  For example, one may want error logs to be stored in a persistent remote location (like a database),
 */

// LOG FORMAT
const logFormat = combine(
  timestamp({ format: timestampFormat }),
  json(),
  printf(({ timestamp, level, message, ...data }) => {
    return `*** [ ${level.toUpperCase()} : ${NODE_ENV} ] *** [ ${timestamp} ] ${message} - [[ ${
      typeof data === "object" ? JSON.stringify(data, censor(data)) : data
    } ]] ***`
  })
)
// LEVEL of logging
const LEVEL = NODE_ENV === "development" ? "debug" : "info"
// LOGGER
const log = winston.createLogger({
  level: LEVEL,
  format: logFormat,
  transports: [new winston.transports.Console()],
})

// CAPTURE time of response
const profiler = log.startTimer()

//* EXPORTS
export default log
export { log, profiler }
