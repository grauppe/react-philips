
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
//import BuscaForm from './BuscaForm';

export default class CustomNavBar extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">
                        <img
                            alt="Logo"
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {' YBMs'}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link eventKey={1} href="/" to="/"> Home </Nav.Link>
                            <Nav.Link eventKey={2} href="/favorites" to="/favorites"> Favorites </Nav.Link>
                            <NavDropdown title="Enterntainement" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/funcionario/add">Movies</NavDropdown.Item>
                                <NavDropdown.Item href="/funcionario/consult">Series</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link eventKey={3} href="/about" to="/about"> About </Nav.Link>
                        </Nav>
                        {/*<BuscaForm />*/}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}