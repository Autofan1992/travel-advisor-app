import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FilterForm } from '../FilterForm/FilterForm'
import { Navbar } from '../Navbar/Navbar'
import { Map } from '../Map/Map'
import { PlacesList } from '../Places/PlacesList/PlacesList'
import { Footer } from '../Footer/Footer'

function App() {
    return (
        <div className="app-wrapper d-flex flex-column min-vh-100">
            <Navbar/>
            <main className="d-flex flex-fill">
                <section className="main-section d-flex flex-column flex-fill">
                    <Container fluid className="py-4 d-flex flex-column flex-fill">
                        <Row className="flex-fill">
                            <Col md={5} xl={4} className="d-flex flex-column minh-345 mb-3 mb-md-0">
                                <FilterForm/>
                                <PlacesList/>
                            </Col>
                            <Col md={7} xl={8} className="d-flex flex-column minh-345">
                                <Map/>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default App
