import * as Joi from 'joi';

export const JoiExtended = Joi.extend((joi) => ({
  base: joi.array(),
  type: 'arrayOrJsonArray',
  coerce: (value) => {
    if (typeof value !== 'string') {
      return { value };
    }

    try {
      return { value: JSON.parse(value) };
    } catch (error) {
      return { value };
    }
  },
})) as typeof Joi & {
  arrayOrJsonArray: typeof Joi.array;
};
