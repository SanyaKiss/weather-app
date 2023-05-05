import React, { FC, useState } from 'react'
import { Tabs } from './Tabs'
import { HourlyWeather } from './HourlyWeather'
import { MainCard } from './MainCard'
import { InfoCards } from './InfoCards'
import { WeatherApiResponse } from '../../@types/types'
import { useWeatherData } from '../../context/WeatherProvider'

export const Forecast: FC = () => {
  const {currentWeather, selectWeather} = useWeatherData()
  return (
    <div className="forecast">
      <Tabs />
      <div className="weather-container">
        <HourlyWeather />
        <div className="weather-cards">
          <MainCard />
          <InfoCards />
        </div>
      </div>
    </div>
  )
}
