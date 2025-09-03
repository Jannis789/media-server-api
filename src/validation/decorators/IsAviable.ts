import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsAviableConstraint implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: any, args: ValidationArguments) {
    const [EntityClass, property] = args.constraints;

    const exists = await em.findOne(EntityClass, {
      [property]: value,
    } as any);

    return !!exists;
  }

  defaultMessage(args: ValidationArguments) {
    return `Corrosponding entry isn't aviable in the database.`;
  }
}

export function IsAviable<Entity>(
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
      validator: IsAviableConstraint,
    });
  };
}
