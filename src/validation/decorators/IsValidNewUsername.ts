import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
} from "class-validator";
import { UserService } from "../../services/auth/UserService";

@ValidatorConstraint({ async: true })
class IsValidUsernameConstraint implements ValidatorConstraintInterface {
  async validate(value: unknown): Promise<boolean> {
    if (!isString(value)) return false;
    // Username-Format prüfen (z.B. mindestens 3 Zeichen, nur Buchstaben/Zahlen)
    if (!/^[a-zA-Z0-9_]{3,32}$/.test(value)) return false;
    // Unique-Check
    const userService = new UserService(global.em);
    return await userService.isUsernameUnique(value);
  }

  defaultMessage(args: ValidationArguments): string {
    if (!isString(args.value)) return "Username muss ein String sein";
    if (!/^[a-zA-Z0-9_]{3,32}$/.test(args.value))
      return "Username muss 3-32 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten";
    return "Username allready taken";
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