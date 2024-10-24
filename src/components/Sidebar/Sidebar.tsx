import React from "react";
import { Menu, Layout } from 'antd';
import { ShoppingCartOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import logo from '../../assets/img/logo.png';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const navigate= useNavigate();
    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/')

    };
    
    interface MenuItem {
        key: string;
        icon: React.ReactNode;
        label: string;
        path?: string; // Cambiar a path opcional
        action?: () => void; // Agregar acción opcional
    };

    const menuItems: MenuItem[] = [
        { key: '1', icon: <ShoppingCartOutlined />, label: 'Generar Venta', path: '/dashboard' },
        { key: '2', icon: <UserOutlined />, label: 'Clientes', path: '/clientes' },
        { key: '3', icon: <UserOutlined />, label: 'Proveedores', path: '/proveedores' },
        { key: '4', icon: <ShoppingCartOutlined />, label: 'Productos', path: '/productos' },
        { key: '5', icon: <UserOutlined />, label: 'Reportes', path: '/reportes' },
        { key: '6', icon: <CloseOutlined />, label: 'Cerrar Sesión', action: handleLogout } // Modificado
    ];

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: '#f00000e8', height: '100vh', position: 'fixed', left: 0, marginTop: collapsed ? 60 : 0 }}
        >
            <div className={collapsed ? 'logo-collapsed' : 'logo-container'}>
                <img src={logo} alt="logo" />
            </div>

            <Menu
                theme="dark"
                mode="inline"
                style={{ backgroundColor: '#f00000e8' }}
            >
                {menuItems.map(item => (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon}
                        onClick={item.key === '6' ? item.action : undefined} // Agregar acción en lugar de path
                    >
                        {item.key !== '6' ? (
                            //@ts-expect-error
                            <Link to={item.path} style={{ color: '#fff' }}>{item.label}</Link>
                        ) : (
                            <span style={{ color: '#fff' }}>{item.label}</span> // Mostrar solo texto para cerrar sesión
                        )}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
