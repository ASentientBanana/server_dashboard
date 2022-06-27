import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import  InputGroup  from "react-bootstrap/";
import { withServerSession } from "../services/session";

export const getServerSideProps = withServerSession();


const DeployProject = () => {

    const [remoteProject, setRemoteProject] = useState('');
    const [projectType, setProjectType] = useState('React');
    const [projectDeploymentPath, setProjectDeploymentPath] = useState('/home/petar/Desktop/dump');


    const submitDeployment = (e: any) => {
        e.preventDefault();

    }

    return (
        <Container>
            <Form onSubmit={submitDeployment}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project url</Form.Label>
                    <Form.Control type="text" name='username' placeholder="Enter email" onChange={(e) => setRemoteProject(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select onChange={(e) => setProjectType(e.target.value)}>
                        <option>React</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select onChange={(e) => setProjectDeploymentPath(e.target.value)}>
                        <option>/home/petar/Desktop/dump</option>
                    </Form.Select>
                </Form.Group>
                <Button type='submit'>
                    Deploy
                </Button>
            </Form>
        </Container >
    )
}

export default DeployProject;