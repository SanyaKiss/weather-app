import ReactDOM from 'react-dom/client'
import './scss/styles.scss'
import { I18nextProvider } from 'react-i18next'
import i18n from './18n'
import { WeatherProvider } from './context/WeatherProvider'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <I18nextProvider i18n={i18n}>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </I18nextProvider>
)
