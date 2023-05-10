import React, { FC, useState } from 'react'
//@ts-ignore
import styles from './MainCard.module.scss'
import { useTranslation } from 'react-i18next'
import { getCatsImg } from '../../../utils/getCatsImg'
import { SunInfo } from '../SunInfo'
import { useWeatherData } from '../../../context/WeatherProvider'
import i18n from '../../../18n'

export const MainCard: FC = () => {
  const { units, selectWeather } = useWeatherData()
  const { name, main, weather } = selectWeather!
  const { t } = useTranslation()
  
  const unitSymbol = units === 'metric' ? 'C' : 'F'

  return (
    <div className={styles.mainCard}>
      <div>
        <h2 className={styles.city}>{name}</h2>
        <div className={styles.temperatureIcon}>
          <h1 className={styles.temperature}>
            {Math.round(main?.temp)}&deg;{unitSymbol}
          </h1>
        </div>
        <p className={styles.feelsLike}>
          {t('Feels like')} {Math.round(main?.feels_like)}&deg;
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={getCatsImg(weather[0].icon)} alt="" />
      </div>
      <SunInfo />
    </div>
  )
}
