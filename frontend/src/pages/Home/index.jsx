import React from "react";
import { logOut } from "../../utils/storage";
import { Container } from './styles';
import Button from '../../components/Button';

export default function HomePage() {
    return (
        <Container>
            <h1>Home Page</h1>

            <Button
                content="LogOut"
                onClick={logOut}
            />
        </Container>
    );
}