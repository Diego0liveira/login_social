import React from "react";
import Moment from 'moment';

import './style.css'

import icon_delete from '../../assets/img/delete.png';
import icon_edit from '../../assets/img/edit.png';


const ClientTable = props => {

    let clients = props.clients


    const onUpdate = (client) => {
        console.log('EVENT: ', client)
        props.onDadosUodate(client)
    }

    const onDelete = (client) => {
        props.onDelete(client)
    }



    return (
        <div className="table-container">
            <div className="table-content">

                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">Logradouro</th>
                            <th scope="col">Complemento</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Estado</th>
                            <th scope="col">País</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            clients.map(element => {
                            return (
                                <tr key={element.id}>
                                    <th scope="row">{element.id}</th>
                                    <td>{ element.name }</td>
                                    <td>{ element.telephone }</td>
                                    <td>{ Moment(element.birthday).format('DD/MM/yyyy') }</td>
                                    <td>{ element.address.street }</td>
                                    <td>{ element.address.complement }</td>
                                    <td>{ element.address.neighborhood }</td>
                                    <td>{ element.address.state }</td>
                                    <td>{ element.address.nation }</td>
                                    <td>{ element.address.zipcode }</td>
                                    <td>
                                        <img className="icon-acao" src={icon_edit} onClick={() => onUpdate(element)} alt="Edit" />
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <img className="icon-acao" src={icon_delete} onClick={() => onDelete(element)} alt="Delete" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientTable;