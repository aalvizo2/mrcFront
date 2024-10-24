import { EditClient, getClients, newClient } from "../../../entities/Clientes";
import { ClientesRepositoryImpl } from "../../../repositoryImpl/ClientesRepositoryImpl";




export class ClientesUseCases{
    constructor(private clienteRepository: ClientesRepositoryImpl){}

    async getClient(): Promise<getClients[]>{
        return this.clienteRepository.getClient();
    }

    async newClient(data: newClient): Promise<newClient>{
        return this.clienteRepository.newClient(data)
    }

    async editClient(newData: EditClient): Promise<EditClient>{
        return this.clienteRepository.editClient(newData);
    }

    async deleteClient(Id: string): Promise<void>{
        return this.clienteRepository.deleteClient(Id);
    }

    async activateClient(Id: string): Promise<void>{
        return this.clienteRepository.activateClient(Id);
    }
}