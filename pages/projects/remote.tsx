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

  return (
    <Container>

    </Container>
  )
}

export default Home
