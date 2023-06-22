import React from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.query.value;
    history.replace(`/manage?search=${query}`);
  };
  

  return (
    <Navbar id="header" className="header fixed-top d-flex align-items-center" bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">EMS <img src="images/ems.png" alt="EMS Logo" height={40} /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="search-bar search-form d-flex align-items-center" onSubmit={handleSubmit}>
            <Form.Control type="text" name="query" placeholder="Search by Name, Age, Title Or Department" title="Enter search keyword" className="mr-2" />
            <Button variant="outline-light" className="mr-2" type="submit" title="Search"><i className="fa fa-search"></i></Button>
          </Form>
          <Nav className="header-nav ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add">Add</Nav.Link>
            <Nav.Link as={Link} to="/manage">Manage</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
