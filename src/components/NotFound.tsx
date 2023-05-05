import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useWeatherData } from '../context/WeatherProvider'

export const NotFound: FC = () => {
  const { currentCity, setCurrentCity } = useWeatherData()
  const { t } = useTranslation()

  const handleBackClick = () => {
    setCurrentCity('Kyiv')
  }

  return (
    <div>
      <h2>
        {t('NotFound')} "{currentCity}"
      </h2>
      <button className="button" onClick={handleBackClick}>
        {t('Back')}
      </button>
    </div>
  )
}
