import React, { FC, useState } from 'react'
//@ts-ignore
import styles from './Tabs.module.scss'
import { dateFormat, dayFormat } from '../../../utils/dateFormatter'
import { getDailyForecastData } from '../../../utils/getDailyWeather'
import { getWeatherIcon } from '../../../utils/getWeatherIcon'
import { useTranslation } from 'react-i18next'
import { useWeatherData } from '../../../context/WeatherProvider'

export const Tabs: FC = () => {
  const [selectDay, setSelectDay] = useState(0)
  const { currentWeather, forecast, setHourlyWeather, setSelectWeather } = useWeatherData()
  const { t } = useTranslation()
  const data = forecast?.list
  
  const handleClick = (date: number, index: number) => {
    const dailyData = data!.filter((item) => dateFormat(item.dt_txt).includes(dateFormat(date)))
    setHourlyWeather(dailyData)
    setSelectDay(index)
    const filterWeather = getDailyForecastData(data!).filter((item) =>
      dateFormat(item.dt_txt).includes(dateFormat(date))
    )
    setSelectWeather(
      index === 0
        ? currentWeather
        : {
            ...filterWeather[0],
            name: currentWeather!.name,
          }
    )
  }

  return (
    <div className={styles.tabs}>
      {getDailyForecastData(data!).map((item, index) => (
        <div
          className={`${styles.tabItem} ${selectDay === index ? styles['-active'] : ''}`}
          key={index}
          onClick={() => handleClick(item.dt_txt, index)}
        >
          <div className={styles.tabItem__date}>{t(dayFormat(item.dt_txt))}</div>
          <img
            className={styles.tabItem__icon}
            src={getWeatherIcon(item.weather[0].icon)}
            alt="weather icon"
          />
          <div className={styles.tabItem__temperatures}>
            <span className={styles.tabItem__temperature}>{item.main.minTemp}&deg;</span>
            <span className={styles.tabItem__temperature}>{item.main.maxTemp}&deg;</span>
          </div>
        </div>
      ))}
    </div>
  )
}
