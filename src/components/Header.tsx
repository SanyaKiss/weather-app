import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import i18n from '../18n'
import { useWeatherData } from '../context/WeatherProvider'
import { t } from 'i18next'

export const Header: FC = () => {
  const { units, setUnits, setCurrentCity } = useWeatherData()
  const [language, setLanguage] = useState<'uk' | 'en'>('en')
  const [search, setSearch] = useState<string>('')
  const currentDate = moment().format('dddd, MMMM DD, YYYY')

  useEffect(() => {
    console.log('use effect')
    language === 'uk' ? i18n.changeLanguage('en') : i18n.changeLanguage('uk')
  }, [language])

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'uk' : 'en')
    console.log(language)
  }
  const handleUnitsChange = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric')
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setCurrentCity(search)
    setSearch('')
  }

  const currentUnits = units === 'metric' ? '°C' : '°F'

  return (
    <header className="header">
      <h1 className="header__date">{currentDate}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <input
          className="header__input"
          type="text"
          placeholder="Enter city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="header__buttons">
        <button className="header__button button" onClick={handleLanguageChange}>
          {language}
        </button>
        <button className="header__button button" onClick={handleUnitsChange}>
          {currentUnits}
        </button>
      </div>
    </header>
  )
}
