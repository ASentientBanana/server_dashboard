import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fs from 'fs';



const Settings = ({ }: any) => {

    // const paths = [await DBAdapter.query('SELECT * FROM "Paths"', 'get')]
    console.log();

    return (
        <Container>
            test
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