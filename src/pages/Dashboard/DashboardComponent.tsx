import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Table, notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ClientesUseCases } from '../../assets/config/core/application/usecases/ClientesUseCases';
import { ClientesRepositoryImpl } from '../../assets/config/repositoryImpl/ClientesRepositoryImpl';
import { getClients } from '../../assets/config/entities/Clientes';
import { ProductosRepositoryImpl } from '../../assets/config/repositoryImpl/ProductosRepositoryImpl';
import { ProductoUseCases } from '../../assets/config/core/application/usecases/ProductoUseCases';
import { getProduct } from '../../assets/config/entities/Productos';



const { Option } = Select;


const productoRepository= new ProductosRepositoryImpl();
const productoUseCases= new ProductoUseCases(productoRepository); 

const clientesRepository= new ClientesRepositoryImpl();
const clientesUseCases= new ClientesUseCases(clientesRepository);

const DashboardComponent = () => {
    const [clientes, setClientes]= useState<getClients[]>([]);
    const [form] = Form.useForm();
    const [products, setProducts] = useState<getProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const fetchProducts= async() => {
        const response= await productoUseCases.getProduct(); 
        setProducts(response);
    }; 

    useEffect(() =>{
        fetchProducts();
    }, []);

    const handleFinish = (values: any) => {
        console.log('Detalles de la venta:', values);
        notification.success({
            message: 'Venta generada',
            description: `Se ha generado una venta por un total de $${values.total}`,
        });
    };

    const handleSelectProduct = (value: any) => {
        const product = products.find(p => p.Name === value);
        if (product) {
            const quantity = form.getFieldValue('quantity') || 1; // Valor por defecto 1
            //@ts-expect-error
            const total = product.PublicPrice * quantity;

            // Actualiza el total en el formulario
            form.setFieldsValue({ total });
            
            // Agregar producto a la lista de seleccionados
            //@ts-expect-error
            setSelectedProducts(prev => {
                //@ts-expect-error
                const exists = prev.find(p => p.name === product.name);
                if (exists) {
                    return prev; // Evita duplicados
                }
                return [...prev, { ...product, quantity }];
            });
        }
    };
    
    //Clients fetch
    const fetchClients= async() =>{
        const response= await clientesUseCases.getClient();
        setClientes(response);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <>
            <h1>Generar Venta</h1>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item 
                    label="Seleccionar Cliente" 
                    name="client" 
                    rules={[{ required: true, message: 'Por favor, selecciona un cliente' }]}
                >
                    <Select placeholder="Selecciona un cliente">
                        {clientes.map((cliente) => (
                            <Option 
                               value={cliente.Id}
                               key={cliente.Id}
                            >
                                {cliente.FullName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item 
                    label="Seleccionar Producto" 
                    name="product" 
                    rules={[{ required: true, message: 'Por favor, selecciona un producto' }]}
                >
                    <Select placeholder="Selecciona un producto" onChange={handleSelectProduct}>
                        {products.map(product => (
                            <Option key={product.Name} value={product.Name}>{product.Name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item 
                    label="Cantidad" 
                    name="quantity" 
                    rules={[{ required: true, message: 'Por favor, ingresa una cantidad' }]}
                >
                    <Input type="number" placeholder="Ingrese la cantidad" defaultValue={1} />
                </Form.Item>

                <Form.Item 
                    label="Precio Total" 
                    name="total" 
                    rules={[{ required: true, message: 'Por favor, ingresa el precio total' }]}
                >
                    <Input placeholder="Precio total" readOnly />
                </Form.Item>

                <Button type="primary" htmlType="submit" icon={<ShoppingCartOutlined />}>
                    Confirmar Venta
                </Button>
            </Form>

            <Table
                dataSource={selectedProducts}
                columns={[
                    { title: 'Producto', dataIndex: 'Name', key: 'Name' },
                    { title: 'Precio', dataIndex: 'PublicPrice', key: 'PublicPrice' },
                    { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' }
                ]}
                pagination={false}
                style={{ marginTop: 20 }}
            />
        </>
    );
};

export default DashboardComponent;
