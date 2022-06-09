import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DBAdapter } from "../services/database";


export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  console.log(session);

  if (session === null) return {
    redirect: {
      permanent: false,
      destination: "/no-user"
    },
  }

  const paths = [await DBAdapter.query('SELECT * FROM "Paths"', 'get')]
  console.log('path:');
  console.log(paths);

  return {
    props: {
      paths
    }
  }
}
interface IProps {
  paths: {
    id: number,
    path: string,
    label: string,
    user_id: string
  }[]
}
const Settings = ({ paths }: IProps) => {


  return (
    <Container>
      <h1>SETTINGS</h1>

      <Container>
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter a path  to the projects folder.</Form.Label>
              <Form.Control type="email" placeholder="/var/www/html" />
              <Form.Text className="text-muted">
                ProjectName
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add new path
            </Button>
            <Container style={{ paddingBlock: '1.5rem', borderRadius: '5px', border: 'solid 1px black', height: '20rem', width: '100%', overflowY: 'scroll' }}>
              {
                paths.map((path, index) => (
                  <p key={`${path}-${index}`}>{path.path}</p>
                ))
              }
            </Container>
          </Form>
        </Container>
      </Container>

    </Container>
  );
}

export default Settings;
