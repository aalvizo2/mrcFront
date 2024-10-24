import createHttpClient from "../http/createHttpClient";
import { AuthLogin } from "../entities/Auth";
import { API_BASE_URL } from "../apiConfig";


const httpClient= createHttpClient(API_BASE_URL); 


export const AuthApi= {
    login: async(data: AuthLogin): Promise<AuthLogin>=>{
        const response= await httpClient.post('/api/v1/auth', data); 
        return response.data;
    }
}