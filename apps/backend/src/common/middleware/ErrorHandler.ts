import { ENVIRONMENT } from '@config/config';
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
  Req,
  Res,
} from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { HTTP } from '@common/utils/HTTPCodes';
import { logger } from '@common/services/Logger';
import { QueryFailedError } from 'typeorm';
import { Service } from 'typedi';

const PRODUCTION_ERROR_RESPONSES = {
  [`${HTTP.BAD_REQUEST}`]: {
    status: 'BadRequestError',
    message: 'Bad Request',
  },
  [`${HTTP.UNAUTHORIZED}`]: {
    message: 'Unauthorized',
  },
  [`${HTTP.FORBIDDEN}`]: {
    message: 'Forbidden',
  },
  [`${HTTP.NOT_FOUND}`]: {
    message: 'Not Found',
  },
  [`${HTTP.UNPROCESSABLE_ENTITY}`]: {
    message: 'Unprocessable Entity',
  },
  [`${HTTP.FAILED_DEPENDENCY}`]: {
    message: 'Failed Dependency',
  },
  [`${HTTP.TOO_MANY_REQUESTS}`]: {
    message: 'Too Many Requests',
  },
  [`${HTTP.INTERNAL_SERVER_ERROR}`]: {
    status: 'InternalServerError',
    message: 'Internal Server Error',
  },
  [`${HTTP.BAD_GATEWAY}`]: {
    message: 'Bad Gateway',
  },
  [`${HTTP.SERVICE_UNAVAILABLE}`]: {
    message: 'Service Unavailable',
  },
};

const PRODUCTION_ENVIRONMENTS = ['production'];

const getProductionErrorResponse = (httpCode: number) =>
  PRODUCTION_ERROR_RESPONSES[`${httpCode}`] ||
  PRODUCTION_ERROR_RESPONSES[`${HTTP.SERVICE_UNAVAILABLE}`];

export const getHttpCodeFromError = (error: HttpError): number => {
  const httpCode = Number(error.httpCode);
  if (isNaN(httpCode)) {
    return HTTP.INTERNAL_SERVER_ERROR;
  }

  // Programmer errors
  if (error.name === 'ValidationError') {
    return HTTP.BAD_REQUEST;
  }

  return httpCode;
};

export const getErrorResponse = (
  error: any,
  isProduction: boolean,
): {
  body: { status: string; message: string };
  httpCode: number;
} => {
  const httpCode = getHttpCodeFromError(error);

  let body = isProduction
    ? { status: error.name, ...getProductionErrorResponse(httpCode) }
    : {
        status: error.name,
        message: error.message,
      };

  if (isProduction && error instanceof QueryFailedError) {
    body = {
      status: 'InternalError',
      message: 'Request could not be processed',
    };
  }

  return { body, httpCode };
};

@Middleware({ type: 'after' })
@Service()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  public constructor() {}

  public error(
    error: any,
    @Req() _request: Request,
    @Res() response: Response,
    next: NextFunction,
  ) {
    if (!error) return next();

    let httpCode;
    let body;

    switch (error.message) {
      default:
        const responseData = getErrorResponse(
          error,
          PRODUCTION_ENVIRONMENTS.some((env) => env === ENVIRONMENT),
        );

        httpCode = responseData.httpCode;
        body = responseData.body;
    }

    logger.error(error);
    response.setHeader('Content-Type', 'application/json');

    const space = 2;
    response.status(httpCode).send(JSON.stringify(body, null, space));
  }
}
