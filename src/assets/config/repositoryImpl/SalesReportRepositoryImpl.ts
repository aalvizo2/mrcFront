import { SalesReportApi } from "../api/SalesReportApi";
import { getReport, saveSales } from "../entities/SalesReport";




export class SalesReportRepositoryImpl{
    async saveReport(data: saveSales): Promise<saveSales>{
        return SalesReportApi.createReport(data);
    }

    async getReport(): Promise<getReport[]>{
        return SalesReportApi.getReports();
    }
}