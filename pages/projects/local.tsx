import { Container } from 'react-bootstrap';
import { DBAdapter } from '../../services/database';
import { Files } from '../../services/files';
import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getServerSideProps = async () => {
  // const users = await DBAdapter.query('SELECT * FROM User', 'get')
  const siteList = await Files.getFolderContents('/home/petar/Projects/');
  const nginxSites = await Files.getNGINXSites();
  const session = await getSession();
  let sessionStatus = false;
  if (session !== null) sessionStatus = true;
  return {
    props: {
      users: [],
      sessionStatus: sessionStatus,
      sites: {
        sites: [],
        available: [],
        enabled: []
      }
    }
  }
}
interface ILocalProjectProps {
  users: any,
  sites: { available: string[], enabled: string[], sites: string[] },
  sessionStatus: boolean
}

const Home = ({ sites, sessionStatus }: ILocalProjectProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!sessionStatus) router.push('/')
  }, [])
  return (
    <Container>
      {sites.sites.map((site, index) => (
        <Container>
          <p>Project name: {site} </p>
          <p>status {sites.enabled.includes(site) ? "Enabled" : "Disabled"}</p>
          <br />
          <button type='button'>Do something</button>
          <hr />
        </Container>

      ))}
      Projects Local
    </Container>
  )
}

export default Home
