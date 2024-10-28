// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Clientes from './pages/Clientes/Clientes';
import Provedores from './pages/Provedores/Provedores';
import './App.css';
import Productos from './pages/Productos/Productos';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/clientes' element={isAuthenticated? <Clientes /> : <Login setIsAuthenticated={setIsAuthenticated}/> } />
                <Route path='/proveedores' element={isAuthenticated? <Provedores /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/productos' element={isAuthenticated? <Productos /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </Router>
    );
};

export default App;
