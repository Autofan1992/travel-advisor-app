import axios from 'axios'
import { PlaceItemType, PlaceTypeEnum } from '../types/places-types'
import { BoundsType } from '../types/map-types'

const placesAxiosInstance = axios.create({
    baseURL: 'https://travel-advisor.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY as string,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    },
})

type APIResponseType = {
    data: PlaceItemType[]
}

export type PlacesRequestType = {
    type: PlaceTypeEnum,
    bounds: BoundsType
}

export const placesAPI = {
    getPlaces: (
        {
            type,
            bounds: { sw, ne }
        }: PlacesRequestType) => placesAxiosInstance.get<APIResponseType>(`${type}/list-in-boundary`,
        {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
            }
        }).then(res => res.data.data)
}