import React, { useEffect, useState } from "react";
import { SalesReportRepositoryImpl } from '../../assets/config/repositoryImpl/SalesReportRepositoryImpl';
import { SalesReportUseCases } from '../../assets/config/core/application/usecases/SalesReportUseCases';
import { getReport } from "../../assets/config/entities/SalesReport";
import {Button} from 'antd';
import { SeeModal } from "./ReportesModal";
import './ReportesComponent.css';

const salesRepository = new SalesReportRepositoryImpl(); 
const salesUseCases = new SalesReportUseCases(salesRepository);

const ReportesComponent: React.FC = () => {
    const [data, setData] = useState<getReport[]>([]);
    const [datoFila, setDatoFila] = useState<getReport | null>(null);
    const [modal, setModal]= useState(false);
    
    const fetchData = async () => {
        try {
            const response = await salesUseCases.getReports();
            setData(response);
        } catch (error) {
            console.error('Error al cargar los datos', error);
        }
    }; 

    useEffect(() => {
        fetchData();
    }, []); 


    //Modal 
    const openSeeModal= (record: any) =>{
        setDatoFila(record); 
        setModal(true);
    }

    return (
        <>
            <h1>Reportes</h1>
            <div className="report-list">
                {data.map((item) => (
                    <div className="report-item" key={item.cliente}>
                        <div className="report-info">
                            <h3 className="numero-nota"><strong>Número de Nota:</strong> {item.numeroNota}</h3>
                            <p><strong>Cliente:</strong> {item.cliente}</p>
                            <p><strong>Total:</strong> ${item.total}</p>
                            <p><strong>Fecha:</strong> {new Date(item.CreatedAt).toLocaleDateString()}</p>
                   
                        </div>
                        <Button 
                            type='primary'
                            onClick={() => openSeeModal(item)}
                        >
                            Detalles
                        </Button>
                    </div>
                ))}
            </div>
            <SeeModal
               open={modal}
               onCancel={() => setModal(false)}
               datoFila={datoFila}
            />
            
        </>
    );
}; 

export default ReportesComponent;
