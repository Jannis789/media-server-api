import { IsValidNewUsername, IsValidNewEmail, IsValidPassword } from "../decorators";

class CreateUserBody {
    @IsValidNewUsername()
    username!: string;

    @IsValidNewEmail()
    email!: string;

    @IsValidPassword()
    password!: string;
}

export { CreateUserBody };