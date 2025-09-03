import 'tsconfig-paths/register';
import 'reflect-metadata';
import {
  Action,
  useContainer,
  useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import { NODE_PORT } from '@config/config';
import {
  createLogger,
  getFormatOptions,
  getLoggerConsoleOptions,
  logger,
} from './common/services/Logger';
import { dbConnectionManager as databaseConnectionManager } from './common/dbConnectionManager';
import { AuthorizationService } from '@common/services/Authorization/AuthorizationService';
import { Roles } from '@common/entities/User';
import { ErrorHandler } from '@common/middleware/ErrorHandler';
import compression from 'compression';
import helmet from 'helmet';
import { urlencoded } from 'body-parser';
import express from 'express';

useContainer(Container);

createLogger(true);
databaseConnectionManager.awaitConnection();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

const app = express();

app.disable('x-powered-by');
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(getLoggerConsoleOptions()),
    ],
    format: getFormatOptions(),
  }),
);

app.use(helmet.dnsPrefetchControl());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      'default-src': [
        "'self'",
        'opensea.io',
        '*.opensea.io',
        'mintoria.io',
        '*.mintoria.io',
      ],
      'script-src': [
        "'self'",
        'cdn.jsdelivr.net',
        'jsdelivr.net',
        "'nonce-mtrscript'",
      ],
      'style-src': ["'self'", "'nonce-mtrstyle'"],
      'frame-ancestors': [
        "'self'",
        'opensea.io',
        '*.opensea.io',
        'mintoria.io',
        '*.mintoria.io',
      ],
    },
  }),
);
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(
  helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: true,
    preload: true,
  }),
);
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use(compression());
app.use(
  urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
    type: 'application/x-www-form-urlencoding',
  }),
);
app.use((_request, res, next) => {
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Cache-Control', 'no-cache');
  next();
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

const routingControllerOptions = {
  controllers: [
    path.join(__dirname + '/app/controllers/*.ts'),
    path.join(__dirname + '/admin/controllers/*.ts'),
  ],
  defaultErrorHandler: false,
  cors: corsOptions,
  // routePrefix: '/api',
  authorizationChecker: (action: Action, roles: Roles[]) =>
    AuthorizationService.authorizationChecker(action, roles),
  currentUserChecker: (action: Action) =>
    AuthorizationService.currentUserChecker(action),
  middlewares: [ErrorHandler],
};
useExpressServer(app, routingControllerOptions);
//app.use(express.static('./public'));

app.use((req, _res, done) => {
  logger.info(`HTTP ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.url,
    headers: req.headers,
    ip: req.ip,
    xhr: req.xhr,
    origin: req.get('origin'),
  });
  done();
});
const start = async () => {
  const port = process.env.PORT || NODE_PORT || '3000';
  await databaseConnectionManager.awaitConnection();
  const appServer = app
    .listen(port, () => {
      logger.info(
        `Server application is up and running on port ${port}`,
      );
    })
    .on('error', (error) => {
      console.log(error);
    });

  return appServer;
};
export const server = start();
