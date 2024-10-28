import { editProduct, getProduct, newProduct } from "../../../entities/Productos";
import { ProductosRepositoryImpl } from "../../../repositoryImpl/ProductosRepositoryImpl";




export class ProductoUseCases{
    constructor(private productRepository: ProductosRepositoryImpl){}

    async getProduct(): Promise<getProduct[]>{
        return this.productRepository.getProduct();
    }

    async newProduct(newData: newProduct): Promise<newProduct>{
        return this.productRepository.newProduct(newData);
    }

    async editProduct(newData: editProduct): Promise<editProduct>{
        return this.productRepository.editProduct(newData);
    }

    async deleteProduct(Id: string): Promise<void>{
        return this.productRepository.deleteProduct(Id);
    }

    async activateProduct(Id: string): Promise<void>{
        return this.productRepository.activateProduct(Id);
    }
}