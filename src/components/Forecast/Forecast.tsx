import { FC } from 'react'
import { Tabs } from './Tabs/Tabs'
import { HourlyWeather } from './HourlyWeather/HourlyWeather'
import { MainCard } from './MainCard/MainCard'
import { InfoCards } from './InfoCards/InfoCards'

export const Forecast: FC = () => {
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
