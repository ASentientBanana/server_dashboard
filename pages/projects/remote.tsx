import { Container } from 'react-bootstrap';
import { DBAdapter } from '../../services/database';

export const getServerSideProps = async () => {
  // const users = await DBAdapter.query('SELECT * FROM User', 'get')

  return {
    props: {
      users: []
    }
  }
}

const Home = ({ users }: { users: any }) => {
  console.log(users);

  return (
    <Container>
        Projects Remote
    </Container>
  )
}

export default Home
