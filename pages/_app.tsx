import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { SSRProvider } from 'react-bootstrap';
import { SessionProvider, useSession } from 'next-auth/react';
// import NoAccountMessage from '../components/NoAccountMessage';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <SSRProvider>
        <Layout />
        <Component {...pageProps} />
      </SSRProvider>
    </SessionProvider>
  )
}

export default MyApp
