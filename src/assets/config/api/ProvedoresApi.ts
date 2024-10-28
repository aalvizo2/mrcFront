import createHttpClient from "../http/createHttpClient";
import { API_BASE_URL } from "../apiConfig";
import { editProvidor, getProvidors, newProvidor } from "../entities/Provedores";
import { message } from "antd";


const httpClient= createHttpClient(API_BASE_URL); 



export const ProvedoresApi ={
    getProvidors: async(): Promise<getProvidors[]>=>{
        const response= await httpClient.get('/api/v1/Providors'); 
        return response.data.Data;
    }, 
    
    newProvidor: async(newData: newProvidor): Promise<newProvidor>=>{
        const response= await httpClient.post('/api/v1/Providor', newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        } 
        return response.data;
    }, 

    editProvidor: async(newData: editProvidor): Promise<editProvidor>=>{
        const response= await httpClient.post(`/api/v1/Providor/${newData.Id}`, newData);
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        } 
        return response.data;
    }, 

    deleteProvidor: async(Id: string): Promise<void>=>{
        const response= await httpClient.delete(`/api/v1/Providor/${Id}`); 
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        } 
        return response.data;
    }, 
    
    activateProvidor: async(Id: string): Promise<void>=>{
        const response= await httpClient.post(`/api/v1/Providor/state/${Id}`); 
        if(response.status === 200){
            message.success(response.data.Message);
        }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
        } 
        return response.data;
    }
}