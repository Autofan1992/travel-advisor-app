import axios from 'axios'
import { PlaceType } from '../types/places-types'
import { BoundsType } from '../types/map-types'

const placesAxiosInstance = axios.create({
    baseURL: 'https://travel-advisor.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '1350de79eemsh79dfe1bfc7d5b5bp194d1cjsnd8a3ab6ac46f',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    },
})

type APIResponseType = {
    data: PlaceType[]
}

export const placesAPI = {
    getPlaces: ({ sw, ne }: BoundsType) => placesAxiosInstance.get<APIResponseType>('hotels/list-in-boundary', {
        params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
        }
    }).then(res => res.data.data)
}