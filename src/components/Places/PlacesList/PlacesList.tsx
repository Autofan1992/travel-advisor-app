import { usePlacesContext } from '../../../context/places-context'
import { Spinner, Stack } from 'react-bootstrap'
import { PlaceItem } from '../PlaceItem/PlaceItem'
import classes from './PlacesList.module.scss'
import { createRef, RefObject, useEffect } from 'react'

type refType = {
    [key: number]: RefObject<HTMLDivElement>
}

export const PlacesList = () => {
    const { places, clickedChildKey } = usePlacesContext()

    useEffect(() => {
        if (clickedChildKey !== null) {
            refs[clickedChildKey].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }, [clickedChildKey])

    if (!places) return <Spinner animation="grow"/>

    const refs = places.reduce((acc, value, idx) => {
        acc[idx] = createRef()
        return acc
    }, {} as refType)

    return (
        <Stack gap={3} className={classes.placesList}>
            {places.map((place, idx) => {
                if (place.name) return <PlaceItem ref={refs[idx]} key={idx} {...place}/>
            })}
        </Stack>
    )
}