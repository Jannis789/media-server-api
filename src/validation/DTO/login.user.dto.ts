import { IsEmail, IsOptional } from "class-validator";

class LoginUserBody {
    @IsEmail()
    email!: string;

    password!: string;

    @IsOptional()
    remember?: boolean;
}

export { LoginUserBody };