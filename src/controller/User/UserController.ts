import { Body, Controller, Post, Res, UseBefore } from "routing-controllers";
import { CreateUserBody } from "../../validation/DTO/user.dto";
import { UserService } from "../../services/User/UserService";
import { RoleService } from "../../services/User/RoleService";
import { SessionService } from "../../services/User/SessionService";
import { LoginUserBody } from "../../validation/DTO/login.user.dto";
import type { Response } from "koa";

@Controller("/User")
class UserController {

    private userService: UserService = new UserService(em);
    private sessionService: SessionService = new SessionService(em);
    private roleService: RoleService = new RoleService(em);

    @Post("/register")
    async createUser(@Body() body: CreateUserBody) {
        const user = await this.userService.createUser(body.username, body.email, body.password);
        const session = await this.sessionService.createSession(user);
        const role = await this.roleService.createRole(user, "user");
        
        return {
            status: 201,
            message: "User created successfully",
            data: {
                session: session.uuid,
                expiresAt: session.expiresAt,
                role: role.name,
            },
        };
    }

    @Post("/login")
    async loginUser(@Body() body: LoginUserBody, @Res() res: Response) {
        const session = await this.userService.login(body.email, body.password, body.remember);
        if (!session) {
            res.status = 401;
            return { status: 401, message: "Invalid email or password" };
        }

        return {
            status: 200,
            message: "Login successful",
            data: {
                session: session.uuid,
                expiresAt: session.expiresAt,
            }
        };
    }
}

export { UserController };
