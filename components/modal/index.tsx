import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ButtonVariant } from 'react-bootstrap/esm/types';
import React, { ReactNode, useRef, useState } from 'react';

interface IModalProps {
    children: ReactNode | ReactNode[],
    confirmButtonText: string,
    formName?: string,
    primaryButtonText: string,
    options?: {
        btnVariant?: ButtonVariant
        primaryBtnVariant?: ButtonVariant
    }
    disabled?: boolean,
    callback?: () => void
}

const AccountModal = ({ callback, children, confirmButtonText, formName, primaryButtonText, options, disabled }: IModalProps) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container >
            <>
                <Button onClick={handleShow} disabled={disabled} variant={options?.primaryBtnVariant ? options?.primaryBtnVariant : 'primary'} >
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
                        {
                            callback ?
                                <Button
                                    onClick={() => callback()}
                                    variant={options?.btnVariant ? options?.btnVariant : 'primary'}
                                    type='button'>{confirmButtonText}
                                </Button> :
                                <Button
                                    form={formName}
                                    variant={options?.btnVariant ? options?.btnVariant : 'primary'} type='submit'>{confirmButtonText}
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </>
        </Container >
    )
}

export default AccountModal;
