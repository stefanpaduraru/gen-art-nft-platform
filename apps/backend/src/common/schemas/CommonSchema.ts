/* tslint:disable:no-magic-numbers */
import * as Joi from "joi";

export const MAX_LENGTH_PASSWORD = 72;
export const MIN_LENGTH_PASSWORD = 9;

export const CommonSchema = {
  id: Joi.number().integer().min(1),
  name: Joi.string()
    .regex(/^[a-zA-Z '\p{Mn}\p{Pd}\p{L}]{2,45}$/u)
    .message("Name is not allowed to be empty or have special characters."),
  nameWithSpecialCharacters: Joi.string()
    .regex(/^[a-zA-Z0-9 .,&/()\-'\p{Mn}\p{Pd}\p{L}]{2,45}$/u)
    .message("Name is not allowed to be empty or have special characters."),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .message(
      "Email is not allowed to have special characters and follows user@domain pattern."
    ),

  password: Joi.string()
    .max(MAX_LENGTH_PASSWORD)
    .min(MIN_LENGTH_PASSWORD)
    .required(),
};
