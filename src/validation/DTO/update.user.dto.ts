import { IsNumber, IsOptional } from "class-validator";
import { IsValidNewUsername, IsValidNewEmail, IsValidPassword } from "../decorators";

class UpdateUserBody {
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsValidNewUsername()
    username?: string;

    @IsOptional()
    @IsValidNewEmail()
    email?: string;

    @IsOptional()
    @IsValidPassword()
    password?: string;
}

export { UpdateUserBody };