import React from "react";
import MainLayout from "../../components/Layout/Layout";
import DashboardComponent  from "./DashboardComponent";


const Dashboard: React.FC= () =>{
    return(
        <MainLayout>
            <DashboardComponent />
        </MainLayout>
    )
}; 


export default Dashboard;