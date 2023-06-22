import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

{/*EMS application Header */}
export default function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Conestoga Employee Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Text>Manage your employee's data easily.</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
