import { RoutingControllersIntegration } from '../RoutingControllers';
import { UnprocessableEntity } from './UnprocessableEntity';
import { ServiceUnavailable } from './ServiceUnavailable';
import { FailedDependency } from './FailedDependency';
import { BadGateway } from './BadGateway';

export const ErrorsIntegration = {
  ...RoutingControllersIntegration.Errors,
  FailedDependency,
  ServiceUnavailable,
  UnprocessableEntity,
  BadGateway,
  BaseError: Error,
};
