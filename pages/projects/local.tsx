import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import { DBAdapter } from '../../services/database';
import { Files } from '../../services/files';
import { getSession, useSession } from 'next-auth/react';
import ProjectList from '../../components/ProjectList';
import { File, QueryFile } from '../../types/file';
import getConfig from 'next/config';
import { useState } from 'react';
import RegisteredView from '../../components/LocalProjects/RegisteredView';
import UnregisteredView from '../../components/LocalProjects/UnregisteredView';
import { DBAdapter } from '../../services/database';
import queries from '../../services/definitions/queries';
import { NextPageContext } from 'next';
import PATHS from '../../services/definitions/paths';

export const getServerSideProps = async (context: NextPageContext) => {
  const projectPath = getConfig()
  const nginxSites = await Files.getNGINXSites();
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        sites: {
          nginx: { available: [], enabled: [] },
          unregistered: [],
          registered: []
        }
      }
    }
  }
  const registeredProjectList = await DBAdapter
    .query<QueryFile[]>(queries.GET_PROJECTS_IF_LOCAL(true, session?.user?.id));
  const pathList = registeredProjectList.map(proj => proj.project_location);
  const unregisteredProjectList = (await Files.getFolderContents([projectPath.serverRuntimeConfig.baseDir]))
    .filter((project) => {
      return !pathList.includes(project.path)
    });
  const parsedRegisteredProjects: File[] = registeredProjectList.map((item) => ({ name: item.project_name, path: item.project_location }))

  return {
    props: {
      sites: {
        nginx: nginxSites,
        unregistered: unregisteredProjectList,
        registered: parsedRegisteredProjects
      }
    }
  }
}
interface ILocalProjectProps {
  sites: { nginx: { available: string[], enabled: string[] }, unregistered: File[], registered: File[] },
}

interface IRenderViewProps {
  unregistered: File[],
  registered: File[]
}

const renderView = (key: string, props: IRenderViewProps) => {
  switch (key) {
    case 'link-1':
      return <RegisteredView projects={props.registered} />
    case 'link-2':
      return <UnregisteredView projects={props.unregistered} />
    default:
      return <RegisteredView projects={props.registered} />
  }
}


const Home = ({ sites }: ILocalProjectProps) => {

  const { data: session } = useSession();
  const [selectedNav, setSelectedNav] = useState('link-1');
  const onSelectHandler = (a: any) => setSelectedNav(a as string);

  return (
    session ?
      <Container>
        <br />
        <Nav variant="tabs" onSelect={onSelectHandler} activeKey={selectedNav} defaultActiveKey={0}>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Registered</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Unregistered</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container>
          {renderView(selectedNav, { registered: sites.registered, unregistered: sites.unregistered })}
        </Container>
      </Container > :
      <h1>User not logged int</h1>
  )
}

export default Home

