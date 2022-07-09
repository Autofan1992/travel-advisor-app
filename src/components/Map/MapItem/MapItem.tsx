import { FC } from 'react'
import { CoordinatesType } from '../../../types/map-types'
import { PlaceType } from '../../../types/places-types'
import classes from './MapItem.module.scss'

export const MapItem: FC<CoordinatesType & PlaceType> = ({ name, photo }) => {
    return (
        <div className={classes.mapItem}>
            {<img src={photo?.images.small.url} alt=""/>}
            {name}
        </div>
    )
}