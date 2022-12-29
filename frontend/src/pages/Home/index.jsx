import React from "react";
import { logOut } from "../../utils/storage";
import Button from '../../components/Button';
import { Form } from '../../components/Form';

export default function HomePage() {
    return (
        <Form>
            <h1>Home Page</h1>

            <Button
                content="LogOut"
                onClick={logOut}
            />
        </Form>
    );
}