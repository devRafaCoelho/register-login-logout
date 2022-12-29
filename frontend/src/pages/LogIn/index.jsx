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
        password: yup.string().min(4).max(10).required("Por favor, informe sua password!"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const response = await api.post('/', {
                email: data.email,
                password: data.password
            })
            console.log(response.data);

            const { token } = response.data;
            setItem('token', token);

            const { name, email } = response.data.user;
            setItem('name', name);
            setItem('email', email);
            navigate('/home');
        } catch (error) {
            console.log(error.response);
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
                    type="email"
                    placeholder={errors.email?.message}
                    {...register("email")}
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder={errors.password?.message}
                    {...register("password")}
                />
            </InputContainer>

            <Button content="LogIn" />

            <p>
                Ainda não tem conta? <Link to='/register'>Cadastre-se!</Link>
            </p>
        </Form>
    );
}