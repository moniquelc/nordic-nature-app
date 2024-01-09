import React, { useState } from 'react'
import { MapComponent } from './components/Map'
import Search from './components/search'
import { Navbar } from './components/Navbar'
import { type Coordinates } from '../types'
import { Loading } from './components/Loading'
import './styles.scss'

export const Home: React.FC = () => {
  const [mapCoordinates, setMapCoordinates] = useState<Coordinates | null>(null)
  const [userCoordinates, setUseCoordinates] = useState<Coordinates | null>(null)

  const hasCoordinates = mapCoordinates !== null && userCoordinates !== null

  const success = (position: GeolocationPosition) => {
    const { coords } = position
    const coordinations = {
      lat: coords.latitude,
      lng: coords.longitude
    }
    setUseCoordinates(coordinations)
    setMapCoordinates(coordinations)
  }

  const error = () => { console.log('error - unable to retrieve user location') }

  if (hasCoordinates) {
    navigator.geolocation.getCurrentPosition(success, error)
  }

  return (
    <div className="home-container">
      <Navbar />
      {hasCoordinates
        ? (
        <>
          <div className="home-content-container">
            <Search coordinates={mapCoordinates} setCoordinates={setMapCoordinates} />
            <MapComponent mapCoordinates={mapCoordinates} userCoordinates={userCoordinates} />
          </div>
        </>
          )
        : (
        <Loading />
          )}
    </div>
  )
}
