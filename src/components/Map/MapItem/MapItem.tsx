import { FC, memo } from 'react'
import { CoordinatesType } from '../../../types/map-types'
import { PlaceItemType } from '../../../types/places-types'
import classes from './MapItem.module.scss'
import { Rating } from '../../common/Rating'

export const MapItem: FC<CoordinatesType & Pick<PlaceItemType, 'name' | 'photo' | 'rating'>> = memo((
    {
        name,
        photo,
        rating
    }) => {
    return (
        <>
            <div className={`${classes.mapItem} d-none d-md-block`}>
                <p className="fw-bold mb-1">{name}</p>
                <div className={classes.itemImg}>
                    <img src={photo?.images.small.url ?? 'https://via.placeholder.com/150x150?text=no+image'} alt=""/>
                    <div className={classes.ratingBlock}>
                        <Rating rating={rating ? +rating : 0} size={15}/>
                    </div>
                </div>
            </div>
            <div className="d-md-none">
                <svg fill="#000" version="1.1" width="20px" height="20px"
                     id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                >
                    <g>
                        <g>
                            <path
                                d="M256,0C142.892,0,51.2,91.692,51.2,204.8C51.2,336.147,166.4,473.6,256,512c89.6-38.4,204.8-175.853,204.8-307.2    C460.8,91.692,369.108,0,256,0z M256,268.8c-35.345,0-64-28.655-64-64s28.655-64,64-64s64,28.655,64,64S291.345,268.8,256,268.8z"/>
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
            </div>
        </>
    )
})