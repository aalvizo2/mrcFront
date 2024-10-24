import React, { useState } from "react";
import { Layout } from 'antd'; 
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const {Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode; // Define el tipo de children
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); 

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

      
      <Navbar collapsed={collapsed} onCollapse={setCollapsed} />
      {/*</Header>*/}

      {/* Content with adjusted margins */}
      <Content
        style={{
          backgroundColor: '#fff',
          marginTop: '64px',
          padding: '24px',
          marginLeft: collapsed ? '50px' : '200px', 
          transition: 'margin-left 0.3s', 
          width: '2000px'
          
        }}
      >
        <div
          style={{
            maxWidth: '2200px', /* Ancho máximo para el contenido */
            margin: '0 auto', /* Centramos el contenido horizontalmente */
            padding: '24px', /* Espaciado interno */
            
            
            borderRadius: '8px',
            height: '100vh'
          }}
        >
          {children} {/* Aquí renderizamos los children */}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
