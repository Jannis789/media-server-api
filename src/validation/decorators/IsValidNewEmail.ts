import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isEmail,
} from "class-validator";

@ValidatorConstraint({ async: true })
class IsValidEmailConstraint implements ValidatorConstraintInterface {
  async validate(value: unknown): Promise<boolean> {
    if (!isEmail(value)) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    if (!isEmail(args.value)) return "Email ist ungültig";
    return "Email allready taken";
  }
}

export function IsValidNewEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidEmailConstraint,
      async: true,
    });
  };
}