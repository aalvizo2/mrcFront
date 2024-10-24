export interface getClients{
    Id: string;
    FullName: string;
    Address: string;
    IsCredit: boolean;
    State: boolean;
}

export interface newClient{
    FullName: string;
    Address: string;
    IsCredit: string;
}

export interface EditClient{
   Id: string;
   Address: string;
   IsCredit: string;
   State: boolean;
}

export interface deleteClient{
    Id: string;
}

export interface activateClient{
    Id: string;
}