import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { File } from '../../../types/file';


interface IProps {
    projects: File[]
}

const UnregisteredView = ({ projects }: IProps) => {

    return (
        <Container>
            <br />
            {projects.map((project: File, index: number) => (
                <React.Fragment key={`${project.name}-${index}`}>
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                            <Card.Title>{project.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{project.path}</Card.Subtitle>
                        </Card.Body>
                        <Card.Footer>
                            <Button>
                                Some button
                            </Button>
                            <Button>
                                Some button 2
                            </Button>
                        </Card.Footer>
                    </Card>
                    <br />
                </React.Fragment>
            ))}
        </Container>
    )
}

export default UnregisteredView;