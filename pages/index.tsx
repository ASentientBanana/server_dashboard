import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react'
import { Files } from '../services/FSAdapter';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

export const getServerSideProps = async (context: NextPageContext) => {
  const nginxSites = await Files.getNGINXSites();
  const session = await getSession(context);

  const args = await Files.loadDeploymentArgs('react');
  if (session === null) return {
    redirect: {
      permanent: false,
      destination: "/no-user"
    },
  }

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
      <>
        {/* @ts-ignore */}
        <h1>Welcome, {session?.user?.username} </h1>
        <h5>Arguments</h5>
        <ul>
          {args.map((e, i) => <li key={`${e}-${i}`}>{e}</li>)}
        </ul>
      </>
    </Container>
  )
}

export default Home

