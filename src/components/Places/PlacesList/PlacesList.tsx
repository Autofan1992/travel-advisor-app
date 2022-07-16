import { usePlacesContext } from '../../../context/places-context'
import { Spinner, Stack } from 'react-bootstrap'
import { PlaceItem } from '../PlaceItem/PlaceItem'
import classes from './PlacesList.module.scss'
import React, { createRef, memo, RefObject, useEffect } from 'react'

type refType = {
    [key: string]: RefObject<HTMLDivElement>
}

export const PlacesList = memo(() => {
    const {
        visiblePlaces,
        clickedChildKey,
        isFetching,
        placeType,
        setVisiblePlacesCount,
        setClickedChildKey,
        placesCount,
        visiblePlacesCount
    } = usePlacesContext()

    const refs = visiblePlaces?.reduce((acc, value) => {
        acc[value.id] = createRef()
        return acc
    }, {} as refType)

    useEffect(() => {
        if (clickedChildKey !== null && refs) {
            refs[clickedChildKey].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            setClickedChildKey(null)
        }
    }, [clickedChildKey, refs])

    const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollTop <= (e.currentTarget.scrollHeight - e.currentTarget.clientHeight) - 30) return

        setVisiblePlacesCount(prevState => {
            console.log(prevState)
            return prevState + 10
        })
    }

    if (isFetching) return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Spinner animation="border"/>
        </div>
    )

    if (!visiblePlaces || !visiblePlaces.length) return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center fw-bold">
            <span>There are no {placeType} in selected area.</span>
        </div>
    )

    return (
        <>
            <h6>
                {visiblePlacesCount < placesCount &&
                    (
                        `${visiblePlacesCount} of ${placesCount} places are shown. Scroll down to see more`
                    )
                }
            </h6>
            <Stack gap={3} className={`${classes.placesList} pe-3`} onScroll={handleScroll}>
                {refs &&
                    visiblePlaces.map((place) => {
                        return <PlaceItem ref={refs[place.id]} key={place.id} {...place}/>
                    })}
            </Stack>
        </>
    )
})