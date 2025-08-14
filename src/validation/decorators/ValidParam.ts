import { validate } from "class-validator";
import { createParamDecorator } from "routing-controllers";

export function ValidParam<T>(type: { new (): T }, paramName: string) {
    return createParamDecorator({
        required: true,
        value: async (action) => {
            const value = action.request.params[paramName];
            const dto = new type();
            (dto as any)[paramName] = value;
            const errors = await validate(dto as object);
            if (errors.length > 0) {
                const error = new Error("Validation failed");
                (error as any).status = 400;
                (error as any).errors = errors;
                throw error;
            }
            return value;
        }
    });
}