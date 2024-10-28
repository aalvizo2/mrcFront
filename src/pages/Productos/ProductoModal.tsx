import React, { useEffect, useState } from 'react';
import { Modal, Input, Form,  Col, Row, Select } from 'antd';
import { ProvedoresRepositoryImpl } from '../../assets/config/repositoryImpl/ProvedoresRepositoryImpl';
import { ProvedoresUseCases } from '../../assets/config/core/application/usecases/ProvedoresUseCases';
import { editProduct, getProduct, newProduct } from '../../assets/config/entities/Productos';
import { getProvidors } from '../../assets/config/entities/Provedores';

const {Option}= Select;

const provedorRepository= new ProvedoresRepositoryImpl();
const provedorUseCases= new ProvedoresUseCases(provedorRepository);

// Props for AddModal
interface AddModalProps {
  open: boolean;
  onSubmit: (data: newProduct) => void;
  onCancel: () => void;
}

// AddModal Component
export const AddModal: React.FC<AddModalProps> = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [provedor, setProvedor]= useState<getProvidors[]>([]);


  const fetchProvidors= async()=>{
    const response= await provedorUseCases.getProvidors();
    setProvedor(response)
  }; 

  useEffect(() => {
    fetchProvidors();
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit({ ...values });
      form.resetFields();
    });
  };

  return (
    <Modal
  title="Agregar Nuevo Producto"
  open={open}
  onCancel={onCancel}
  onOk={handleSubmit}
>
  <Form
    form={form}
    layout="vertical"
    name="productoForm"
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Nombre"
          name="Name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre completo' }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Cantidad"
          name="Amount"
          rules={[{ required: true, message: 'Por favor ingresa la cantidad' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Precio"
          name="Price"
          rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Precio Público"
          name="PublicPrice"
          rules={[{ required: true, message: 'Por favor ingresa el precio público' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
         <Form.Item 
            label='Provedor'
            name='Providor'
            rules={[{
              required: true, 
              message: 'Ingresa un provedor'
            }]}
          >
            <Select placeholder='Selecciona un provedor'>
               {provedor.map(item=> (
                  <Option key={item.Name} value={item.Name}>
                    {item.Name}
                  </Option>
               ))}
            </Select>
          </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>

  );
};

// Props for EditarModal
interface EditModalProps {
  open: boolean;
  datoFila: getProduct | null;
  onCancel: () => void;
  onSubmit: (data: editProduct) => void;
}

// EditarModal Component
export const EditarModal: React.FC<EditModalProps> = ({ open, datoFila, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [provedor, setProvedor]= useState<getProvidors[]>([]);


  const fetchProvidors= async()=>{
    const response= await provedorUseCases.getProvidors();
    setProvedor(response)
  }; 

  useEffect(() => {
    fetchProvidors();
  }, []);

  useEffect(() => {
    if (datoFila) {
      form.setFieldsValue(datoFila);
    }
  }, [form, datoFila]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const valores = {
        Id: datoFila?.Id,
        ...values
      };
      console.log('valores a enviar', valores)
      onSubmit(valores);
      onCancel();
    });
  };

  return (
    <Modal
  title="Editar Producto"
  open={open}
  onCancel={onCancel}
  onOk={handleSubmit}
>
  <Form
    form={form}
    layout="vertical"
    name="productoForm"
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Nombre"
          name="Name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre completo' }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Cantidad"
          name="Amount"
          rules={[{ required: true, message: 'Por favor ingresa la cantidad' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Precio"
          name="Price"
          rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Precio Público"
          name="PublicPrice"
          rules={[{ required: true, message: 'Por favor ingresa el precio público' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
         <Form.Item 
            label='Provedor'
            name='Providor'
            rules={[{
              required: true, 
              message: 'Ingresa un provedor'
            }]}
          >
            <Select placeholder='Selecciona un provedor'>
               {provedor.map(item=> (
                  <Option key={item.Name} value={item.Name}>
                    {item.Name}
                  </Option>
               ))}
            </Select>
          </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>
  );
};

// Props for DetailsModal
interface DetailsModalProps {
  open: boolean;
  onCancel: () => void;
  datoFila: getProduct | null;
}

// DetailsModal Component
export const DetailsModal: React.FC<DetailsModalProps> = ({ open, onCancel, datoFila }) => {
  const [form] = Form.useForm();

  const [provedor, setProvedor]= useState<getProvidors[]>([]);


  const fetchProvidors= async()=>{
    const response= await provedorUseCases.getProvidors();
    setProvedor(response)
  }; 

  useEffect(() => {
    fetchProvidors();
  }, []);

  useEffect(() => {
    if (datoFila) {
      form.setFieldsValue(datoFila);
    }
  }, [form, datoFila]);

  return (
    <Modal
    title="Detalles Producto"
    open={open}
    onCancel={onCancel}
    onOk={onCancel}
    
  >
    <Form
      form={form}
      layout="vertical"
      name="productoForm"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Nombre"
            name="Name"
            rules={[{ required: true, message: 'Por favor ingresa el nombre completo' }]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>
  
        <Col span={12}>
          <Form.Item
            label="Cantidad"
            name="Amount"
            rules={[{ required: true, message: 'Por favor ingresa la cantidad' }]}
          >
            <Input type="number" disabled/>
          </Form.Item>
        </Col>
      </Row>
  
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Precio"
            name="Price"
            rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
          >
            <Input type="number" disabled/>
          </Form.Item>
        </Col>
  
        <Col span={12}>
          <Form.Item
            label="Precio Público"
            name="PublicPrice"
            rules={[{ required: true, message: 'Por favor ingresa el precio público' }]}
          >
            <Input type="number" disabled/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
         <Form.Item 
            label='Provedor'
            name='Providor'
            rules={[{
              required: true, 
              message: 'Ingresa un provedor'
            }]}
          >
            <Select placeholder='Selecciona un provedor' disabled>
               {provedor.map(item=> (
                  <Option key={item.Name} value={item.Name}>
                    {item.Name}
                  </Option>
               ))}
            </Select>
          </Form.Item>
      </Col>
    </Row>
    </Form>
  </Modal>
  );
};
