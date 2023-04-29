import React, { FC } from 'react'
//@ts-ignore
import styles from "./HourlyWeather.module.scss";
import { WeatherApiResponse } from '../../../@types/types'
import { hourlyFormat } from '../../../utils/dateFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getWeatherIcon } from '../../../utils/getWeatherIcon'

type HourlyWeatherProps = {
  weather:WeatherApiResponse[]
}

export const HourlyWeather:FC<HourlyWeatherProps> = ({weather}) => {
  return (
    <div className={styles.hourlyContainer}>
    <table className={styles.hourItem}>
      {weather.map((item) => (
        <tr>
          <td
            className={styles.hourItem__time}
            style={{ backgroundColor: "#fff1cb" }}
          >
            {hourlyFormat(item.dt_txt)}
          </td>
          <td>
            {item.weather && (
              <FontAwesomeIcon
                className={styles.hourItem__icon}
                style={{ color: "rgba(255, 165, 0, 0.4)" }}
                color="orange"
                size="2xl"
                icon={getWeatherIcon(item.weather[0].icon)}
              />
            )}
          </td>
          <td className={styles.hourItem__temperature}>
            {Math.round(item.main.temp)}&deg;
          </td>
        </tr>
      ))}
    </table>
  </div>
)
}
