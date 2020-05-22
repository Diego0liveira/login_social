import React, { useState, useEffect, useRef } from "react";
import { Form } from '@unform/web'
import Alert from 'react-s-alert';
import Modal from 'react-modal';

import ClientForm from '../../components/ClientForm';
import { searchClients, newClient, updateClient, deleteClient } from '../../_services/ClientService';
import ClientTable from '../../components/ClientTable'
import Input from '../../components/Input'

import './style.css';


const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '800px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const Client = () => {

    const [clients, setClients] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [clientUpdate, setClientUpdate] = useState(null);


    const formRef = useRef({})
    let subtitle

    useEffect(() => {
        getClientes()
    }, [setClients])


    const afterOpenModal = () => {
        subtitle.style.color = '#017FBC';
    }


    const openModal = () => {
        setIsOpen(true)
    }


    const closeModal = () => {
        setClientUpdate(null)
        setIsOpen(false)
    }


    const onDadosUodate = (client) => {
        setClientUpdate(client)
        openModal()
    }


    const getClientes = async () => {
        await searchClients()
            .then(response => {
                setClients(response)
            }).catch(error => {
                console.log(error)
            })
    }


    const handleSearch = async (data) => {
        await newClient({name: data.name})
            .then(response => {
                setClients(response)
            }).catch(error => {
                Alert.error('Ocorreu um erro ao obter os clientes: ', error.message)
            })
    }


    const onHandleClient = (client) => {
        if (client.id) {
            update(client)
        } else {
            register(client)
        }
    }


    const register = async (client) => {
        await newClient(client)
            .then(response => {
                setClients(clients.concat(response))
                Alert.success("Cliente cadastrado com sucesso.");
                closeModal()
            }).catch(error => {
                Alert.error('Ocorreu um erro ao cadastrar cliente: ', error.message)
            })
    }


    const update = async (client) => {
        await updateClient(client)
            .then(response => {
                getClientes()
                Alert.success("Cliente atualizado com sucesso.");
                closeModal()
            }).catch(error => {
                Alert.error('Ocorreu um erro ao atualizar cliente: ', error.message)
            })
    }


    const onDelete = async (client) => {

        window.confirm(`Deseja mesmo excluir o cliente ${client.name}?`)

        await deleteClient(client.id)
            .then(() => {
                Alert.success('Cliente excluído com sucesso.')
                getClientes()
        }).catch(error => {
            Alert.error('Ocorreu um erro ao excluir cliente: ', error)
            console.log('error >>> ',error)
        })
    }


    return (
        <div className="client-container">

            <div className="div-search">
                <Form className="form-search" ref={formRef} onSubmit={handleSearch}>
                    <button className="cadastro-button" type="submit">Buscar</button>
                    <Input className="input-search" name="name"  placeholder="Nome" />
                </Form>
                <button className="cadastro-button" onClick={openModal}>Novo Cliente</button>
            </div>
            <div className="modal-container">
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                    
                >
                    <div className="header-modal">
                        <h1 ref={_subtitle => (subtitle = _subtitle)}>Cadastro de Clientes</h1>
                        <button className="button-close-modal" onClick={closeModal}>X</button>
                    </div>
                    <div>
                        <ClientForm handleClient={onHandleClient} {...{ clientUpdate }} />
                    </div>
                </Modal>
            </div>
            {
                clients === null || clients.length === 0 ? (
                    <h1 className="msg-table" >Não possuí clientes cadastrados.</h1>
                ) : (
                        <ClientTable {...{ clients }} onDadosUodate={onDadosUodate} onDelete={onDelete} />
                )
            }
        </div>
    )
}

export default Client