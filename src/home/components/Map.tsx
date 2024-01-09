import {useEffect, useRef} from 'react'
import {Wrapper} from '@googlemaps/react-wrapper'
import {Coordinates} from '../../types'
import '../styles.scss'

type GoogleMapsProps = {
  center: google.maps.LatLngLiteral
  markerPosition: google.maps.LatLngLiteral
}

const GoogleMaps = ({center, markerPosition}: GoogleMapsProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom: 12,
      })
      new google.maps.Marker({
        position: markerPosition,
        map,
      })
    }
  }, [ref, center, markerPosition])

  return <div className="map-container" ref={ref} />
}

type MapComponentProps = {
  mapCoordinates: Coordinates
  userCoordinates: Coordinates
}

export const MapComponent = ({mapCoordinates, userCoordinates}: MapComponentProps) => (
  <Wrapper apiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
    <GoogleMaps center={mapCoordinates} markerPosition={userCoordinates} />
  </Wrapper>
)
