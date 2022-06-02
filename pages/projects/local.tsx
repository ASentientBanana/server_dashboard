import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import { DBAdapter } from '../../services/database';
import { Files } from '../../services/files';
import { useSession } from 'next-auth/react';
import ProjectList from '../../components/ProjectList';
import { File } from '../../types/file';
import getConfig from 'next/config';
import { useState } from 'react';
import RegisteredView from '../../components/LocalProjects/RegisteredView';
import UnregisteredView from '../../components/LocalProjects/UnregisteredView';

export const getServerSideProps = async () => {
  const projectPath = getConfig()
  const nginxSites = await Files.getNGINXSites();
  const unregisteredList = await Files.getFolderContents([projectPath.serverRuntimeConfig.baseDir]);
  console.log('List');
  console.log(unregisteredList);

  return {
    props: {
      sites: {
        nginx: nginxSites,
        unregistered: unregisteredList,
        registered: []
      }
    }
  }
}
interface ILocalProjectProps {
  sites: { nginx: { available: string[], enabled: string[] }, unregistered: File[], registered: File[] },
}

interface IRenderViewProps {
  unregistered: any,
  registered: any
}

const renderView = (key: string, props: IRenderViewProps) => {
  switch (key) {
    case 'link-1':
      return <RegisteredView />
    case 'link-2':
      return <UnregisteredView projects={props.unregistered} />

    default:
      return <RegisteredView />
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

