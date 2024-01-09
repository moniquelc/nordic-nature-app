import React, { useEffect, useRef } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { type Coordinates } from '../../types'
import '../styles.scss'

interface GoogleMapsProps {
  center: google.maps.LatLngLiteral
  markerPosition: google.maps.LatLngLiteral
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ center, markerPosition }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current !== null) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom: 12
      })
      // eslint-disable-next-line no-new
      new google.maps.Marker({
        position: markerPosition,
        map
      })
    }
  }, [ref, center, markerPosition])

  return <div className="map-container" ref={ref} />
}

interface MapComponentProps {
  mapCoordinates: Coordinates
  userCoordinates: Coordinates
}

export const MapComponent: React.FC<MapComponentProps> = ({ mapCoordinates, userCoordinates }) => (
  <Wrapper apiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
    <GoogleMaps center={mapCoordinates} markerPosition={userCoordinates} />
  </Wrapper>
)
