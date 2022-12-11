import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Form, InputContainer, Button } from './styles';
import api from '../../services/api';

export default function FormRegister() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    });
    const navigate = useNavigate();

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
            navigate('/');
        } catch (error) {
            console.log(error.response.data);
        }
    }

    function handleChangeInputValue(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputContainer>
                <label htmlFor="nome">Nome</label>
                <input
                    name="nome"
                    type="text"
                    value={form.nome ?? ''}
                    onChange={handleChangeInputValue}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="email">E-mail</label>
                <input
                    name="email"
                    type="email"
                    value={form.email ?? ''}
                    onChange={handleChangeInputValue}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="senha">Senha</label>
                <input
                    name="senha"
                    type="password"
                    value={form.senha ?? ''}
                    onChange={handleChangeInputValue}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="confirmacaoSenha">Confirmação de Senha</label>
                <input
                    name="confirmacaoSenha"
                    type="password"
                    value={form.confirmacaoSenha ?? ''}
                    onChange={handleChangeInputValue}
                />
            </InputContainer>

            <Button>
                Register
            </Button>
        </Form>
    );
}