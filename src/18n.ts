import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en.json'
import ukTranslation from './locales/uk.json'

i18n
.use(initReactI18next)
.init({
  lng: 'en',
  resources: {
    en: {
      translation: enTranslation
    },
    uk: {
      translation: ukTranslation
    },
  },
})

export default i18n
