import React, { useEffect } from 'react';
import { Modal, Input, Form, Checkbox } from 'antd';
import { EditClient, getClients, newClient } from '../../assets/config/entities/Clientes';

// Props for AddModal
interface AddModalProps {
  open: boolean;
  onSubmit: (data: newClient) => void;
  onCancel: () => void;
}

// AddModal Component
export const AddModal: React.FC<AddModalProps> = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit({ ...values });
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Agregar Nuevo Cliente"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        name="clienteForm"
      >
        <Form.Item
          label="Nombre Completo"
          name="FullName"
          rules={[{ required: true, message: 'Por favor ingresa el nombre completo' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="Address"
          rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="IsCredit"
          valuePropName="checked"
        >
          <Checkbox>¿Tiene crédito?</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Props for EditarModal
interface EditModalProps {
  open: boolean;
  datoFila: getClients | null;
  onCancel: () => void;
  onSubmit: (data: EditClient) => void;
}

// EditarModal Component
export const EditarModal: React.FC<EditModalProps> = ({ open, datoFila, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

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
      onSubmit(valores);
      onCancel();
    });
  };

  return (
    <Modal
      title="Editar Cliente"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        name="clienteForm"
      >
        <Form.Item
          label="Nombre Completo"
          name="FullName"
          rules={[{ required: true, message: 'Por favor ingresa el nombre completo' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="Address"
          rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="IsCredit"
          valuePropName="checked"
        >
          <Checkbox>¿Tiene crédito?</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Props for DetailsModal
interface DetailsModalProps {
  open: boolean;
  onCancel: () => void;
  datoFila: getClients | null;
}

// DetailsModal Component
export const DetailsModal: React.FC<DetailsModalProps> = ({ open, onCancel, datoFila }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (datoFila) {
      form.setFieldsValue(datoFila);
    }
  }, [form, datoFila]);

  return (
    <Modal
      title="Detalles del Cliente"
      open={open}
      onCancel={onCancel}
      onOk={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="clienteForm"
      >
        <Form.Item
          label="Nombre Completo"
          name="FullName"
          rules={[{ required: true, message: 'Por favor ingresa el nombre completo' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="Address"
          rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="IsCredit"
          valuePropName="checked"
        >
          <Checkbox disabled>¿Tiene crédito?</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};
