import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../components/Button';
import { Form } from '../../components/Form';
import { InputContainer } from '../../components/InputContainer';
import api from '../../services/api';

export default function RegisterPage() {
    const schema = yup.object().shape({
        nome: yup.string().required("Por favor, digite seu nome!"),
        email: yup.string().email().required("Por favor, digite seu email!"),
        senha: yup.string().min(4).max(10).required("Por favor, digite sua senha"),
        confirmarSenha: yup.string().oneOf([yup.ref('senha'), null]).required("Por favor, digite sua senha")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const response = await api.post('/cadastro', {
                nome: data.nome,
                email: data.email,
                senha: data.senha
            })
            console.log(response.data);

            navigate('/');
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>

            <InputContainer>
                <label htmlFor="nome">Nome</label>
                <input
                    name="nome"
                    content="Nome"
                    type="text"
                    placeholder={errors.nome?.message}
                    {...register("nome")}
                />
            </InputContainer>

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

            <InputContainer>
                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <input
                    name="confirmarSenha"
                    content="Confirmação de Senha"
                    type="password"
                    placeholder={errors.confirmarSenha?.message}
                    {...register("confirmarSenha")}
                />
            </InputContainer>

            <Button content="Register" />

            <p>
                Já tem cadastro? <Link to='/'>Clique Aqui!</Link>
            </p>
        </Form>
    );
}