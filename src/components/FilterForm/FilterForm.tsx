import { Col, Form, Row } from 'react-bootstrap'

export const FilterForm = () => {


    return (
        <Row>
            <Col>
                <Form.Select>
                    <option>Type</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="hotels">Hotels</option>
                    <option value="attractions">Attractions</option>
                </Form.Select>
            </Col>
            <Col>
                <Form.Select>
                    <option>Rating</option>
                    <option value={0}>All</option>
                    <option value={3}>Above 3.0</option>
                    <option value={4}>Above 4.0</option>
                    <option value={4.5}>Above 4.5</option>
                </Form.Select>
            </Col>
        </Row>
    )
}