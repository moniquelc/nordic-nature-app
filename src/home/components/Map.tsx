import {useEffect, useRef} from 'react'
import {Wrapper} from '@googlemaps/react-wrapper'
import {Coordinates} from '../../types'
import '../styles.scss'

type GoogleMapsProps = {
  center: google.maps.LatLngLiteral
}

const GoogleMaps = ({center}: GoogleMapsProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom: 12,
      })
      new google.maps.Marker({
        position: center,
        map,
      })
    }
  }, [ref, center])

  return <div className="map" ref={ref} />
}

type MapComponentProps = {
  coordinates: Coordinates
}

export const MapComponent = ({coordinates}: MapComponentProps) => (
  <Wrapper apiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
    <GoogleMaps center={coordinates} />
  </Wrapper>
)
