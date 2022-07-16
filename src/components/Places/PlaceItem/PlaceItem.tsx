import { Card, Col, Row } from 'react-bootstrap'
import { forwardRef, memo, RefObject } from 'react'
import { PlaceItemType } from '../../../types/places-types'
import classes from './PlaceItem.module.scss'
import { Rating } from '../../common/Rating'

type PropsType = {
    ref: RefObject<HTMLDivElement>
}

export const PlaceItem = memo(forwardRef<HTMLDivElement, PlaceItemType & PropsType>((
    {
        name,
        photo,
        price,
        ranking,
        awards,
        cuisine,
        rating,
        num_reviews,
        website,
        phone
    }, ref) => {
    return (
        <Card ref={ref}>
            <Card.Img
                src={photo?.images.large.url ?? 'https://via.placeholder.com/600x600?text=no+image'}
                className={classes.placeImg}
            />
            <Card.Body>
                <h5>{name}</h5>
                <hr/>
                {rating &&
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="lh-1 mb-2 mb-md-0">
                                <Rating rating={+rating} size={20}/>
                            </div>
                            <p>Out of {num_reviews} reviews</p>
                        </div>
                        <hr/>
                    </>
                }
                {price &&
                    <>
                        <div className="d-flex justify-content-between mb-3">
                            <p>Price:</p>
                            <p>{price}</p>
                        </div>
                        <hr/>
                    </>
                }
                <div className="d-xl-flex justify-content-between mb-3">
                    <p className="mb-2 mb-xl-0">Ranking:</p>
                    <p>{ranking}</p>
                </div>
                {awards && awards.length > 0 && (
                    <>
                        <hr/>
                        {awards.map((award, idx) => (
                            <div
                                key={idx}
                                className="d-flex align-items-center justify-content-between mb-2">
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
                {(phone || website) && (
                    <>
                        <hr/>
                        <Row className="g-4">
                            {phone && (
                                <Col
                                    xs="auto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                    </svg>
                                    <a href={`tel:${phone}`} className="text-muted ms-2">Call</a>
                                </Col>
                            )}
                            {website && (
                                <Col
                                    xs="auto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                         version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 300 300"
                                    >
                                        <g>
                                            <g>
                                                <g>
                                                    <path
                                                        d="M202.105,96.266c-5.574-5.405-11.98-9.957-19.011-13.437c3.395,5.159,6.383,11.129,8.867,17.787     C195.528,99.337,198.918,97.882,202.105,96.266z"/>
                                                    <path
                                                        d="M112.603,144.813h32.207v-27.29c-9.625-0.418-18.931-1.774-27.601-3.989     C114.613,123.016,112.987,133.634,112.603,144.813z"/>
                                                    <path
                                                        d="M116.579,183.953c8.862-2.324,18.394-3.758,28.231-4.194v-24.572h-32.205     C112.964,165.39,114.359,175.121,116.579,183.953z"/>
                                                    <path
                                                        d="M120.412,103.666c7.648,1.904,15.87,3.079,24.398,3.47V75.3c-1.502,0.104-2.988,0.252-4.464,0.444     C132.374,80.578,125.392,90.555,120.412,103.666z"/>
                                                    <path
                                                        d="M96.922,202.79c6.686,6.72,14.636,12.174,23.456,15.989c-4.272-6.095-7.939-13.456-10.841-21.799     C105.009,198.65,100.782,200.593,96.922,202.79z"/>
                                                    <path
                                                        d="M120.288,81.26c-8.019,3.481-15.307,8.325-21.586,14.239c3.613,1.937,7.521,3.639,11.656,5.125     C113.098,93.276,116.452,86.761,120.288,81.26z"/>
                                                    <path
                                                        d="M107.195,110.479c-5.638-2.002-10.906-4.396-15.707-7.158c-9.231,11.547-15.113,25.866-16.189,41.492h26.914     C102.594,132.454,104.343,120.861,107.195,110.479z"/>
                                                    <path
                                                        d="M102.216,155.187H75.3c1.017,14.791,6.328,28.423,14.721,39.627c4.995-3.001,10.551-5.61,16.542-7.773     C104.094,177.305,102.574,166.573,102.216,155.187z"/>
                                                    <path
                                                        d="M140.536,224.283c1.413,0.176,2.837,0.319,4.274,0.418v-34.554c-8.831,0.415-17.359,1.681-25.262,3.719     C124.604,208.249,132.008,219.207,140.536,224.283z"/>
                                                    <path
                                                        d="M195.766,187c5.335,1.932,10.338,4.212,14.913,6.837c7.98-11.018,13.033-24.279,14.021-38.647h-24.595     C199.748,166.557,198.233,177.277,195.766,187z"/>
                                                    <path
                                                        d="M183.011,217.213c7.82-3.857,14.864-9.039,20.858-15.25c-3.439-1.849-7.156-3.507-11.095-4.954     C190.115,204.636,186.821,211.445,183.011,217.213z"/>
                                                    <path
                                                        d="M149.997,0C67.158,0,0.003,67.161,0.003,149.997S67.158,300,149.997,300s150-67.163,150-150.003S232.837,0,149.997,0z      M150,240.462c-49.88,0-90.462-40.579-90.462-90.462S100.12,59.538,150,59.538s90.462,40.579,90.462,90.462     S199.88,240.462,150,240.462z"/>
                                                    <path
                                                        d="M162.719,76.202c-2.474-0.425-4.987-0.726-7.534-0.903v31.937c9.334-0.275,18.352-1.512,26.711-3.597     C177.074,90.952,170.375,81.195,162.719,76.202z"/>
                                                    <path
                                                        d="M195.121,110.471c2.856,10.382,4.604,21.981,4.985,34.342h24.592c-1.045-15.227-6.658-29.209-15.484-40.595     C204.854,106.596,200.139,108.692,195.121,110.471z"/>
                                                    <path
                                                        d="M155.185,224.7c2.49-0.169,4.949-0.464,7.368-0.871c8.201-5.262,15.307-16.002,20.212-29.948     c-8.613-2.223-17.955-3.543-27.58-3.833V224.7z"/>
                                                    <path
                                                        d="M185.102,113.508c-9.384,2.402-19.493,3.813-29.917,4.103v27.202h34.534     C189.332,133.627,187.703,122.998,185.102,113.508z"/>
                                                    <path
                                                        d="M189.716,155.187h-34.531v24.486c10.732,0.288,21.052,1.722,30.573,4.207C187.97,175.07,189.358,165.364,189.716,155.187     z"/>
                                                </g>
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    <a href={website} target="_blank" rel="noreferrer" className="text-muted ms-2">Visit
                                        website</a>
                                </Col>
                            )}
                        </Row>
                    </>
                )}
            </Card.Body>
        </Card>
    )
}))