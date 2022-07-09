import React from 'react'
import { Container } from 'react-bootstrap'

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer>
            <Container className="py-4">
                <p>{year}</p>
            </Container>
        </footer>
    )
}