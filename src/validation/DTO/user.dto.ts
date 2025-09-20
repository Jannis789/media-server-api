import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { IsUnique } from "../decorators/IsUnique";
import { User } from "../../db/entities";
import { IsValidNewEmail, IsValidPassword, IsValidNewUsername } from "../decorators";
import { fetchTranslation } from "../../utils/translations/translator";

class CreateUserBody {
    @IsString({ message: fetchTranslation("not_a_string") })
    @IsUnique(User, "username", { message: fetchTranslation("username_not_unique") })
    @IsValidNewUsername({message: fetchTranslation("invalid_username")})
    username!: string;

    @IsString({ message: fetchTranslation("not_a_string") })
    @IsUnique(User, "email", { message: fetchTranslation("email_not_unique") })
    @IsValidNewEmail({message: fetchTranslation("invalid_email")})
    email!: string;

    @IsValidPassword({message: fetchTranslation("invalid_password")})
    password!: string;

    @IsOptional()
    @IsBoolean({ message: fetchTranslation("not_a_boolean") })
    remember?: boolean;
}

class UpdateUserBody {
    @IsNumber({},{ message: fetchTranslation("not_a_number") })
    id!: number;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    @IsValidNewUsername({message: fetchTranslation("invalid_username")})
    username?: string;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    @IsValidNewEmail({message: fetchTranslation("invalid_email")})
    email?: string;

    @IsOptional()
    @IsValidPassword({message: fetchTranslation("invalid_password")})
    password?: string;
}

export { UpdateUserBody, CreateUserBody };