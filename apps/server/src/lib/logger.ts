import { env } from "@flamingo/env/server";
import type { Logger, LoggerOptions } from "pino";
import pino from "pino";

const logLevel = env.LOG_LEVEL;
const isDevelopment = env.NODE_ENV !== "production";

const loggerOptions: LoggerOptions = {
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    env: env.NODE_ENV,
  },
};

let logger: Logger;

if (isDevelopment && env.PINO_PRETTY !== "false") {
  logger = pino({
    ...loggerOptions,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
        singleLine: false,
      },
    },
  });
} else {
  logger = pino(loggerOptions);
}

export function createChildLogger(bindings: Record<string, unknown>): Logger {
  return logger.child(bindings);
}

export { logger };

export default logger;
