import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import Alert from 'react-s-alert';
import InputMask from 'react-input-mask';
import * as Yup from 'yup'

import Input from '../Input'

import './style.css'

Yup.setLocale({
    date: 'Data de Nascimento é obrigatória'
})

const ClientForm = props => {

    const formRef = useRef({})

    const [telephone, setTelephone] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [idClient, setIdClint] = useState(null);


    useEffect(() => {
        setTimeout(() => {
            if (props.clientUpdate !== null && props.clientUpdate.name !== null) {
                formRef.current.setData({
                    id: props.clientUpdate.id,
                    name: props.clientUpdate.name,
                    birthday: props.clientUpdate.birthday,
                    telephone: props.clientUpdate.telephone,
                    address: {
                        street: props.clientUpdate.address.street,
                        neighborhood: props.clientUpdate.address.neighborhood,
                        city: props.clientUpdate.address.city,
                        state: props.clientUpdate.address.state,
                        nation: props.clientUpdate.address.nation,
                        zipcode: props.clientUpdate.address.zipcode,
                        complement: props.clientUpdate.address.complement,
                    }
                })
                setTelephone(props.clientUpdate.telephone)
                setZipcode(props.clientUpdate.address.zipcode)
                setIdClint(props.clientUpdate.id)
            }
        })
    }, [props.clientUpdate])


    const onChangeTelephone = (event) => {
        setTelephone(event.target.value)
    }


    const onChangeZipcode = (event) => {
        let zipCode = String(event.target.value).replace(/[^0-9]+/g, '')
        setZipcode(zipCode)
    }

    
    async function handleSubmit(data, { reset }) {
        
        data.address.zipcode = zipcode
        data.address.telephone = telephone
        
        try {
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                birthday: Yup.date()
                    .required('Data de Nascimento é obrigatória')
                    .max(new Date(), 'A data de nascimento não pode ser maior que a data atual.'),
                telephone: Yup.string().required('Telefone é obrigatória'),
                address: Yup.object().shape({
                    street: Yup.string().required('Logaradouro é obrigatório'),
                    neighborhood: Yup.string().required('Bairro é obrigatório'),
                    city: Yup.string().required('Cidade é obrigatório'),
                    state: Yup.string().required('Estado é obrigatório'),
                    nation: Yup.string().required('País é obrigatório'),
                    zipcode: Yup.string().required('CEP é obrigatório'),
                })
            })


            console.log('idClient: ', idClient)
            data.id = idClient

            await schema.validate(data, {
                abortEarly: false
            })


            console.log('DATA: ', data)

            props.handleClient(data)

            reset()

        } catch (error) {
            if (error instanceof Yup.ValidationError) {

                error.inner.forEach(error => {
                    Alert.error(error.message)
                })
            } 
        }
    }


    return (
        <div className="form-container">
            <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group row">
                    <div className="form-group col">
                        <label>Nome:</label>
                        <Input className="form-control" name="name" placeholder="Nome" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label>Telefone:</label>
                        <InputMask mask="(99)9999-9999" value={telephone} onChange={onChangeTelephone}>
                            { (inputProps) => <Input {...inputProps} className="form-control" type="text" name="telephone" placeholder="Telefone" /> }
                        </InputMask>
                        
                    </div>
                    <div className="form-group col">
                        <label>Data de nascimento:</label>
                        <Input className="form-control" type="date"  name="birthday" placeholder="Data de nascimento" />
                    </div>
                </div>
                <Scope path="address">
                    <div className="form-group row">
                        <div className="form-group col">
                            <label>CEP:</label>
                            <InputMask mask="99999-999" value={zipcode} onChange={onChangeZipcode}>
                                {(inputProps) => <Input {...inputProps} className="form-control" type="text" name="zipcode" placeholder="CEP" />}
                            </InputMask>
                        </div>
                        <div className="form-group col">
                            <label>Logradouro:</label>
                            <Input className="form-control" name="street" placeholder="Logradouro" />
                        </div>
                        <div className="form-group col">
                            <label>Bairro:</label>
                            <Input className="form-control" name="neighborhood" placeholder="Bairro" />
                        </div>
                    </div>
                   <div className="form-group row">
                        <div className="form-group col">
                            <label>Complemento:</label>
                            <Input className="form-control" name="complement" placeholder="Complemento" />
                        </div>
                        <div className="form-group col">
                            <label>Cidade:</label>
                            <Input className="form-control" name="city" placeholder="Cidade" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="form-group col">
                            <label>Estado:</label>
                            <Input className="form-control" name="state" placeholder="Estado" />
                        </div>
                        <div className="form-group col">
                            <label>País:</label>
                            <Input className="form-control" name="nation" placeholder="País" />
                        </div>
                    </div>
                    <div className="form-group row">
                    </div>
                </Scope>
                <button className="submit-button" type="submit">Salvar</button>
            </Form>
        </div>
    )
}

export default ClientForm