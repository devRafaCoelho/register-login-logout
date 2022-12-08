import React, { useState } from 'react';

import Button from '../Button';
import InputContainer from '../InputContainer';
import api from '../../services/api';
import { Form } from './styles';

export default function FormRegister() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (!form.nome || !form.email || !form.senha || !form.confirmacaoSenha) {
                alert('Preencha todos os campos');
                return;
            }

            if (form.senha !== form.confirmacaoSenha) {
                alert('As senhas precisam ser iguais!');
                return
            }

            await api.post('/cadastro', {
                ...form
            })

            setForm('');

        } catch (error) {
            console.log(error.response.data);
        }
    }

    function handleChangeInputValue(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <InputContainer
                name='nome'
                type='text'
                content='Nome'
                value={form.nome ?? ''}
                onChange={handleChangeInputValue}
            />

            <InputContainer
                name='email'
                type='email'
                content='E-mail'
                value={form.email ?? ''}
                onChange={handleChangeInputValue}
            />

            <InputContainer
                name='senha'
                type='password'
                content='Senha'
                value={form.senha ?? ''}
                onChange={handleChangeInputValue}
            />

            <InputContainer
                name='confirmacaoSenha'
                type='password'
                content='Confirmação da senha'
                value={form.confirmacaoSenha ?? ''}
                onChange={handleChangeInputValue}
            />

            <Button content='Cadastrar' />
        </Form>
    );
}