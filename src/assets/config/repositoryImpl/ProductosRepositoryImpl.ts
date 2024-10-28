import { ProductosApi } from "../api/ProductosApi";
import { editProduct, getProduct, newProduct } from "../entities/Productos";




export class ProductosRepositoryImpl{
    async getProduct(): Promise<getProduct[]>{
        return ProductosApi.getProducto();
    }

    async newProduct(newData: newProduct): Promise<newProduct>{
        return ProductosApi.newProduct(newData);
    }

    async editProduct(newData: editProduct): Promise<editProduct>{
        return ProductosApi.editProduct(newData);
    }

    async deleteProduct(Id: string): Promise<void>{
        return ProductosApi.deleteProduct(Id);
    }

    async activateProduct(Id: string): Promise<void>{
        return ProductosApi.activateProduct(Id);
    }
}