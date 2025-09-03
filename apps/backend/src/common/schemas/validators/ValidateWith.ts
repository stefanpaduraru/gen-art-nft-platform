import * as _ from "lodash";
import * as Joi from "joi";
import { BadRequestError } from "routing-controllers";
import { logger } from "@common/services/Logger";

export const validateRequestWith = (
  schema: object,
  request: any,
  options: Joi.ValidationOptions = {}
) => {
  const validationSchema = Joi.isSchema(schema)
    ? (schema as Joi.AnySchema)
    : Joi.object(schema);
  const schemaKeys = Array.from(
    (validationSchema as any)._ids._byKey.keys()
  ) as string[];
  const validationObj = _.pick(request, schemaKeys);
  const { error, value } = validationSchema.validate(validationObj, options);

  if (error) {
    const message = error.details ? error.details[0].message : error.message;

    logger.error(`Request fail for ${request.url} with error: ${message}`);

    throw new BadRequestError(message);
  }
  for (const key of schemaKeys) {
    // eslint-disable-next-line no-param-reassign,security/detect-object-injection
    request[key] = value[key];
  }
};

export const validateWith =
  (schema: object, options: Joi.ValidationOptions = {}) =>
  (request: any, _response: any, next: (...args: any[]) => any) => {
    if (!schema) {
      throw new Error("Schema is missing.");
    }

    try {
      validateRequestWith(schema, request, options);
    } catch (error) {
      return next(error);
    }

    return next();
  };
