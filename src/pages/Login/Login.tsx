import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, Alert } from 'antd';
import './Login.css';
import { AuthRepositoryImpl } from '../../assets/config/repositoryImpl/AuthRepositoryImpl';
import { AuthUseCases } from '../../assets/config/core/application/usecases/AuthUseCases';



const authRepository= new AuthRepositoryImpl();
const authUseCases= new AuthUseCases(authRepository);

interface LoginProps{
    setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({setIsAuthenticated}) => {
   
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [form] = Form.useForm(); 
    const navigate = useNavigate();

    const onFinish = async(values: any) => {
        setLoading(true);
        setErrorMessage(null); // Reset the error message on each submit attempt
        try {
            const response= await authUseCases.login(values); 
            console.log(response);
            setIsAuthenticated(true);
            navigate('/dashboard');
            const username= values.username;
            localStorage.setItem('username', username); 
            
        } catch (error) {
            console.error('Error de autenticación', error);
            //@ts-expect-error
            setErrorMessage(error.response.data.Message || 'Ocurrió un error durante la autenticación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='background-element'>
                <div className='container'>
                    <h2 className="login-title">Iniciar Sesión</h2>
                    <Form
                        form={form}
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        className="login-form"
                    >
                        <Form.Item
                            name="username"
                            label="Nombre de Usuario"
                            rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario!' }]}
                        >
                            <Input placeholder="Ingresa tu nombre de usuario" disabled={loading} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Contraseña"
                            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                        >
                            <Input.Password placeholder="Ingresa tu contraseña" disabled={loading} />
                        </Form.Item>
                        {errorMessage && (
                            <Alert message={errorMessage} type="error" showIcon className="error-message" />
                        )}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button" loading={loading} disabled={loading}>
                                {loading ? <Spin /> : 'Iniciar Sesión'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            
        </>
    ); 
}; 

export default Login;
