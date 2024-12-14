/**
 * * Formats the logger response by extracting relevant information from the request and response objects.
 */
import { formatLoggerResponse } from "./utils/formatter"

/**
 * * Logger - Winston
 */
import { log, profiler } from "./lib/logger"

/**
 * * Error Handler
 */
import { errHandler } from "./utils/err.handler"

// EXPORTS
export { log, profiler, errHandler, formatLoggerResponse }
