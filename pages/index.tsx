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
      Welcome: User
      Public IP: 127.0.0.1
      Description about the app
    </Container>
  )
}

export default Home

