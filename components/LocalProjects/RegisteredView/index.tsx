import Container from "react-bootstrap/Container";
import { File } from '../../../types/file';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import DirViewModal from "../../DirViewModal";
import { useRouter } from "next/router";


interface IProps {
  projects: File[]
}


const RegisteredView = ({ projects }: IProps) => {
  const router = useRouter();

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
              <DirViewModal path="/home/petar/Downloads" />
              <Button onClick={() => {
                router.push(`/deploy/${project.id}`)
              }} variant="outline-dark">
                Deploy
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
