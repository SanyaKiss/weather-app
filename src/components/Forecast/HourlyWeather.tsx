import React, { FC } from 'react'
import { WeatherApiResponse } from '../../@types/types'
import { hourlyFormat } from '../../utils/dateFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getWeatherIcon } from '../../utils/getWeatherIcon'

type HourlyWeatherProps = {
  weather:WeatherApiResponse[]
}

export const HourlyWeather:FC<HourlyWeatherProps> = ({weather}) => {
  return (
    <div className="hourly-container">
    <table className="hourly">
      {weather.map((item) => (
        <tr>
          <td
            className="hourly__time"
            style={{ backgroundColor: "#fff1cb" }}
          >
            {hourlyFormat(item.dt_txt)}
          </td>
          <td>
            {item.weather && (
              <FontAwesomeIcon
                className="hourly__icon"
                style={{ color: "rgba(255, 165, 0, 0.4)" }}
                color="orange"
                size="2xl"
                icon={getWeatherIcon(item.weather[0].icon)}
              />
            )}
          </td>
          <td className="hourly__temperature">
            {Math.round(item.main.temp)}&deg;
          </td>
        </tr>
      ))}
    </table>
  </div>
)
}
