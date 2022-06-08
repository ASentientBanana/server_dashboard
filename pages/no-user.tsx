import Container from "react-bootstrap/Container";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return {
        props: {
            users: []
        }
    }
};

const NoUser = () => {


    return (
        <Container>
            <Col style={{ padding: '20rem' }}>
                <Row style={{ textAlign: 'center' }}><h4>There was no user detected.</h4></Row>
                <Row style={{ textAlign: 'center' }}><h4>Please log in to use the dashboard.</h4></Row>
            </Col>
        </Container>
    )
}

export default NoUser;
