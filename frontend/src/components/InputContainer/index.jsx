import React from 'react';
import { Container } from './styles';

export default function InputContainer({ name, type, value, content, onChange }) {
    return (
        <Container>
            <label htmlFor={name}>{content}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
        </Container>
    );
}