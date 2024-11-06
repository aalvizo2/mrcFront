import { getReport, saveSales } from "../../../entities/SalesReport";
import { SalesReportRepositoryImpl } from "../../../repositoryImpl/SalesReportRepositoryImpl";



export class SalesReportUseCases{
    constructor(private salesReport: SalesReportRepositoryImpl){}

    async saveReport(data: saveSales): Promise<saveSales>{
        return this.salesReport.saveReport(data);
    }

    async getReports(): Promise<getReport[]>{
        return this.salesReport.getReport();
    }
}