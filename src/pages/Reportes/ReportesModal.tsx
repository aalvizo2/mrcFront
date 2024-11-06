import React from "react";
import { 
    Modal, 
    Button
}from 'antd'; 
import {CloseOutlined} from '@ant-design/icons'; 
import { getReport } from "../../assets/config/entities/SalesReport";



interface SeeModalProps{
    open: boolean; 
    datoFila: getReport | null;
    onCancel: () => void;
}


export const SeeModal: React.FC<SeeModalProps>= ({open, datoFila, onCancel}) => {

    return(
        <> 
        <Modal
           open={open}
           onCancel={onCancel}
           onOk={onCancel}
          footer={[
            <Button key="close" type="default" onClick={onCancel}>
               <CloseOutlined /> Cerrar
            </Button>
          ]}
        >
    
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>{datoFila?.cliente}</p>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>{datoFila?.domicilio}</p>

           <div style={{
              borderTop: '1px solid #ccc',
              paddingTop: '10px',
              marginTop: '10px'
           }}>
           <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '15px' }}>Productos</h2>
           <ul style={{
                listStyle: 'none',
                padding: 0,
                fontSize: '14px'
           }}>
               {datoFila?.selectedProducts.map(item => (
                   <li key={item.Id} style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       borderBottom: '1px solid #eee',
                       padding: '8px 0'
                    }}>
                        <span>{item.Name}</span>
                        <span>Cantidad: {item.Amount}</span>
                        <span>Precio: ${item.Price}</span>
                        <span>Total: ${item.productTotal}</span>
                   </li>
                ))}
           </ul>
           </div>

           <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontWeight: 'bold',
              fontSize: '16px',
              marginTop: '20px'
           }}>
              <p>Total: ${datoFila?.total}</p>
           </div>
        </Modal>

        </>
    );
}; 

