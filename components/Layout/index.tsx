import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginModal from '../AccountModals/loginModal';
import RegisterModal from '../AccountModals/registerModal';
import { signOut, useSession } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Layout = () => {
    const { data: session } = useSession()
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/settings">Settings</Nav.Link>
                        <NavDropdown title="Projects" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/projects/local">Local projects</NavDropdown.Item>
                            <NavDropdown.Item href="/projects/remote">Remote Projects</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {session ? <Button onClick={() => signOut()} > Sign out </Button> : <> <LoginModal /> <RegisterModal /> </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Layout
