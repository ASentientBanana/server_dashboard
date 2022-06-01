import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { DBAdapter } from '../../services/database';
import { Files } from '../../services/files';
import { useSession } from 'next-auth/react';
import ProjectList from '../../components/ProjectList';
import { File } from '../../types/file';

export const getServerSideProps = async () => {
  const siteList = await Files.getFolderContents('/home/petarkocic/Projects/');
  const nginxSites = await Files.getNGINXSites();
  let sessionStatus = false;

  const testing = await Files.getFolderContents(['/home/petarkocic/Projects/server_dashboard/']);
  return {
    props: {
      users: [],
      sessionStatus: sessionStatus,
      sites: {
        sites: testing,
        ...nginxSites
      }
    }
  }
}
interface ILocalProjectProps {
  users: any,
  sites: { available: string[], enabled: string[], sites: File[] },
}

const Home = ({ sites }: ILocalProjectProps) => {
  const { data: session } = useSession();

  return (
    session ?
      <Container>
        <br />
        <Row>
          <Col>
            <h5>Local projects:</h5>
            <ProjectList fileList={sites.sites} />
          </Col>
          <Col>
            <h5>Projects in nginx</h5>
            <ProjectList projectList={[...sites.enabled, ...sites.available]} />
          </Col>
        </Row>
      </Container> :
      <h1>User not logged int</h1>
  )
}

export default Home

