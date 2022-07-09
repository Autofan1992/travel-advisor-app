import { Container, Form, FormControl, Navbar as BSNavbar } from 'react-bootstrap'
import React from 'react'

export const Navbar = () => {
    return <BSNavbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <BSNavbar.Brand href="/">Travel Advisor</BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="navbarScroll"/>
            <BSNavbar.Collapse className="justify-content-end">
                <Form className="d-flex text-white align-items-center">
                    <h5>Explore new places</h5>
                    <div className="ms-3">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                </Form>
            </BSNavbar.Collapse>
        </Container>
    </BSNavbar>
}