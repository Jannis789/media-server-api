import { IsEmail, IsOptional } from "class-validator";
import { User } from "../../db/entities";
import { IsAviable, IsAviablePassword, IsValidPassword } from "../decorators";

class LoginUserBody {
    @IsAviable(User, "email", { message: "Email is not associated with an account." })
    @IsEmail({}, { message: "Invalid email format." })
    email!: string;

    @IsValidPassword()
    @IsAviablePassword(User, "password_hash")
    password!: string;

    @IsOptional()
    remember?: boolean;
}

export { LoginUserBody };