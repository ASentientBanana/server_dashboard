import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import { DBAdapter } from '../../services/database';
import { Files } from '../services/FSAdapter';
import { getSession, useSession } from 'next-auth/react';
import ProjectList from '../components/ProjectList';
import { File, QueryFile } from '../types/file';
import getConfig from 'next/config';
import { useState } from 'react';
import RegisteredView from '../components/LocalProjects/RegisteredView';
import UnregisteredView from '../components/LocalProjects/UnregisteredView';
import { DBAdapter } from '../services/DatabaseAdapter';
import queries from '../services/definitions/queries';
import { NextPageContext } from 'next';
import PATHS from '../services/definitions/paths';

// export const getServerSideProps = async (context: NextPageContext) => {

// }
interface ILocalProjectProps {
    sites: { nginx: { available: string[], enabled: string[] }, unregistered: File[], registered: File[] },
    paths: string[]
}


const Home = ({ sites, paths }: ILocalProjectProps) => {


    return (
        <Container>

        </Container >
    )
}

export default Home

