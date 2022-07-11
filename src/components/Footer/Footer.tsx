import React from 'react'
import { Container } from 'react-bootstrap'

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-dark text-white">
            <Container className="py-4" fluid>
                <div className="d-flex justify-content-between gap-2">
                    <span>Developed by Mykola Gordiy</span>
                    <span>{year}</span>
                </div>
            </Container>
        </footer>
    )
}