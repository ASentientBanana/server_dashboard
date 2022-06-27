import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react'
import { Files } from '../services/FSAdapter';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { withServerSession } from '../services/session';

export const getServerSideProps = withServerSession(async () => {
  const nginxSites = await Files.getNGINXSites();

  const args = await Files.loadDeploymentArgs('react');

  return {
    props: {
      users: [],
      args
    }
  }
})

const Home = ({ args }: { users: any, args: string[] }) => {
  const { data: session } = useSession()

  return (
    <Container>
      <>
        {/* @ts-ignore */}
        <h1>Welcome, {session?.user?.username} </h1>
        <h5>Arguments</h5>
        <ul>
          <li>Nginx status</li>
          <li>OS type/version</li>
          <li>OS update available?</li>
        </ul>
      </>
    </Container>
  )
}

export default Home

