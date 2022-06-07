import Container from "react-bootstrap/Container";
import { File } from '../../../types/file';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';


interface IProps {
    projects: File[]
}


const RegisteredView = ({ projects }: IProps) => {

    return (
        <Container>
            <br />
            {projects.map((project: File, index: number) => (
                <React.Fragment key={`${project.name}-${index}`}>
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                            <Card.Title>{project.path}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{project.path}</Card.Subtitle>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="outline-dark">
                                Remove
                            </Button>
                            <Button variant="outline-dark">
                                Details
                            </Button>
                        </Card.Footer>
                    </Card>
                    <br />
                </React.Fragment>
            ))}
        </Container>
    );
}

export default RegisteredView;