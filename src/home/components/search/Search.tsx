import {useCallback, useEffect, useState} from 'react'
import {Autocomplete, TextField} from '@mui/material'
import {Coordinates, WeatherData} from '../../../types'
import {Weather} from './Weather'
import './styles.scss'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

type LocationData = {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

type SearchProps = {
  initialCoordinates: Coordinates
}

export const Search = ({initialCoordinates}: SearchProps) => {
  const [searchResults, setSearchResults] = useState<LocationData[]>([])
  const [searchedLocations, setSearchedLocations] = useState<string[]>([])
  const [coordinates, setCoordinates] = useState(initialCoordinates)
  const [isUnitMetric, setIsUnitMetric] = useState<boolean>(true)
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined)

  const unit = isUnitMetric ? 'metric' : 'imperial'

  const getWeather = useCallback(async () => {
    const {lat, lng} = coordinates
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=${unit}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.log(error)
    }
  }, [coordinates, unit])

  useEffect(() => {
    getWeather()
  }, [setIsUnitMetric, getWeather])

  const handleSearch = async (value: string) => {
    if (!!value.length) {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}&units=${unit}`
      try {
        const response = await fetch(url)
        const data: LocationData[] = await response.json()
        setSearchResults(
          data.map(({name, lat, lon, country, state}) => ({name, lat, lon, country, state}))
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onClickSearch = async (data: LocationData) => {
    if (data) {
      const {lat, lon} = data
      setCoordinates({lat, lng: lon})
      getWeather()
    }
  }

  return (
    <div className="search-container">
      <div className="search-result-container">
        <div className="search-container--input">
          <Autocomplete
            options={searchResults}
            getOptionLabel={({name, state, country}) =>
              state ? `${name}, ${state}, ${country}` : `${name}, ${country}`
            }
            sx={{width: 300}}
            filterOptions={x => x}
            onChange={(_, value: LocationData | null) => {
              if (value) {
                const {name, country} = value
                setSearchedLocations([...searchedLocations, `${name}, ${country}`])
                onClickSearch(value)
              }
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Search location"
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                  handleSearch(event.target.value)
                }}
              />
            )}
          />
        </div>
        {weatherData && (
          <Weather
            data={weatherData}
            isUnitMetric={isUnitMetric}
            setIsUnitMetric={setIsUnitMetric}
          />
        )}
      </div>
      {!!searchedLocations.length && (
        <div className="cards-container">
          <h4>Recently searched locations:</h4>
          <div className="flex-container">
            {searchedLocations.slice(-3).map((location, index) => (
              <div className="location-card " key={index}>
                <p>{location}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}