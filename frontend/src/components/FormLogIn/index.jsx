import React, { useEffect, useState } from 'react';
import { Form, InputContainer, Button } from './styles';
import { setItem, getItem } from '../../utils/storage';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function FormLogIn() {
    const [form, setForm] = useState({
        email: '',
        senha: ''
    });
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (!form.email || !form.senha) {
                alert('Preencha todos os campos');
                return;
            }

            const response = await api.post('/login', {
                ...form
            });

            const { token } = response.data;
            setItem('token', token);

            const { nome, email } = response.data.usuario;
            setItem('nome', nome);
            setItem('email', email);

            setForm('');
            navigate('/home');
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const token = getItem('token');

        if (token) {
            navigate('/');
        }
    }, []);

    function handleChangeInputValue(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <Form onSubmit={handleSubmit}>
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

            <Button>
                LogIn
            </Button>
        </Form>
    );


}