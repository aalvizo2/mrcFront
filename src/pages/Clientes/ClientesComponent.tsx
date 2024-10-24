import React, { useEffect, useState } from "react";
import {
    Button, 
    Input, 
    Table, 
    Popconfirm, 
    Tag,
    Select
} from 'antd'; 
import {
    PlusOutlined,
    EditOutlined,
    SearchOutlined,
}from '@ant-design/icons'; 
import { activateClient, deleteClient, EditClient, getClients, newClient } from "../../assets/config/entities/Clientes";
import { ClientesRepositoryImpl } from "../../assets/config/repositoryImpl/ClientesRepositoryImpl";
import { ClientesUseCases } from "../../assets/config/core/application/usecases/ClientesUseCases";
import { AddModal, EditarModal } from "./ClientesModal";
import { MdAutorenew } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";



const clientesRepository= new ClientesRepositoryImpl();
const clientesUseCases= new ClientesUseCases(clientesRepository);


const {Option}= Select;




const ClientesComponent: React.FC= () =>{
    const [data, setData]= useState<getClients[]>([]);
    const [loading, setLoading]= useState(false);
    const [searchText, setSearchText] = useState<string>("");
    const [filterState, setFilterState] = useState<string>("todos")

    //CRUD
    //fetch
    const fetchData= async() =>{
        setLoading(true); 
        try{
            const response= await clientesUseCases.getClient();
            setData(response);
        }catch(error){
            console.error('error al cargar los datos', error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchData();
    }, []);
    
    //Add
    const handleAdd= async(values: newClient) =>{
        try{
             await clientesUseCases.newClient(values);
             fetchData();
             handleCloseModal();
        }catch(error){
            console.error('Error al agregar', error);
        }
    };

    //Edit 
    const handleEdit= async(newData: EditClient) =>{
        try{
            
           await clientesUseCases.editClient(newData);
           fetchData();
        }catch(error){
            console.error('Error al Editar', error)
        }
    }

    //Delete 
    const Eliminar= async(record: deleteClient)=>{
        try{
           console.log('record', record)
           await clientesUseCases.deleteClient(record.Id);
           fetchData();
        }catch(error){
            console.error('Error al eliminar')
        }
    };

    //Activate 
    const Activar= async(record: activateClient) =>{
        await clientesUseCases.activateClient(record.Id);
        fetchData();
    }

    //Modals
    const [modal, setModal]= useState(false); 
    const [editModal, setEditModal]= useState(false);
    const [datoFila, setDatoFila]= useState<getClients | null>(null);

    const openAddModal= () =>{
        setModal(true);
    }; 

    const handleCloseModal= () =>{
        setModal(false);
    }; 

    const openEditForm= (record: getClients) => {
        setDatoFila(record);
        setEditModal(true);

    }

    //Table columns
    const columns=[
        { title: 'Nombre Cliente', dataIndex: 'FullName', key: 'FullName'},
        {title: 'Dirección', dataIndex: 'Address', key: 'Address'},
        {
            title: 'Tiene Credito',
            dataIndex: 'IsCredit',
            key: 'IsCredit',
            render: (status: boolean) => (
                <Tag color={status? 'green' : 'red'}>
                    {status ? 'Sí' : 'No'}
                </Tag>
            )
        },
        {
            title: 'Estatus',
            dataIndex: 'State',
            key: 'State',
            render: (status: boolean) => (
                <Tag color={status? 'green' : 'red'}>
                    {status ? 'Activo' : 'Inactivo'}
                </Tag>
            )
        },
        {
            title: "Acciones",
            key: "acciones",
            // eslint-disable-next-line
            render: (_: any, record: any) => (
                <span>
                    <Button
                        type="default"
                        style={{ marginRight: 8 }}
                        disabled={!record.State}
                        onClick={() => openEditForm(record)}
                    >
                        <div className="botones">
                            <EditOutlined />
                            <span>Editar</span>
                        </div>
                    </Button>
                    {record.State ? (
                        <Popconfirm
                            title="¿Estás seguro de desactivar este registro?"
                            onConfirm={() => Eliminar(record)}
                            okText="Sí"
                            cancelText="No"
                        >
                            <Button type="default">
                                <div className="botones">
                                    <MdAutorenew />
                                    <span>Desactivar</span>
                                </div>
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title="¿Estas seguro de activar este registro?"
                            onConfirm={() => Activar(record)}
                            okText="Sí"
                            cancelText="No"
                        >
                            <Button type="default">
                                <div className="botones">
                                    <MdAutorenew />
                                    <span>Activar</span>
                                </div>
                            </Button>
                        </Popconfirm>
                    )}

                    <Button type="default" 
                        //onClick={() => openSeeForm(record)}
                    >
                        <div className="botones">
                            <CgDetailsMore />
                            <span>Detalles</span>
                        </div>
                    </Button>
                </span>
            ),
        },  

    ];

    //Filters 
    const filteredData = data.filter((documento) => {
        // Filtrar por estado
        const matchesState =
            filterState === "todos" ||
            (filterState === "activos" && documento.State) ||
            (filterState === "inactivos" && !documento.State);

        const matchesSearch = documento.FullName.toLowerCase().includes(
            searchText.toLowerCase()
        );

        return matchesSearch && matchesState;
    });

    return(
       <>
           <h1>Clientes</h1>
           
           <Button
             type="primary"
             onClick={openAddModal}
           >
               <PlusOutlined />
               Agregar Nuevo
           </Button>
           <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignContent: "center",
                      marginBottom: 16
                    }}
                    >
                       <span style={{ alignContent: "center", marginRight: 8 }}>Estado: </span>
                        <Select
                            value={filterState}
                            onChange={(value) => setFilterState(value)}
                            style={{ width: 150, marginRight: 16 }}
                        >
                            <Option value="todos">Todos</Option>
                            <Option value="activos">Activos</Option>
                            <Option value="inactivos">Inactivos</Option>
                        </Select>
                        <Input
                            placeholder="Buscar por nombre"
                            style={{ width: 200, marginRight: 8 }}
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
            </div>
              

           <Table dataSource={filteredData} columns={columns} loading={loading}/>

           <AddModal 
              open={modal}
              onCancel={handleCloseModal}
              onSubmit={handleAdd}
           />
           <EditarModal
              open={editModal}
              onCancel={() => setEditModal(false)}
              onSubmit={handleEdit}
              datoFila={datoFila}
            />
       </>
    )
}

export default ClientesComponent;