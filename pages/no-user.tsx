import Container from "react-bootstrap/Container";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession(context);

    return {
        props: {
            users: []
        }
    }
};

const NoUser = () => {


    return (
        <Container>
            Please login to view access dashboard.
        </Container>
    )
}

export default NoUser;
