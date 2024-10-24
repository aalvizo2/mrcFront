import { ClientesApi } from "../api/ClientesApi";
import { EditClient, getClients, newClient } from "../entities/Clientes";



export class ClientesRepositoryImpl{
    
    async getClient(): Promise<getClients[]>{
        return ClientesApi.getClients();
    }

    async newClient(data: newClient): Promise<newClient>{
        return ClientesApi.newClient(data);
    }
    
    async editClient(newData: EditClient): Promise<EditClient>{
        return ClientesApi.editClient(newData);
    }
    
    async deleteClient(Id: string): Promise<void>{
        return ClientesApi.deleteClient(Id);
    }

    async activateClient(Id: string): Promise<void>{
        return ClientesApi.activateClient(Id);
    }
}