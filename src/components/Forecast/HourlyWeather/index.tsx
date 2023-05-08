import React, { FC } from 'react'
//@ts-ignore
import styles from './HourlyWeather.module.scss'
import { hourlyFormat } from '../../../utils/dateFormatter'
import { getWeatherIcon } from '../../../utils/getWeatherIcon'
import { useWeatherData } from '../../../context/WeatherProvider'
import { v4 as uuidv4 } from 'uuid'

export const HourlyWeather: FC = () => {
  const { hourlyWeather: weather } = useWeatherData()
  return (
    <div className={styles.hourlyContainer}>
      <table>
        {weather?.map((item) => (
          <tbody key={uuidv4()}>
            <tr className={styles.hourItem} key={uuidv4()}>
              <td className={styles.hourItem__time} style={{ backgroundColor: '#f9b891' }}>
                {hourlyFormat(item.dt_txt)}
              </td>
              <td>
                {item.weather && (
                  <img
                    src={getWeatherIcon(item.weather[0].icon)}
                    alt="weather"
                    className={styles.hourItem__icon}
                  />
                )}
              </td>
              <td className={styles.hourItem__temperature}>{Math.round(item.main.temp)}&deg;</td>
            </tr>
           </tbody>
        ))}
      </table>
    </div>
  )
}
