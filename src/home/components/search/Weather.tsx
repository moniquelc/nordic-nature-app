import React from 'react'
import { Air, North, South, WaterDropOutlined } from '@mui/icons-material'
import { UnitSwitch } from './UnitSwitch'
import { type WeatherData } from '../../../types'
import './styles.scss'

interface WeatherProps {
  data: WeatherData
  isUnitMetric: boolean
  setIsUnitMetric: (isUnitMetric: boolean) => void
}

export const Weather: React.FC<WeatherProps> = ({ data, isUnitMetric, setIsUnitMetric }) => {
  const unit = isUnitMetric ? 'metric' : 'imperial'

  const { name, sys, weather, main, wind } = data

  return (
    <>
      <div className="weather-header-container">
        <h2>{`${name}, ${sys.country}`}</h2>
        <UnitSwitch
          checked={unit === 'metric'}
          onChange={() => {
            setIsUnitMetric(!isUnitMetric)
          }}
        />
      </div>
      <img alt="weather-icon" src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} />
      <h3>{`${Math.round(main.temp)} ${unit === 'metric' ? '°C' : '°F'}`}</h3>
      <p>{`(Feels like: ${Math.round(main.feels_like)} ${unit === 'metric' ? '°C' : '°F'})`}</p>
      <div className="flex-container temperature-card">
        <div className="flex-container">
          <North sx={{ color: 'primary.contrastText', mr: 0.5 }} />
          <p>{`${Math.round(main.temp_max)} ${unit === 'metric' ? '°C' : '°F'}`}</p>
        </div>
        <div className="flex-container">
          <South sx={{ color: 'primary.contrastText', mr: 0.5 }} />
          <p>{`${Math.round(main.temp_min)} ${unit === 'metric' ? '°C' : '°F'}`}</p>
        </div>
        <div className="flex-container">
          <WaterDropOutlined sx={{ color: 'primary.contrastText', mr: 0.5 }} />
          <p>{Math.round(main.humidity)}</p>
        </div>
        <div className="flex-container">
          <Air sx={{ color: 'primary.contrastText', mr: 0.5 }} />
          <p>{Math.round(wind.speed)}</p>
        </div>
      </div>
    </>
  )
}
