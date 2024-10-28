import { ProvedoresApi } from "../api/ProvedoresApi";
import { editProvidor, getProvidors, newProvidor } from "../entities/Provedores";





export class ProvedoresRepositoryImpl{
    async getProvidors(): Promise<getProvidors[]>{
        return ProvedoresApi.getProvidors();
    }

    async newProvidor(newData: newProvidor): Promise<newProvidor>{
        return ProvedoresApi.newProvidor(newData);
    }

    async editProvidor(newData: editProvidor): Promise<editProvidor>{
        return ProvedoresApi.editProvidor(newData);
    }

    async deleteProvidor(Id: string): Promise<void>{
        return ProvedoresApi.deleteProvidor(Id);
    }
    
    async activateProvidor(Id: string): Promise<void>{
        return ProvedoresApi.activateProvidor(Id);
    }
}