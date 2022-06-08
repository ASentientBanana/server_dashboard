import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Container from "react-bootstrap/Container";

export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession(context);
    console.log(session);

    if (session === null) return {
        redirect: {
            permanent: false,
            destination: "/no-user"
        },
    }

    return {
        props: {}
    }
}
const Settings = () => {


    return (
        <Container>
            <h1>SETTINGS</h1>
        </Container>
    );
}

export default Settings;
