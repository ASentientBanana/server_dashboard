import { useCallback, useEffect, useState, ReactNode } from 'react';
import { DirStruct } from '../../types/file';
import {
    Modal,
    Container,
    Card,
    Button,
    Accordion,
    useAccordionButton
} from 'react-bootstrap';
useAccordionButton




const parseFileTree = (data: DirStruct[]): any => {

    return data.map((element, index) => {
        if (element.contents !== null) {
            return <AccordionElem key={`${element.name}-${index}`} title={element.name} data={parseFileTree(element.contents)} />
        } else {
            return <p key={`${element.name}-${index}`}>{element.name}</p>

        }

    })
}


// @ts-ignore
function CustomToggle({ children, eventKey }) {
    const [isOpen, setIsOpen] = useState(false)

    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setIsOpen((currentState) => {
            return !currentState;
        })
    );

    return (
        <button
            type="button"
            style={{ background: 'none', border: 'none' }}
            onClick={decoratedOnClick}
        >
            {isOpen ? "∨ " : ">"}{children}
        </button>
    );
}

const AccordionElem = ({ data, title }: { data: ReactNode[], title: string }) => {

    return (
        <Accordion style={{ padding: '0' }}>
            <Card style={{ border: 'none', padding: '0' }}>
                <Card.Header style={{ background: 'none' }}>
                    <CustomToggle eventKey="0">{title}</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{data}</Card.Body>
                </Accordion.Collapse>
            </Card>

        </Accordion>
    );
}



const DirViewModal = ({ path = '/home/petar/Documents' }: { path?: string }) => {
    const [showModal, setShowModal] = useState(false);
    const [dirStruct, setDirStruct] = useState<DirStruct[]>([]);

    const getDirStruct = useCallback(async () => {
        const res = await fetch('http://localhost:3000/api/get-dir-structure', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ path })
        });
        setDirStruct((await res.json()).data)
    }, []);


    return (
        <Container>
            <Button
                onClick={() => setShowModal(true)}
                variant='outline-dark'
            >
                Details
            </Button>
            <Modal
                onShow={() => getDirStruct()}
                onHide={() => setShowModal(false)}
                show={showModal}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        File view of the directory.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion>
                        {parseFileTree(dirStruct)}
                    </Accordion>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default DirViewModal;
