const dotEnvPath = `.env.${process.env.NODE_ENV || 'development'}`;
// tslint:disable-next-line: no-var-requires
require('dotenv').config({ path: dotEnvPath });

if (
  process.env.NODE_ENV === 'production' &&
  process.env.APP_PROTOCOL !== 'https'
) {
  throw new Error('APP_PROTOCOL must be https in production');
}

const REQUIRED_KEYS = [
  'NODE_PORT',
  'LOGS_ENABLED',
  'ENVIRONMENT',
  'FRONT_CLIENT_URL',

  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_HOST',
  'DB_PORT',
  'DB_ENGINE',
  'DB_TIMEZONE',
  'DEFAULT_RESULTS_PER_PAGE',
  'MAX_NUMBER_OF_PROJECTS',
  'RECAPTCHA_KEY',
  'RECAPTCHA_PROJECT_ID',

  'AWS_IAM_USER_KEY',
  'AWS_IAM_USER_SECRET',

  'HUMIO_INGEST_TOKEN',
  'HUMIO_REPOSITORY',
  'HUMIO_API_TOKEN',

  'ETHERSCAN_API_KEY',
  'MINTORIA_ADDRESS',
];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});

export const NODE_PORT = process.env.NODE_PORT;
export const LOGS_ENABLED = process.env.LOGS_ENABLED;
export const ENVIRONMENT = process.env.ENVIRONMENT;

export const FRONT_CLIENT_URL = process.env.FRONT_CLIENT_URL;
export const GENERATOR_URL = process.env.GENERATOR_URL;

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_ENGINE = process.env.DB_ENGINE;
export const DB_TIMEZONE = process.env.DB_TIMEZONE;

export const AWS_IAM_USER_KEY = process.env.AWS_IAM_USER_KEY;
export const AWS_IAM_USER_SECRET = process.env.AWS_IAM_USER_SECRET;
export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY || '';

export const RECAPTCHA_PROJECT_ID =
  process.env.RECAPTCHA_PROJECT_ID || '';

export const MAX_NUMBER_OF_PROJECTS =
  process.env.MAX_NUMBER_OF_PROJECTS || '0';
export const DEFAULT_RESULTS_PER_PAGE =
  process.env.DEFAULT_RESULTS_PER_PAGE || '20';

export const HUMIO_INGEST_TOKEN =
  process.env.HUMIO_INGEST_TOKEN || '';

export const HUMIO_REPOSITORY = process.env.HUMIO_REPOSITORY || '';
export const HUMIO_API_TOKEN = process.env.HUMIO_API_TOKEN || '';

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

export const MINTORIA_ADDRESS = process.env.MINTORIA_ADDRESS || '';
