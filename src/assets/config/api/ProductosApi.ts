import createHttpClient from "../http/createHttpClient";
import { API_BASE_URL } from "../apiConfig";
import { editProduct, getProduct, newProduct } from "../entities/Productos";
import { message } from "antd";




const httpClient= createHttpClient(API_BASE_URL); 


export const ProductosApi= {
    getProducto: async(): Promise<getProduct[]> => {
        const response= await httpClient.get('/api/v1/Product'); 
        return response.data.Data;
    }, 
    
    newProduct: async(newData: newProduct): Promise<newProduct>=>{
        const response= await httpClient.post('/api/v1/Product', newData); 
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data;
    },

    editProduct: async(newData: editProduct): Promise<editProduct>=>{
        const response= await httpClient.post(`/api/v1/Product/${newData.Id}`, newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data;
    }, 
    
    deleteProduct: async(Id: string): Promise<void>=>{
        const response= await httpClient.delete(`/api/v1/Product/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data;
    },

    activateProduct: async(Id: string): Promise<void>=>{
        const response= await httpClient.post(`/api/v1/Product/state/${Id}`);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        }
        return response.data;
    }
}