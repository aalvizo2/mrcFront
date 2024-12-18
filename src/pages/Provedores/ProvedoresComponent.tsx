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

import { AddModal, EditarModal, DetailsModal} from "./ProvedoresModal";
import { MdAutorenew } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { ProvedoresRepositoryImpl } from "../../assets/config/repositoryImpl/ProvedoresRepositoryImpl";
import { ProvedoresUseCases } from "../../assets/config/core/application/usecases/ProvedoresUseCases";
import { activateProvidor, deleteProvidor, editProvidor, getProvidors, newProvidor } from "../../assets/config/entities/Provedores";



const provedoresRepository= new ProvedoresRepositoryImpl();
const provedoresUseCases= new ProvedoresUseCases(provedoresRepository);






const {Option}= Select;




const ProvedoresComponent: React.FC= () =>{
    const [data, setData]= useState<getProvidors[]>([]);
    const [loading, setLoading]= useState(false);
    const [searchText, setSearchText] = useState<string>("");
    const [filterState, setFilterState] = useState<string>("todos")

    //CRUD
    //fetch
    const fetchData= async() =>{
        setLoading(true); 
        try{
            const response= await provedoresUseCases.getProvidors();
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
    const handleAdd= async(values: newProvidor) =>{
        try{
             await provedoresUseCases.newProvidor(values);
             fetchData();
             handleCloseModal();
        }catch(error){
            console.error('Error al agregar', error);
        }
    };

    //Edit 
    const handleEdit= async(newData: editProvidor) =>{
        try{
            
           await provedoresUseCases.editProvidor(newData);
           fetchData();
        }catch(error){
            console.error('Error al Editar', error)
        }
    }

    //Delete 
    const Eliminar= async(record: deleteProvidor)=>{
        try{
           await provedoresUseCases.deleteProvidor(record.Id);
           fetchData();
        }catch(error){
            console.error('Error al eliminar')
        }
    };

    //Activate 
    const Activar= async(record: activateProvidor) =>{
        await provedoresUseCases.activateProvidor(record.Id);
        fetchData();
    }

    //Modals
    const [modal, setModal]= useState(false); 
    const [editModal, setEditModal]= useState(false);
    const [datoFila, setDatoFila]= useState<getProvidors | null>(null);
    const [seeModal, setSeeModal]= useState(false);

    const openAddModal= () =>{
        setModal(true);
    }; 

    const handleCloseModal= () =>{
        setModal(false);
    }; 

    const openEditForm= (record: getProvidors) => {
        setDatoFila(record);
        setEditModal(true);

    };
    
    const openSeeForm= (record: getProvidors) =>{
        setDatoFila(record);
        setSeeModal(true);
    }


    //Table columns
    const columns=[
        { title: 'Nombre Provedor', dataIndex: 'Name', key: 'Name'},
        {title: 'Dirección', dataIndex: 'Address', key: 'Address'},
        { title: 'Número de Teléfono', dataIndex: 'PhoneNumber', key: 'PhoneNumber'},
        
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
                        onClick={() => openSeeForm(record)}
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

        const matchesSearch = documento.Name.toLowerCase().includes(
            searchText.toLowerCase()
        );

        return matchesSearch && matchesState;
    });

    return(
       <>
           <h1>Provedores</h1>
           
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
            <DetailsModal
              open={seeModal}
              onCancel={() => setSeeModal(false)}
              datoFila={datoFila}
            />
       </>
    )
}

export default ProvedoresComponent;