import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isInt,
} from 'class-validator';

@ValidatorConstraint({ name: 'Id validation', async: false })
export class IdValidator implements ValidatorConstraintInterface {
  validate(id: number) {
    if (id) {
      return isInt(id);
    }

    return true;
  }

  defaultMessage() {
    return 'Id is invalid!';
  }
}
