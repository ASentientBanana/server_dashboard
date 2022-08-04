import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DBAdapter } from "../services/DatabaseAdapter";
import { withServerSession } from "../services/session";
import fs from 'fs';

export const getServerSideProps = withServerSession(async () => {

    const ls = fs.readFileSync('/home/petarkocic/ban.json', { encoding: 'utf-8' })


    return {

        props: {
            paths: 'some sample text',
            data: ls
        }

    }
});



const Settings = ({ paths, data }: any) => {

    // const paths = [await DBAdapter.query('SELECT * FROM "Paths"', 'get')]
    console.log(data);

    return (
        <Container>
            {data}
            <p>{paths}</p>
            asdasdasdasdas
        </Container>
    );
}

export default Settings;
interface IProps {
    paths: {
        id: number,
        path: string,
        label: string,
        user_id: string
    }[]
}