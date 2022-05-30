import { Container } from 'react-bootstrap';
// import { DBAdapter } from '../services/database';
// import { useEffect } from 'react';
import { getSession, useSession, signOut } from 'next-auth/react'
// import type { NextPageContext } from "next"
import { Files } from '../services/files';

export const getServerSideProps = async () => {
  // const users = await DBAdapter.query('SELECT * FROM User', 'get')
  // const res = await Files.getFolderContents('/home/petar/Downloads/');
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
      <br />
      {JSON.stringify(session)}
      <br />
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </Container>
  )
}

export default Home

