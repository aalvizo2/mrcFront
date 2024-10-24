import createHttpClient from "../http/createHttpClient";
import { API_BASE_URL } from "../apiConfig";
import { EditClient, getClients, newClient } from "../entities/Clientes";
import { message } from "antd";



const httpClient= createHttpClient(API_BASE_URL); 


export const ClientesApi= {
   
    getClients: async(): Promise<getClients[]> => {
        const response= await httpClient.get('/api/v1/Client');
        return response.data.Data;
    },

    newClient: async(data: newClient): Promise<newClient>=>{
        const response= await httpClient.post('/api/v1/Client/new', data); 
        console.log('respuesta de la api', response)
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data.Data;
    }, 

    editClient: async(newData: EditClient): Promise<EditClient>=>{
        const response= await httpClient.post(`/api/v1/Client/${newData.Id}`, newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data.Data;
    }, 
    
    deleteClient: async(Id: string): Promise<void>=>{
        const response= await httpClient.delete(`/api/v1/Client/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data.Data;
    },

    activateClient: async(Id: string): Promise<void>=>{
        const response= await httpClient.post(`/api/v1/Client/state/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data.Data;
    }
}