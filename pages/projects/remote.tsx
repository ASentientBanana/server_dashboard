import { NextPageContext } from 'next';
import { Container } from 'react-bootstrap';
import { DBAdapter } from '../../services/database';
import { getSession } from 'next-auth/react';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  // const users = await DBAdapter.query('SELECT * FROM User', 'get')
  if (session === null) return {
    redirect: {
      permanent: false,
      destination: "/no-user"
    },
  }

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
