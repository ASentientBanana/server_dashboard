import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react'
import { Files } from '../services/files';

export const getServerSideProps = async () => {
  const nginxSites = await Files.getNGINXSites();
  return {
    props: {
      users: [],

    }
  }
}

const Home = ({ }: { users: any, session: any }) => {
  const { data: session } = useSession()

  return (
    <Container>
      {session ?
        <>
          {/* @ts-ignore */}
          <h1>Welcome, {session.user?.username} </h1>
        </> :
        <>
          <h1>Please log in</h1>
        </>}
    </Container>
  )
}

export default Home

