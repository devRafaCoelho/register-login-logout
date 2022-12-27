import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, InputContainer, Button } from './styles';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function FormRegister() {
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
            <InputContainer>
                <label htmlFor="nome">Nome</label>
                <input
                    name="nome"
                    type="text"
                    placeholder={errors.nome?.message}
                    {...register("nome")}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="email">E-mail</label>
                <input
                    name="email"
                    type="email"
                    placeholder={errors.email?.message}
                    {...register("email")}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="senha">Senha</label>
                <input
                    name="senha"
                    type="password"
                    placeholder={errors.senha?.message}
                    {...register("senha")}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="confirmacaoSenha">Confirmação de Senha</label>
                <input
                    name="confirmacaoSenha"
                    type="password"
                    placeholder={errors.confirmarSenha?.message}
                    {...register("confirmarSenha")}
                />
            </InputContainer>

            <Button>
                Register
            </Button>
        </Form>
    );
}