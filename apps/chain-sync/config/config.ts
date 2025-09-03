const dotEnvPath = `.env.${process.env.NODE_ENV || 'development'}`;
// tslint:disable-next-line: no-var-requires
require('dotenv').config({ path: dotEnvPath });

const REQUIRED_KEYS = [
  'APPLICATION_NAME',
  'NODE_PORT',
  'LOGS_ENABLED',
  'ENVIRONMENT',

  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_HOST',
  'DB_PORT',
  'DB_ENGINE',
  'DB_TIMEZONE',

  'WEB3_PROVIDER_MAINNET',
  'WEB3_PROVIDER_TESTNET',

  'AWS_IAM_USER_KEY',
  'AWS_IAM_USER_SECRET',
  'AWS_S3_BUCKET_TOKEN',

  'CALCULATE_RARITY',
  'SYNC_TO_CHAIN',
  'RENDER_TOKENS',
  'EXECUTION_FREQUENCY',
  'FEATURED_COLLECTION_ID',

  'HEADLESS_URL',
  'BACKEND_URL',

  'HUMIO_INGEST_TOKEN',

  'DISCORD_APP_ID',
  'DISCORD_PUBLIC_KEY',
  'DISCORD_MTRBOT_TOKEN',
];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});

export const APPLICATION_NAME = process.env.APPLICATION_NAME || '';
export const NODE_PORT = process.env.NODE_PORT;
export const LOGS_ENABLED = process.env.LOGS_ENABLED;
export const ENVIRONMENT = process.env.ENVIRONMENT;

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_ENGINE = process.env.DB_ENGINE;
export const DB_TIMEZONE = process.env.DB_TIMEZONE;

export const WEB3_PROVIDER_LOCAL = process.env.WEB3_PROVIDER_LOCAL;
export const WEB3_PROVIDER_MAINNET =
  process.env.WEB3_PROVIDER_MAINNET;
export const WEB3_PROVIDER_TESTNET =
  process.env.WEB3_PROVIDER_TESTNET;

export const INFURA_IDS =
  (process.env.INFURA_IDS || '').split(',') || [];

export const AWS_IAM_USER_KEY = process.env.AWS_IAM_USER_KEY;
export const AWS_IAM_USER_SECRET = process.env.AWS_IAM_USER_SECRET;
export const AWS_S3_BUCKET_TOKEN = process.env.AWS_S3_BUCKET_TOKEN;

export const HEADLESS_URL = process.env.HEADLESS_URL;
export const BACKEND_URL = process.env.BACKEND_URL;

export const CALCULATE_RARITY = process.env.CALCULATE_RARITY;
export const SYNC_TO_CHAIN = process.env.SYNC_TO_CHAIN;
export const RENDER_TOKENS = process.env.RENDER_TOKENS;
export const EXECUTION_FREQUENCY = process.env.EXECUTION_FREQUENCY;
export const FEATURED_COLLECTION_ID =
  process.env.FEATURED_COLLECTION_ID;

export const HUMIO_INGEST_TOKEN =
  process.env.HUMIO_INGEST_TOKEN || '';

export const DISCORD_APP_ID = process.env.DISCORD_APP_ID || '';
export const DISCORD_PUBLIC_KEY =
  process.env.DISCORD_PUBLIC_KEY || '';
export const DISCORD_MTRBOT_TOKEN =
  process.env.DISCORD_MTRBOT_TOKEN || '';

export const IS_PRODUCTION = ENVIRONMENT === 'production';

export const MINTORIA_ID = 1;
