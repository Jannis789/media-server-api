import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
  isEmail,
} from "class-validator";
import { UserService } from "../../services/auth/UserService";

@ValidatorConstraint({ async: true })
class IsValidEmailConstraint implements ValidatorConstraintInterface {
  async validate(value: unknown): Promise<boolean> {
    if (!isString(value)) return false;
    if (!isEmail(value)) return false;
    const userService = new UserService(global.em);
    return await userService.isEmailUnique(value);
  }

  defaultMessage(args: ValidationArguments): string {
    if (!isString(args.value)) return "Email muss ein String sein";
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