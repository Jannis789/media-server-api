import { IsEmail, IsOptional } from "class-validator";
import { User } from "../../db/entities";
import { IsAviable, IsAviablePassword } from "../decorators";

class LoginUserBody {
    @IsAviable(User, "email")
    @IsEmail()
    email!: string;

    @IsAviablePassword(User, "password_hash")
    password!: string;

    @IsOptional()
    remember?: boolean;
}

export { LoginUserBody };