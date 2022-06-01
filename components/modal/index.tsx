import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { ReactNode, useRef, useState } from 'react';

interface IModalProps {
    children: ReactNode | ReactNode[],
    confirmButtonText: string,
    formName: string,
    primaryButtonText: string
}

const AccountModal = ({ children, confirmButtonText, formName, primaryButtonText }: IModalProps) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container >
            <>
                <Button onClick={handleShow} variant="outline-primary" >
                    {primaryButtonText}
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
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button form={formName} variant="primary" type='submit'>{confirmButtonText}</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container >
    )
}

export default AccountModal;
