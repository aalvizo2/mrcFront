export interface getProduct{
    Id: string;
    Name: string;
    Amount: string;
    Price: string;
    PublicPrice: string;
    State: boolean;
    Providor: string;
    CreatedAt: string;
}


export interface newProduct{
    Name: string;
    Amount: string;
    Price: string;
    PublicPrice: string;
    Providor: string;

}

export interface editProduct{
    Id: string;
    Name: string;
    Amount: string;
    Price: string;
    PublicPrice: string;
    Providor: string;
    
}

export interface deleteProduct{
    Id: string;
}

export interface activateProduct{
    Id: string;
}