import React from 'react'
import { Forecast } from './Forecast/index'
import { Header } from './Header'
import { NotFound } from './NotFound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useWeatherData } from '../context/WeatherProvider'

export const Main = () => {
  const { currentWeather, forecast, loading,  } = useWeatherData()

  return (
    <div className="main">
      <Header />
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
      ) : (
        <>{currentWeather && forecast ? <Forecast /> : <NotFound />}</>
      )}
    </div>
  )
}
