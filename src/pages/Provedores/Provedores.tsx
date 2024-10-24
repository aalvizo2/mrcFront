import React from 'react';
import MainLayout from '../../components/Layout/Layout'; 
import ProvedoresComponent from './ProvedoresComponent';


const Provedores: React.FC=() => {
    return (
        <MainLayout>
            <ProvedoresComponent />
        </MainLayout>
    )
};

export default Provedores;