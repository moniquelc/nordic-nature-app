import {useCallback, useEffect, useState} from 'react'
import {Autocomplete, TextField} from '@mui/material'
import {Air, North, South, WaterDropOutlined} from '@mui/icons-material'
import {Coordinates, WeatherData} from '../../types'
import {UnitSwitch} from './UnitSwitch'
import '../styles.scss'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

type Data = {
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

type SearchProps = {
  initialCoordinates: Coordinates
}

export const Weather = ({initialCoordinates}: SearchProps) => {
  const [searchResults, setSearchResults] = useState<Data[]>([])
  const [searchedLocations, setSearchedLocations] = useState<string[]>([])
  const [coordinates, setCoordinates] = useState(initialCoordinates)
  const [metricUnit, setMetricUnit] = useState<boolean>(true)
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined)

  const unit = metricUnit ? 'metric' : 'imperial'

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
  }, [setMetricUnit, getWeather])

  const handleSearch = async (value: string) => {
    if (!!value.length) {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}&units=${unit}`
      try {
        const response = await fetch(url)
        const data: Data[] = await response.json()
        setSearchResults(
          data.map(({name, lat, lon, country, state}) => ({name, lat, lon, country, state}))
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onClickSearch = async (data: Data) => {
    if (data) {
      const {lat, lon} = data
      setCoordinates({lat, lng: lon})
      getWeather()
    }
  }

  return (
    <div className="weather-container">
      <div className="search-result-container">
        <div className="search-container">
          <div className="search-container--input">
            <Autocomplete
              options={searchResults}
              getOptionLabel={({name, state, country}) => `${name}, ${state}, ${country}`}
              sx={{width: 300}}
              filterOptions={x => x}
              onChange={(_, value: Data | null) => {
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
        </div>
        {weatherData && (
          <>
            <div className="weather-header-container">
              <h2>{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
              <UnitSwitch
                checked={metricUnit}
                onChange={async () => {
                  setMetricUnit(!metricUnit)
                }}
              />
            </div>
            <img
              alt="weather-icon"
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            />
            <h3>{`${Math.round(weatherData.main.temp)} ${unit === 'metric' ? '°C' : '°F'}`}</h3>
            <p>{`(Feels like: ${Math.round(weatherData.main.feels_like)} ${
              unit === 'metric' ? '°C' : '°F'
            })`}</p>
            <div className="flex-container temperature-card">
              <div className="flex-container">
                <North sx={{color: 'primary.contrastText', mr: 0.5}} />
                <p>{`${Math.round(weatherData.main.temp_max)} ${
                  unit === 'metric' ? '°C' : '°F'
                }`}</p>
              </div>
              <div className="flex-container">
                <South sx={{color: 'primary.contrastText', mr: 0.5}} />
                <p>{`${Math.round(weatherData.main.temp_min)} ${
                  unit === 'metric' ? '°C' : '°F'
                }`}</p>
              </div>
              <div className="flex-container">
                <WaterDropOutlined sx={{color: 'primary.contrastText', mr: 0.5}} />
                <p>{Math.round(weatherData.main.humidity)}</p>
              </div>
              <div className="flex-container">
                <Air sx={{color: 'primary.contrastText', mr: 0.5}} />
                <p>{Math.round(weatherData.wind.speed)}</p>
              </div>
            </div>
          </>
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
