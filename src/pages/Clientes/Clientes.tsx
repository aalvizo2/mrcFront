import React from "react";
import MainLayout from "../../components/Layout/Layout";
import ClientesComponent from "./ClientesComponent";



const Clientes: React.FC= () =>{
    return(
       <MainLayout>
          <ClientesComponent />
       </MainLayout>
    )
}

export default Clientes;