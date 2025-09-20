import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
class IsValidUsernameConstraint implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    if (!/^[a-zA-Z0-9_]{3,32}$/.test(value)) return false;
    return true;
  }
}

export function IsValidNewUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidUsernameConstraint,
      async: true,
    });
  };
}