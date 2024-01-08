import {useState} from 'react'
import {MapComponent} from './components/Map'
import Search from './components/search'
import {Navbar} from './components/Navbar'
import {Coordinates} from '../types'
import {Loading} from './components/Loading'
import './styles.scss'

export const Home = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

  const success = (position: GeolocationPosition) => {
    const {coords} = position
    return setCoordinates({
      lat: coords.latitude,
      lng: coords.longitude,
    })
  }

  const error = () => console.log('error - unable to retrieve user location')

  if (!coordinates) {
    navigator.geolocation.getCurrentPosition(success, error)
  }

  return (
    <div className="home-container">
      <Navbar />
      {coordinates ? (
        <>
          <div className="home-content-container">
            <Search initialCoordinates={coordinates} />
            <div className="map-container">
              <h2 className="map-header">Your current location</h2>
              <MapComponent coordinates={coordinates} />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
