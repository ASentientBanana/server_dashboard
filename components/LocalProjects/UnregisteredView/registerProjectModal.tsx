import { MutableRefObject, useRef, useState } from "react";
import Modal from "../../modal";
import Button from "react-bootstrap/Button";
import { File, QueryFile } from '../../../types/file';
import { Form } from "react-bootstrap";
import { PROJECT_TYPES } from "../../../globals";
import { useSession } from "next-auth/react";


interface IProps {
    project: File,

}

const RegisterProjectModal = ({ project }: IProps) => {
    const [projectName, setProjectName] = useState(project.name);
    const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
    const [projectLocation, setProjectLocation] = useState(project.path);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const showDispatch = useState(false);

    const registerProject = async () => {
        const baseUrl = process.env.baseUrl;
        if (session?.user?.id) {
            setIsLoading(true);
            await fetch(`${baseUrl}/api/register-project`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    isLocal: true,
                    name: projectName,
                    type: projectType,
                    location: projectLocation,
                    userID: session?.user.id,
                })
            });
            setIsLoading(false);
        }
    }

    return (
        <>
            <Modal
                callback={registerProject}
                formName="project-register-form"
                options={{ btnVariant: 'outline-dark' }}
                primaryButtonText="Register project"
                disabled={isLoading}
                confirmButtonText={isLoading ? 'Loading...' : 'Register'}>
                <Form name="project-register-form">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="project_name">Project name</Form.Label>
                        <Form.Control id="project_name"
                            value={projectName}
                            onChange={(e) => {
                                setProjectName(e.target.value);
                            }} placeholder="Project name" type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Project type( the tech )</Form.Label>
                        <Form.Select id='project_type' onChange={(e) => {
                            setProjectType(e.target.value)
                        }}>
                            {PROJECT_TYPES.map((projectType) => (
                                <option key={`type-${projectType}`}>{projectType}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="project_path" >Project location</Form.Label>
                        <Form.Control id="project_path"
                            type="text"
                            value={projectLocation}
                            onChange={(e) => {
                                setProjectLocation(e.target.value)
                            }} placeholder="Disabled input" />
                    </Form.Group>
                </Form>
            </Modal>
        </>
    )
}

export default RegisterProjectModal;