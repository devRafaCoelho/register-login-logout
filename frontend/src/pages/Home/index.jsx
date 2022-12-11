import React from "react";
import { logOut } from "../../utils/storage";
import { Container, Button } from './styles';

export default function HomePage() {
    return (
        <Container>
            <h1>Home Page</h1>
            <Button onClick={logOut}>
                LogOut
            </Button>
        </Container>
    );
}