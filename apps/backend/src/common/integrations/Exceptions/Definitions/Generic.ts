import { HTTP } from '@common/utils/HTTPCodes';
import { ExceptionDefinition } from './ExceptionDefinition';
import { ExceptionGroups } from '@common/integrations/Exceptions/ExceptionGroups';

const genericDefinitions = {
  badRequest: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'BadRequest',
    publicMessage: 'Bad request',
  },
  unauthorized: {
    httpCode: HTTP.UNAUTHORIZED,
    type: 'Unauthorized',
    publicMessage: 'Unauthorized',
  },
  forbidden: {
    httpCode: HTTP.FORBIDDEN,
    type: 'Forbidden',
    publicMessage: 'Forbidden',
  },
  notFound: {
    httpCode: HTTP.NOT_FOUND,
    type: 'NotFound',
    publicMessage: 'Not found',
  },
  unprocessableEntity: {
    httpCode: HTTP.UNPROCESSABLE_ENTITY,
    type: 'UnprocessableEntity',
    publicMessage: 'Unprocessable entity',
  },
  failedDependency: {
    httpCode: HTTP.FAILED_DEPENDENCY,
    type: 'FailedDependency',
    publicMessage: 'Failed dependency',
  },
  tooManyRequests: {
    httpCode: HTTP.TOO_MANY_REQUESTS,
    type: 'TooManyRequests',
    publicMessage: 'Too many requests',
  },
  internalServerError: {
    httpCode: HTTP.INTERNAL_SERVER_ERROR,
    type: 'InternalServerError',
    publicMessage: 'Internal server error',
  },
  badGateway: {
    httpCode: HTTP.BAD_GATEWAY,
    type: 'BadGateway',
    publicMessage: 'Bad gateway',
  },
  serviceUnavailable: {
    httpCode: HTTP.SERVICE_UNAVAILABLE,
    type: 'ServiceUnavailable',
    publicMessage: 'Service unavailable',
  },
  withPayload: {
    httpCode: HTTP.INTERNAL_SERVER_ERROR,
    type: 'WithPayload',
    publicMessage: 'With payload',
  },
  invalidDataFormat: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'Invalid data format',
    publicMessage: 'Invalid data format',
  },
  requiredParameter: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'Missing required parameter',
    publicMessage: 'Missing required parameter',
  },
  dataCannotBeEmpty: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'Data cannot be empty',
    publicMessage: 'Data cannot be empty',
  },
  invalidParameter: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'Invalid parameter',
    publicMessage: 'Invalid parameter',
  },
  exceedsCharLimit: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'Value exceeds char limit',
    publicMessage: 'Value exceeds max length',
  },
  nonUniqueValues: {
    httpCode: HTTP.BAD_REQUEST,
    type: 'Non unique values',
    publicMessage: 'Non unique values',
  },
};

type GenericTypes = {
  [K in keyof typeof genericDefinitions]: ExceptionDefinition<ExceptionGroups.Generic>;
};
const generic = genericDefinitions as GenericTypes;

export { generic };
