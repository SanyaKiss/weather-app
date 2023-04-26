import React from 'react'
import { WeatherApiResponse } from '../App'

export const CurrentWeather = ({ weatherData }: { weatherData: WeatherApiResponse }) => {
  return (
    <div className="current-weather">
    <div className="temperature">{Math.round(weatherData.main.temp)}&deg;C</div>
    <div className="description">{weatherData.weather[0].description}</div>
    <div className="icon">
      <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" />
    </div>
  </div>  )
}
