import { IsEmail, IsOptional } from "class-validator";
import { IsValidPassword } from "../decorators";

class LoginUserBody {
    @IsEmail()
    email!: string;

    password!: string;

    @IsOptional()
    remember?: boolean;
}

export { LoginUserBody };