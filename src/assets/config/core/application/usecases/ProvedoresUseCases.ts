import { editProvidor, getProvidors, newProvidor } from "../../../entities/Provedores";
import { ProvedoresRepositoryImpl } from "../../../repositoryImpl/ProvedoresRepositoryImpl";





export class ProvedoresUseCases{
    constructor(private provedorRepository: ProvedoresRepositoryImpl){}

    async getProvidors(): Promise<getProvidors[]>{
        return this.provedorRepository.getProvidors();
    }

    async newProvidor(newData: newProvidor): Promise<newProvidor>{
        return this.provedorRepository.newProvidor(newData);
    }

    async editProvidor(newData: editProvidor): Promise<editProvidor>{
        return this.provedorRepository.editProvidor(newData);
    }

    async deleteProvidor(Id: string): Promise<void>{
        return this.provedorRepository.deleteProvidor(Id);
    }

    async activateProvidor(Id: string): Promise<void>{
        return this.provedorRepository.activateProvidor(Id);
    }
}