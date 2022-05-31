import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import AccountModal from './modal';

interface IInputState {
    [index: string]: string,
    username: string,
    password: string
}

const RegisterModal = () => {

    const [validPasswords, setValidPasswords] = useState(false);

    const INVALID_MESSAGE = "Make sure the passwords match."

    const inputs = useRef<IInputState>({
        username: '',
        password: '',
        passwordConfirm: ''
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) inputs.current[e.target.name] = e.currentTarget.value;
    }

    const registerUser = async (username: string, password: string) => {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const userData = await res.json();
        await signIn('credentials',
            {
                username: userData.username,
                password: userData.password,
                callbackUrl: '/'
            });
    }

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (inputs.current.password === inputs.current.passwordConfirm) {
            await registerUser(inputs.current.username, inputs.current.password);
        } else {
            setValidPasswords(true)
        }
    }

    return (
        <Container>
            <>
                <AccountModal confirmButtonText='Login' formName='loginForm' primaryButtonText='Register'>
                    <Form id='loginForm' name='loginForm' onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name='username' placeholder="Enter email" onChange={inputHandler} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control isInvalid={validPasswords} type="password" name="password" onChange={inputHandler} placeholder="Password" required />
                            <Form.Control.Feedback type="invalid">
                                {INVALID_MESSAGE}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control isInvalid={validPasswords} type="password" name="passwordConfirm" onChange={inputHandler} placeholder="Password" required />
                            <Form.Control.Feedback type="invalid">
                                {INVALID_MESSAGE}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </AccountModal>
            </>
        </Container >
    )
}

export default RegisterModal;
