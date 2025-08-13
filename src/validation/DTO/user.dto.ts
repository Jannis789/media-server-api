import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsValidNewUsername, IsValidNewEmail, IsValidPassword } from "../decorators";
import { IsUnique } from "../decorators/IsUnique";
import { User } from "../../db/entities";

class CreateUserBody {
    @IsString()
    @IsUnique(User, "username")
    @IsValidNewUsername()
    username!: string;

    @IsString()
    @IsUnique(User, "email")
    @IsValidNewEmail()
    email!: string;

    @IsValidPassword()
    password!: string;
}

class UpdateUserBody {
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    @IsValidNewUsername()
    username?: string;

    @IsOptional()
    @IsString()
    @IsValidNewEmail()
    email?: string;

    @IsOptional()
    @IsValidPassword()
    password?: string;
}

export { UpdateUserBody, CreateUserBody };