import { Card, Col, Row } from 'react-bootstrap'
import { forwardRef, RefObject } from 'react'
import { PlaceType } from '../../../types/places-types'
import classes from './PlaceItem.module.scss'

type PropsType = {
    ref: RefObject<HTMLDivElement>
}

export const PlaceItem = forwardRef<HTMLDivElement, PlaceType & PropsType>((
    {
        name,
        photo,
        price,
        ranking,
        awards,
        cuisine
    }, ref) => {
    return (
        <Card ref={ref}>
            <Card.Img
                src={photo?.images.large.url ?? 'holder.js/171x180'}
                className={classes.placeImg}
            />
            <Card.Body>
                <h5>{name}</h5>
                <hr/>
                <div className="d-flex justify-content-between">
                    <p>Price:</p>
                    <p>{price}</p>
                </div>
                <hr/>
                <div className="d-flex justify-content-between">
                    <p>Ranking:</p>
                    <p>{ranking}</p>
                </div>
                {awards && awards.length > 0 && (
                    <>
                        <hr/>
                        {awards.map((award, idx) => (
                            <div
                                key={idx}
                                className="d-flex justify-content-between">
                                <div>
                                    <img src={award.images.small} alt={award.display_name}/>
                                </div>
                                <p className="flex-shrink-1">{award.display_name}</p>
                            </div>
                        ))}
                    </>
                )}
                {cuisine && cuisine.length > 0 && (
                    <>
                        <hr/>
                        <Row className="g-2">
                            {cuisine.map(({ name }, idx) => (
                                <Col
                                    xs="auto"
                                    key={idx}
                                    className="d-flex justify-content-between">
                                    <span className="lh-1 bg-dark text-white rounded-pill py-2 px-3 small">{name}</span>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Card.Body>
        </Card>
    )
})