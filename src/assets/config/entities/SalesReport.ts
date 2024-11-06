export interface saveSales{
    cliente: string;
    domicilio: string;
    productos: [
        {
            Id: String,
            Name: String,
            Amount: String,
            Price: String,
            PublicPrice: Number,
            State: Boolean,
            CreatedAt: String,
            Providor: String,
            quantity: Number,
            productTotal: String
        }
    ];
    total: Number; 
    
}

export interface getReport {
    cliente: string;
    domicilio: string;
    selectedProducts: {
        Id: string;
        Name: string;
        Amount: string;
        Price: string;
        PublicPrice: number;
        State: boolean;
        CreatedAt: string;
        Providor: string;
        quantity: number;
        productTotal: string;
    }[];
    total: number;
    CreatedAt: string;
    numeroNota: string;
}