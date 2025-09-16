import { Body, Controller, Post, Res } from "routing-controllers";
import { CreateUserBody } from "../../validation/DTO/user.dto";
import { UserService } from "../../services/User/UserService";
import { RoleService } from "../../services/User/RoleService";
import { SessionService } from "../../services/User/SessionService";
import { LoginUserBody } from "../../validation/DTO/login.user.dto";
import type { Response } from "koa";
import { CreateUserResponse, LoginUserResponse } from "../../validation/shared/user.responses";
import { translate, translateMessage } from "../../utils/translations/translator";

@Controller("/User")
class UserController {

   userService: UserService = new UserService(em);
   sessionService: SessionService = new SessionService(em);
   roleService: RoleService = new RoleService(em);

    @Post("/register")
    async createUser(@Body() body: CreateUserBody): Promise<CreateUserResponse> {
        const user = await this.userService.createUser(body.username, body.email, body.password);
        const role = await this.roleService.createRole(user, "user");
        const session = await this.userService.login(body.email, body.password, body.remember);
              
        return {
            status: 201,
            success: true,
            message: "User created successfully",
            data: {
                session: session!.uuid,
                expiresAt: session!.expiresAt,
                role: role.name,
            },
        };
    }

    @Post("/login")
    async loginUser(@Body() body: LoginUserBody, @Res() res: Response): Promise<LoginUserResponse> {
        const session = await this.userService.login(body.email, body.password, body.remember);

        return {
            status: 200,
            success: true,
            message: translateMessage("login_successful"),
            data: {
                session: session!.uuid,
                expiresAt: session!.expiresAt,
            }
        };
    }
}

export { UserController };
