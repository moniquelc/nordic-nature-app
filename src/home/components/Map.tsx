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

  const contentString =
    '<div id="content">' +
    '<h3 id="firstHeading" class="firstHeading">Your location</h3>' +
    '</div>'

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom: 12
      })
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      })

      const marker = new google.maps.Marker({
        position: markerPosition,
        map
      })
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map
        })
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
