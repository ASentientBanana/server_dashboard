import { NextPageContext } from "next";
import { DBAdapter } from "../../services/DatabaseAdapter";
import PATHS from "../../services/definitions/paths";
import queries from "../../services/definitions/queries";
import { Files } from "../../services/FSAdapter";
import { QueryFile } from "../../types/file";
import Form from 'react-bootstrap/Form';
import FormField from "../../components/Deployment/FormField";
import Container from "react-bootstrap/Container";

export const getServerSideProps = async (context: NextPageContext) => {
    const { slug: projectID } = context.query

    const project = await DBAdapter.query<QueryFile>(queries.GET_PROJECT_BY_ID(projectID as string), 'get')
    const deploymentFields = await Files.loadDeploymentArgs(PATHS.DEPLOYMENT_SCRIPTS_PATH(project.project_type as string))

    return {
        props: {
            projectData: {},
            deploymentFields
        }
    }
}

interface IProps {
    projectData: {},
    deploymentFields: string[]
}

const Deploy = ({ deploymentFields }: IProps) => {

    return (
        <Container>
            <Form style={{ margin: 'auto', width: '80%', paddingTop: '2rem' }}>
                {deploymentFields.map((inputField: string) => <FormField fieldName={inputField} />)}
            </Form>
        </Container>
    )
}

export default Deploy;