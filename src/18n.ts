import i18n from 'i18next'

i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: import('./locales/en.json'),
    },
    uk: {
      translation: import('./locales/uk.json'),
    },
  },
})

export default i18n
