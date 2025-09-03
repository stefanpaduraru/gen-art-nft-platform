import { HUMIO_INGEST_TOKEN, LOGS_ENABLED } from '@config/config';
import winston from 'winston';
import * as _ from 'lodash';
import HumioTransport from '@common/utils/WinstonHumio';

const isProduction = (
  (process.env.NODE_ENV as string) || ''
).includes('production');

export const formatOptionsDevelopment = winston.format.combine(
  winston.format.errors({ stack: true }),
  // winston.format.metadata(),
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => {
    if (!_.isEmpty(info.metadata)) {
      return `${info.timestamp} ${info.level}: ${
        info.message
      } - ${JSON.stringify(info.metadata)}`;
    }

    if (!_.isEmpty(info.stack)) {
      return `${info.timestamp} ${info.level}: ${
        info.message
      } - ${JSON.stringify(info.stack)}`;
    }

    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

export const formatOptionsProduction = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.metadata(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => JSON.stringify(info)),
);

export const getFormatOptions = () =>
  !isProduction ? formatOptionsDevelopment : formatOptionsProduction;

export const getLoggerConsoleOptions = (isSilentMode = false) => ({
  level: 'debug',
  handleExceptions: true,
  json: isProduction,
  colorize: !isProduction,
  silent: isSilentMode,
  dumpExceptions: true,
  showStack: true,
});

export let logger: any;
export const createLogger = (enabled: boolean) => {
  logger = winston.createLogger({
    format: getFormatOptions(),
    transports: [
      new winston.transports.Console(
        getLoggerConsoleOptions(!(enabled || LOGS_ENABLED)),
      ),
      new HumioTransport({
        ingestToken: HUMIO_INGEST_TOKEN,
        tags: {
          application: 'backend.mintoria.io',
        },
        callback: logCallback,
      }),
    ],
  });
  return logger;
};

const logCallback = (err: any) => {
  if (err) {
  }
};
