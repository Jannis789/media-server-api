import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
} from "class-validator";

@ValidatorConstraint({ async: false })
class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (!isString(value)) return false;
    // Mindestens 8 Zeichen, mindestens ein Buchstabe und eine Zahl
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    if (!isString(args.value)) return "Password must be a string";
    return "Password must be at least 8 characters long and contain at least one letter and one number";
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidPasswordConstraint,
    });
  };
}