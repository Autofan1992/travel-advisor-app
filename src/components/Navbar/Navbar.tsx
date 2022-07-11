import { Col, Container, Form, Navbar as BSNavbar } from 'react-bootstrap'
import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { usePlacesContext } from '../../context/places-context'

export const Navbar = () => {
    const { setCoordinates } = usePlacesContext()
    const [autocomplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null)

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => setAutoComplete(autocomplete)

    const onPlaceChanged = () => {
        const lat = autocomplete?.getPlace().geometry?.location?.lat()
        const lng = autocomplete?.getPlace().geometry?.location?.lng()

        if (lat && lng) {
            setCoordinates({ lat, lng })
        }
    }

    return <BSNavbar bg="dark" variant="dark" expand="md" className="py-3">
        <Container fluid>
            <BSNavbar.Brand href="/">Travel Advisor</BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="navbarScroll"/>
            <BSNavbar.Collapse className="justify-content-md-end align-items-center text-white">
                <h5 className="mt-3 mt-md-0 mb-md-0">Explore new places</h5>
                <Col md={5} lg={4}>
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                        className="ms-md-3 flex-fill"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Type to start search"
                        />
                    </Autocomplete>
                </Col>
            </BSNavbar.Collapse>
        </Container>
    </BSNavbar>
}