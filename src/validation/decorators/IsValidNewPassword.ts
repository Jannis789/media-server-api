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
    if (!isString(args.value)) return "Password muss ein String sein";
    return "Password muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben und eine Zahl enthalten";
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