import React from 'react'; 
import MainLayout from '../../components/Layout/Layout';
import ProductosComponent from './ProductosComponent';

const Productos: React.FC= () => {
    return(
        <MainLayout>
           <ProductosComponent />
        </MainLayout>
    );
}; 

export default Productos;