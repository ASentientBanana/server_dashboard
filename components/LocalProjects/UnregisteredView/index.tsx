import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { File } from '../../../types/file';
import RegisterProjectModal from './registerProjectModal';
import DirViewModal from "../../DirViewModal";
import style from '../style.module.sass'


interface IProps {
  projects: File[]
}

const UnregisteredView = ({ projects }: IProps) => {

  return (
    <Container className={style.mainContainer}>
      <br />
      {projects.map((project: File, index: number) => (
        <React.Fragment key={`${project.name}-${index}`}>
          <Card style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>{project.path}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{project.path}</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
              <RegisterProjectModal project={projects[index]} />
              <DirViewModal path="/home/petar/Downloads" />
            </Card.Footer>
          </Card>
          <br />
        </React.Fragment>
      ))}
    </Container>
  )
}

export default UnregisteredView;
