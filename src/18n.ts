import i18n from 'i18next'

i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: require('./locales/en.json'),
    },
    uk: {
      translation: require('./locales/uk.json'),
    },
  },
})

export default i18n
