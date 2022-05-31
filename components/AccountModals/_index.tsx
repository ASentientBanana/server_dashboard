import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react';

interface IInputState {
    [index: string]: string,
    username: string,
    password: string
}

const LoginModal = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const inputs = useRef<IInputState>({
        username: '',
        password: ''
    });

    const loginFormRef = useRef<HTMLFormElement>(null);

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
                <Button onClick={handleShow} variant="outline-primary">
                    Sign in options
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='loginForm' name='loginForm' validated={validated} onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' placeholder="Enter email" onChange={inputHandler} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={inputHandler} placeholder="Password" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button form={'loginForm'} variant="primary" onClick={() => setValidated(true)} type='submit'>Log In</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container >
    )
}

export default LoginModal;