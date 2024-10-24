import { AuthApi } from "../api/AuthApi";
import { AuthLogin } from "../entities/Auth";

export class AuthRepositoryImpl{
    async login(data: AuthLogin): Promise<AuthLogin>{
        return AuthApi.login(data);
    }
}