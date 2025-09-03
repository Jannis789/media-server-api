import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { verifyPassword } from "../../utils/LoginUtils";
import { User } from "../../db/entities";

@ValidatorConstraint({ async: true })
export class IsAviablePasswordConstraint implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: unknown, args: ValidationArguments) {
    try {
      const [EntityClass] = args.constraints;
      if (typeof em === "undefined") return false;
      const email = (args.object as any).email;
      if (!email) return false;
      const user = await em.findOne(EntityClass, { email }) as User;
      if (!user || typeof user.password_hash !== "string") return false;
      return await verifyPassword(value as string, user.password_hash);
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `The provided password is incorrect.`;
  }
}

export function IsAviablePassword<Entity>(
  entityClass: { new (): Entity },
  property: keyof Entity,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass, property],
      validator: IsAviablePasswordConstraint,
    });
  };
}
