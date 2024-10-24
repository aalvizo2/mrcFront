import { AuthLogin } from "../../../entities/Auth";
import { AuthRepositoryImpl } from "../../../repositoryImpl/AuthRepositoryImpl";


export class AuthUseCases{
    constructor(private authRepository: AuthRepositoryImpl){}

    async login(data: AuthLogin): Promise<AuthLogin>{
        return this.authRepository.login(data);
    }
}