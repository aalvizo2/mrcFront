export interface getProvidors{
    Id: string;
    Name: string;
    Address: string;
    PhoneNumber: string;
    State: string;
    CreatedAt: string;
}


export interface newProvidor{
    Name: string;
    Address: string;
    PhoneNumber: string;

}

export interface editProvidor{
    Id: string;
    Name: string;
    Address: string;
    PhoneNumber: string;

}


export interface deleteProvidor{
    Id: string;
}

export interface activateProvidor{
    Id: string;
    
}