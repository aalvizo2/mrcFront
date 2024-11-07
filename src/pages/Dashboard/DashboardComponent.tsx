import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Table, Typography, Row, Col, Divider, notification, Popconfirm } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { ClientesUseCases } from '../../assets/config/core/application/usecases/ClientesUseCases';
import { ClientesRepositoryImpl } from '../../assets/config/repositoryImpl/ClientesRepositoryImpl';
import { getClients } from '../../assets/config/entities/Clientes';
import { ProductosRepositoryImpl } from '../../assets/config/repositoryImpl/ProductosRepositoryImpl';
import { ProductoUseCases } from '../../assets/config/core/application/usecases/ProductoUseCases';
import { getProduct } from '../../assets/config/entities/Productos';
import generarPDF from './GenerarVenta';
import { SalesReportRepositoryImpl } from '../../assets/config/repositoryImpl/SalesReportRepositoryImpl';
import { SalesReportUseCases } from '../../assets/config/core/application/usecases/SalesReportUseCases';







const { Option } = Select;
const { Title, Text } = Typography;

const productoRepository = new ProductosRepositoryImpl();
const productoUseCases = new ProductoUseCases(productoRepository);

const clientesRepository = new ClientesRepositoryImpl();
const clientesUseCases = new ClientesUseCases(clientesRepository);

const salesRepository= new SalesReportRepositoryImpl(); 
const salesUseCases= new SalesReportUseCases(salesRepository);

const DashboardComponent = () => {
    const [clientes, setClientes] = useState<getClients[]>([]);
    const [form] = Form.useForm();
    const [products, setProducts] = useState<getProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [notaContador, setNotaContador] = useState<number>(1);


    const fetchLastNote = async () => {
        try {
            const response = await salesUseCases.getReports();

            const sortedResponse = response.sort((a, b) => parseInt(b.numeroNota, 10) - parseInt(a.numeroNota, 10));
            if (sortedResponse && sortedResponse.length > 0 && sortedResponse[0].numeroNota) {
                setNotaContador(parseInt(sortedResponse[0].numeroNota, 10) + 1);
            }
        } catch (error) {
            console.error('Error al cargar los reportes', error);
        }
    };
    


    

    const fetchProducts = async () => {
        const response = await productoUseCases.getProduct();
        const filteredProducts= response.filter(status => status.State)
        setProducts(filteredProducts);
    };

    useEffect(() => {
        fetchProducts();
        fetchLastNote();
    }, []);

    const fetchClients = async () => {
        const response = await clientesUseCases.getClient();
        const filteredClient= response.filter(item=> item.State)
        setClientes(filteredClient);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleFinish = async (values: any) => {
        const cliente = values.client;
        const selectedClient = clientes.find(c => c.Id === cliente);
        
        

        if (selectedClient) {
            const numeroNota = String(notaContador).padStart(7, '0');
            await generarPDF(
                selectedClient.FullName,
                selectedProducts,
                total,
                selectedClient.Address,
                numeroNota
            );
            setNotaContador(prevNota => prevNota + 1); 
            console.log('arreglo de los productos', selectedProducts)

            const valores={
                cliente: selectedClient.FullName,
                selectedProducts,
                total, 
                direccion: selectedClient.Address,
                numeroNota
    
            }
            //@ts-expect-error
            await salesUseCases.saveReport(valores);
            
        } else {
            notification.error({
                message: 'Error al generar venta',
                description: 'Cliente seleccionado no encontrado.',
            });
        }
    };

    const handleSelectProduct = (value: any) => {
        const product = products.find(p => p.Name === value);
        const quantity = form.getFieldValue('quantity') || '';

        if (product) {
            const productTotal = product.PublicPrice * quantity;
            form.setFieldsValue({ total: productTotal });

            setSelectedProducts(prev => {
                const exists = prev.find(p => p.Name === product.Name);
                if (exists) {
                    return prev.map(p =>
                        p.Name === product.Name
                            ? { ...p, quantity, productTotal }
                            : p
                    );
                }
                console.log('cantidad antes de llegar al endpoint', quantity)
                return [...prev, { ...product, quantity, productTotal }];
                
            });

            // Actualizamos el total general
            const newTotal = selectedProducts.reduce((acc, curr) => acc + curr.productTotal, 0) + productTotal;
            setTotal(newTotal);
        }
    };

    const handleQuantityChange = (value: number) => {
        const productName = form.getFieldValue('product');
        const product = products.find(p => p.Name === productName);
        console.log('valor que se va a usar en la venta', value)

        if (product) {
            const productTotal = product.PublicPrice * value;
            form.setFieldsValue({ total: productTotal });

            setSelectedProducts(prev => {
                const exists = prev.find(p => p.Name === product.Name);
                if (exists) {
                    return prev.map(p =>
                        p.Name === product.Name
                            ? { ...p, quantity: value, productTotal }
                            : p
                    );
                }
                return prev;
            });

            const newTotal = selectedProducts.reduce((acc, curr) => acc + curr.productTotal, 0);
            setTotal(newTotal);
        }
    };

    const handleDeleteProduct = (productName: string) => {
        setSelectedProducts(prev => {
            const updatedProducts = prev.filter(p => p.Name !== productName);
            const newTotal = updatedProducts.reduce((acc, p) => acc + p.productTotal, 0);
            setTotal(newTotal);
            return updatedProducts;
        });
    };

    const columns = [
        { title: 'Producto', dataIndex: 'Name', key: 'Name' },
        { title: 'Precio', dataIndex: 'PublicPrice', key: 'PublicPrice', render: (price: number) => `${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)}` },
        { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Total', dataIndex: 'productTotal', key: 'productTotal', render: (total: number) => `${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}` },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, record: any) => (
                <Popconfirm
                    title="¿Eliminar producto?"
                    onConfirm={() => handleDeleteProduct(record.Name)}
                    okText="Sí"
                    cancelText="No"
                >
                    <Button type="link" icon={<DeleteOutlined />} />
                </Popconfirm>
            )
        }
    ];

    return (
        <>
            <Row justify="space-between" align="middle">
                <Title level={2}>Generar Venta</Title>
                <Button type="primary" icon={<ShoppingCartOutlined />} onClick={() => form.submit()}>
                    Confirmar Venta
                </Button>
            </Row>
            
            <Divider />
            
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Seleccionar Cliente"
                            name="client"
                            rules={[{ required: true, message: 'Por favor, selecciona un cliente' }]}
                        >
                            <Select placeholder="Selecciona un cliente">
                                {clientes.map(cliente => (
                                    <Option value={cliente.Id} key={cliente.Id}>
                                        {cliente.FullName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    
                    <Col span={12}>
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
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Cantidad"
                            name="quantity"
                            rules={[{ required: true, message: 'Por favor, ingresa una cantidad' }]}
                        >
                            <Input type="number" placeholder="Ingrese la cantidad" defaultValue={0} min={1} onChange={e => handleQuantityChange(Number(e.target.value))} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Precio Total" name="total">
                            <Input placeholder="Precio total" readOnly />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Divider />

            <Table
                dataSource={selectedProducts}
                columns={columns}
                pagination={false}
                footer={() => (
                    <div style={{ textAlign: 'right', paddingRight: '20px' }}>
                        <Text strong>Total de la Venta: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}</Text>
                    </div>
                )}
                style={{ marginTop: 20 }}
            />

            
        </>
    );
};

export default DashboardComponent;
