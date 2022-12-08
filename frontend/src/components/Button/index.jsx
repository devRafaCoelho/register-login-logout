import React from 'react';
import { Container } from './styles';

export default function Button({ content, onClick }) {
    return (
        <Container onClick={onClick}>
            {content}
        </Container>
    );
}