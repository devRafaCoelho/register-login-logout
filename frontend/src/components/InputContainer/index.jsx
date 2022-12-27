import React, { forwardRef } from 'react';
import { Container } from './styles';

export const InputContainer = forwardRef(function ({ name, content, type, placeholder }, ref) {
    return (
        <Container>
            <label htmlFor={name}>{content}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                {...ref}
            />
        </Container>
    );
})

