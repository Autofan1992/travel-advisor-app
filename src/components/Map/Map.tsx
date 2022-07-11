import GoogleMapReact from 'google-map-react'
import { usePlacesContext } from '../../context/places-context'
import { MapItem } from './MapItem/MapItem'
import { memo } from 'react'
import mapStyles from './mapStyles'

export const Map = memo(() => {
    const { coordinates, setClickedChildKey, setBounds, visiblePlaces } = usePlacesContext()

    if (!coordinates) return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center fw-bold">
            <span>Please allow access to your location and refresh the page.</span>
        </div>
    )

    return (
        <GoogleMapReact
            center={coordinates}
            defaultZoom={14}
            margin={[30, 30, 30, 30]}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
            onChange={e => setBounds({ sw: e.marginBounds.sw, ne: e.marginBounds.ne })}
            onChildClick={(key: number) => setClickedChildKey(key)}
            children={visiblePlaces?.map((place) => (
                <MapItem
                    lat={+place.latitude}
                    lng={+place.longitude}
                    key={place.id}
                    name={place.name}
                    photo={place.photo}
                    rating={place.rating}
                />
            ))}
        />
    )
})