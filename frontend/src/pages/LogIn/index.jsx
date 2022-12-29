import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../components/Button';
import api from '../../services/api';
import { Form } from '../../components/Form';
import { InputContainer } from '../../components/InputContainer';
import { getItem, setItem } from '../../utils/storage';

export default function LogInPage() {
    const schema = yup.object().shape({
        email: yup.string().email().required("Por favor, informe seu email!"),
        senha: yup.string().min(4).max(10).required("Por favor, informe sua senha!"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const response = await api.post('/', {
                email: data.email,
                senha: data.senha
            })
            console.log(response.data);

            const { token } = response.data;
            setItem('token', token);

            const { nome, email } = response.data.usuario;
            setItem('nome', nome);
            setItem('email', email);
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

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>LogIn</h1>

            <InputContainer>
                <label htmlFor="email">E-mail</label>
                <input
                    name="email"
                    content="E-mail"
                    type="email"
                    placeholder={errors.email?.message}
                    {...register("email")}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="senha">Senha</label>
                <input
                    name="senha"
                    content="Senha"
                    type="password"
                    placeholder={errors.senha?.message}
                    {...register("senha")}
                />
            </InputContainer>

            <Button content="LogIn" />

            <p>
                Ainda não tem conta? <Link to='/cadastro'>Cadastre-se!</Link>
            </p>
        </Form>
    );
}