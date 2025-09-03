import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Roles validation', async: false })
export class RolesValidator implements ValidatorConstraintInterface {
  validate(roles: string[]) {
    return (
      !roles ||
      (Array.isArray(roles) && !roles.find(role => typeof role !== 'string'))
    );
  }

  defaultMessage() {
    return 'Roles are invalid!';
  }
}
