import { IsEmail, IsOptional } from "class-validator";
import { User } from "../../db/entities";
import { IsAviable, IsAviablePassword, IsValidPassword } from "../decorators";
import { fetchTranslation } from "../../utils/translations/translator";

class LoginUserBody {
    @IsAviable(User, "email", { message: fetchTranslation("email_unavailable") })
    @IsEmail({ ignore_max_length: false }, { message: fetchTranslation("invalid_email") })
    email!: string;

    @IsValidPassword({ message: fetchTranslation("invalid_password") })
    @IsAviablePassword(User, "password_hash", { message: fetchTranslation("incorrect_password") })
    password!: string;

    @IsOptional()
    remember?: boolean;
}

export { LoginUserBody };