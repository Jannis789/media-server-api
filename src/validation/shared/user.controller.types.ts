// POST -> /User/registration
interface CreateUserResponse {
    status: number;
    message: string;
    data?: {
        session: string;
        expiresAt: Date;
        role: string;
    };
}
// POST -> /User/login
interface LoginUserResponse {
    status: number;
    message: string;
    data?: {
        session: string;
        expiresAt: Date;
    };
}

export { CreateUserResponse, LoginUserResponse };