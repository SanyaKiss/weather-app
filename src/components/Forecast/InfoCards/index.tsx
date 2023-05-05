import { FC, useMemo } from 'react'
//@ts-ignore
import styles from './InfoCards.module.scss'
import pressureIcon from '../../../assets/weather-icons/pressure.png'
import humidityIcon from '../../../assets/weather-icons/icons8-hygrometer-64.png'
import windIcon from '../../../assets/weather-icons/icons8-wind-64.png'
import { useTranslation } from 'react-i18next'
import { useWeatherData } from '../../../context/WeatherProvider'

interface Card {
  title: string
  value: string
  iconSrc: string
  imgAlt: string
}

export const InfoCards: FC = () => {
  const { selectWeather } = useWeatherData()
  const { wind, main } = selectWeather
  const { t } = useTranslation()

  const cards: Card[] = useMemo(
    () => [
      {
        title: t('Wind'),
        value: Math.round(wind.speed) + ' ' + t('M/sec'),
        iconSrc: windIcon,
        imgAlt: 'wind',
      },
      {
        title: t('Hudimity'),
        value: main.pressure + ' ' + t('%'),
        iconSrc: humidityIcon,
        imgAlt: 'hudimity',
      },
      {
        title: t('Pressure'),
        value: main.pressure + ' ' + t('hPa'),
        iconSrc: pressureIcon,
        imgAlt: 'pressure',
      },
    ],
    [main.pressure, t, wind.speed]
  )

  return (
    <div className={styles.cardsContainer}>
      {cards.map(({ title, value, iconSrc, imgAlt }, i) => (
        <div key={i} className={styles.card}>
          <p className={styles.card__title}>{title}</p>
          <div className={styles.card__value}>{value}</div>
          <img src={iconSrc} alt={imgAlt} className={styles.card__icon} />
        </div>
      ))}
    </div>
  )
}
