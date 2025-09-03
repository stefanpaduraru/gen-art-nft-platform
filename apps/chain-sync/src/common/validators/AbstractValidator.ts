// tslint:disable:max-classes-per-file
import * as Cs from 'class-validator';

class ValidationError extends Error {
  constructor(errors: Cs.ValidationError[]) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = 'ValidationError';
    this.message = `Structure errors: ${errors}`;
  }
}

export abstract class AbstractValidator {
  async conforms<T>(obj: T, ValidatorClass: any): Promise<T> {
    const instance = new ValidatorClass(obj);
    const errors = await Cs.validate(instance);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    return obj;
  }

  async allConforms<T>(objs: T[], ValidatorClass: any): Promise<T[]> {
    return Promise.all(objs.map(obj => this.conforms(obj, ValidatorClass)));
  }

  async validate<T>(obj: T, ValidatorClass: any): Promise<boolean> {
    const instance = new ValidatorClass(obj);

    if (Cs.Validate(instance).length > 0) {
      return false;
    }

    return true;
  }
}
