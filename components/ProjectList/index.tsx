import { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { File } from '../../types/file';

interface IProjectListProps {
  projectList?: string[],
  fileList?: File[],
  component?: ReactNode
}

const ProjectList = ({ projectList, fileList }: IProjectListProps) => {


  return (
    <Container>
      <ListGroup>
        {projectList?.map((element, index) => (
          <ListGroup.Item key={`${element}-${index}`}>{element}</ListGroup.Item>
        ))}
        {fileList?.map((element, index) => (
          <ListGroup.Item key={`${element}-${index}`}>{element.name}</ListGroup.Item>
        ))}

      </ListGroup>
    </Container>
  )
}

export default ProjectList;
