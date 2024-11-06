import createHttpClient from "../http/createHttpClient";
import { API_BASE_URL } from "../apiConfig";
import { getReport, saveSales } from "../entities/SalesReport";
import { message } from "antd";


const httpClient= createHttpClient(API_BASE_URL); 


export const SalesReportApi= {
    createReport: async(data: saveSales): Promise<saveSales>=>{
          const response= await httpClient.post('/api/v1/Sales', data);
          if(response.status === 200){
            message.success(response.data.Message);
          }else{
            message.info(response.data.Message); 
            throw new Error(response.data.Message);
          }
          return response.data;
    }, 
    
    getReports: async(): Promise<getReport[]>=>{
        const response= await httpClient.get('/api/v1/Sales');
        console.log(response.data, 'respuesta de la api')
        return response.data;
    }
}