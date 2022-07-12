import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { PlaceItemType, PlaceRatingEnum, PlaceTypeEnum } from '../types/places-types'
import { placesAPI } from '../api/places-api'
import { BoundsType, CoordinatesType } from '../types/map-types'
import useDebounce from '../hooks/useDebounce'
import { v4 as createId } from 'uuid'

type MapContextType = {
    isFetching: boolean,
    error: string | null
    visiblePlaces: PlaceItemType[] | null
    coordinates: CoordinatesType | null
    setCoordinates: (coordinates: CoordinatesType) => void
    bounds: BoundsType | null
    setBounds: (bounds: BoundsType) => void
    clickedChildKey: number | null
    setClickedChildKey: (key: number | null) => void
    placeType: PlaceTypeEnum
    setPlaceType: (type: PlaceTypeEnum) => void
    placeMinRating: PlaceRatingEnum
    setPlaceMinRating: (rating: PlaceRatingEnum) => void
    setVisiblePlacesCount: Dispatch<SetStateAction<number>>
    visiblePlacesCount: number
    placesCount: number
}

const PlacesContext = createContext({} as MapContextType)

const DEFAULT_VISIBLE_PLACES_COUNT = 10

export const usePlacesContext = () => useContext(PlacesContext)

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [places, setPlaces] = useState<PlaceItemType[]>([])
    const [placeType, setPlaceType] = useState<PlaceTypeEnum>(PlaceTypeEnum.Restaurants)
    const [visiblePlacesCount, setVisiblePlacesCount] = useState(DEFAULT_VISIBLE_PLACES_COUNT)
    const [placeMinRating, setPlaceMinRating] = useState<PlaceRatingEnum>(PlaceRatingEnum.All)
    const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null)
    const [bounds, setBounds] = useState<BoundsType | null>(null)
    const [clickedChildKey, setClickedChildKey] = useState<number | null>(null)
    const placesCount = places.length

    const debouncedBounds = useDebounce<BoundsType | null>(bounds, 500)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        const fetchPlaces = async (bounds: BoundsType) => {
            setVisiblePlacesCount(DEFAULT_VISIBLE_PLACES_COUNT)
            setIsFetching(true)
            setError(null)

            const data = await placesAPI.getPlaces({ type: placeType, bounds })
            const filteredData = data
                .filter(place => place.name && place.latitude && place.latitude)
                .map(place => ({ ...place, id: createId() }))

            setPlaces(filteredData)
            setIsFetching(false)
        }

        if (debouncedBounds) fetchPlaces(debouncedBounds)
            .catch(e => setError((e as Error).message))

    }, [debouncedBounds, placeType])

    const visiblePlaces = useMemo(() => {
        if (places) {
            return places.filter((place, idx) => {
                const filterByRating = place.rating && +place.rating > placeMinRating
                const filterByCount = idx < visiblePlacesCount

                return filterByRating && filterByCount
            })
        }
        return places
    }, [places, placeMinRating, visiblePlacesCount])

    return (
        <PlacesContext.Provider value={{
            isFetching,
            error,
            visiblePlaces,
            coordinates,
            setCoordinates,
            bounds,
            setBounds,
            clickedChildKey,
            setClickedChildKey,
            setPlaceMinRating,
            placeMinRating,
            placeType,
            setPlaceType,
            setVisiblePlacesCount,
            visiblePlacesCount,
            placesCount
        }}>
            {children}
        </PlacesContext.Provider>
    )
}