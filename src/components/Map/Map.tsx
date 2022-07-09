import GoogleMapReact from 'google-map-react'
import { usePlacesContext } from '../../context/places-context'
import { Spinner } from 'react-bootstrap'
import { MapItem } from './MapItem/MapItem'

export const Map = () => {
    const { coordinates, setClickedChildKey, setBounds, places } = usePlacesContext()

    const mapChangeHandle = (e: GoogleMapReact.ChangeEventValue) => {
        setBounds({
            sw: e.marginBounds.sw,
            ne: e.marginBounds.ne
        })
    }

    if (!coordinates) return <Spinner animation="border"/>

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBreMGmCw_x2Gm-_DfCjzuBaAfIfLQ7q4w' }}
            center={coordinates}
            defaultZoom={14}
            margin={[30, 30, 30, 30]}
            onChange={mapChangeHandle}
            onChildClick={(key: number) => {
                console.log(key)
                setClickedChildKey(key)
            }}
        >
            {places?.map((place, idx) => {
                if (place.name) return <MapItem lat={+place.latitude} lng={+place.longitude} key={idx} {...place}/>
            })}
        </GoogleMapReact>
    )
}