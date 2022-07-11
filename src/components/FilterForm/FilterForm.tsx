import { Col, Form, Row } from 'react-bootstrap'
import { PlaceRatingEnum, PlaceTypeEnum } from '../../types/places-types'
import { FC, memo } from 'react'
import { usePlacesContext } from '../../context/places-context'

export const FilterForm: FC = memo(() => {
    const { setPlaceType, setPlaceMinRating } = usePlacesContext()

    return (
        <Row className="mb-3">
            <Col>
                <Form.Select onChange={e => setPlaceType(e.target.value as PlaceTypeEnum)}>
                    <option disabled>Type</option>
                    <option value={PlaceTypeEnum.Restaurants}>Restaurants</option>
                    <option value={PlaceTypeEnum.Hotels}>Hotels</option>
                    <option value={PlaceTypeEnum.Attractions}>Attractions</option>
                </Form.Select>
            </Col>
            <Col>
                <Form.Select onChange={e => setPlaceMinRating(+e.target.value as PlaceRatingEnum)}>
                    <option disabled>Rating</option>
                    <option value={PlaceRatingEnum.All}>All</option>
                    <option value={PlaceRatingEnum.AboveThree}>Above 3.0</option>
                    <option value={PlaceRatingEnum.AboveFour}>Above 4.0</option>
                    <option value={PlaceRatingEnum.AboveFourPointFive}>Above 4.5</option>
                </Form.Select>
            </Col>
        </Row>
    )
})