import * as Rc from "routing-controllers";
import _ from "lodash";
import R from "ramda";

const Errors = {
  Forbidden: Rc.ForbiddenError,
  NotFound: Rc.NotFoundError,
  BadRequest: Rc.BadRequestError,
  NotAcceptable: Rc.NotAcceptableError,
  InternalServer: Rc.InternalServerError,
  MethodNotAllowed: Rc.MethodNotAllowedError,
  Unauthorized: Rc.UnauthorizedError,
};

const Routing = {
  ...R.omit(
    [
      "NotFoundError",
      "ForbiddenError",
      "BadRequestError",
      "NotAcceptableError",
      "InternalServerError",
      "MethodNotAllowedError",
      "UnauthorizedError",
    ],
    Rc
  ),
};

export const RoutingControllersIntegration = {
  Errors,
  Routing,
};
