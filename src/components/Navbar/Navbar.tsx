import React, { useEffect, useState } from "react";
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons'; // Importar el ícono de menú
import './Navbar.css';

const { Header } = Layout;

interface NavbarProps {
  onCollapse: (collapsed: boolean) => void; // Prop para manejar el colapso del Sidebar
  collapsed: boolean; // Estado del colapso
}

const Navbar: React.FC<NavbarProps> = ({ onCollapse, collapsed }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem('username');
    setUsername(usuario);
  }, []);

  return (
    <Header
      style={{
        padding: 15,
        backgroundColor: '#ffffff',
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: 1000,
        width: collapsed? '100%': '90%',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0.1)',
        marginLeft: collapsed? 0 : 200
        
      }}
    >
      {/* Botón de menú hamburguesa */}
      <Button
        type="default"
        icon={<MenuOutlined />}
        onClick={() => onCollapse(!collapsed)} // Cambiar el estado del colapso
        style={{ marginRight: 'auto' }} // Espaciado a la derecha
      />
      <div style={{ fontSize: '18px', color: '#333', marginRight: 100 }}>{username}</div>
    </Header>
  );
};

export default Navbar;
