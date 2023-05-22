import React, { FC, useState } from 'react'
//@ts-ignore
import styles from './MainCard.module.scss'
import { useTranslation } from 'react-i18next'
import { getCatsImg } from '../../../utils/getCatsImg'
import { SunInfo } from '../SunInfo/SunInfo'
import { useWeatherData } from '../../../context/WeatherProvider'
import { getUKCity } from '../../../utils/getUKCity'
import i18n from '../../../18n'

export const MainCard: FC = () => {
  const [cityName, setCityName] = useState<string | undefined>(undefined)

  const { units, selectWeather } = useWeatherData()
  const { name, main, weather } = selectWeather!
  const { t } = useTranslation()

  const unitSymbol = units === 'metric' ? 'C' : 'F'

  const activeLanguage = i18n.language

  getUKCity(name)
    .then((translatedCity) => {
      const cityName = activeLanguage == 'uk' ? translatedCity : name
      setCityName(cityName)
    })
    .catch((error) => {
      console.error('Error:', error)
    })

  return (
    <div className={styles.mainCard}>
      <div>
        <h2 className={styles.city}>{cityName}</h2>
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
