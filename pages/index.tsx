import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react'
import { Files } from '../services/files';
import DirInput from '../components/DirInput';

export const getServerSideProps = async () => {
  const nginxSites = await Files.getNGINXSites();
  const args = await Files.loadDeploymentArgs('react');

  return {
    props: {
      users: [],
      args
    }
  }
}

const Home = ({ args }: { users: any, args: string[] }) => {
  const { data: session } = useSession()

  return (
    <Container>
      {session ?
        <>
          {/* @ts-ignore */}
          <h1>Welcome, {session.user?.username} </h1>
          <h5>Arguments</h5>
          <ul>
            {args.map((e, i) => <li key={`${e}-${i}`}>{e}</li>)}
          </ul>
        </> :
        <>
          <h1>Please log in</h1>
        </>}
    </Container>
  )
}

export default Home

