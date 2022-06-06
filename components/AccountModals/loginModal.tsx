import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import AccountModal from '../modal';

interface IInputState {
    [index: string]: string,
    username: string,
    password: string
}

const LoginModal = () => {

    const inputs = useRef<IInputState>({
        username: '',
        password: ''
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) inputs.current[e.target.name] = e.currentTarget.value;
    }

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await signIn('credentials', { ...inputs.current, callbackUrl: '/' });
    }
    return (
        <Container>
            <>
                <AccountModal options={{ btnVariant: 'outline-dark' }} confirmButtonText='Login' formName='loginForm' primaryButtonText='Sign in'>
                    <Form id='loginForm' name='loginForm' onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name='username' placeholder="Enter email" onChange={inputHandler} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={inputHandler} placeholder="Password" required />

                        </Form.Group>
                    </Form>
                </AccountModal>
            </>
        </Container >
    )
}

export default LoginModal;
