import ReactDOM from 'react-dom'
import './scss/styles.scss'
import { I18nextProvider } from 'react-i18next'
import i18n from './18n'
import { WeatherProvider } from './context/WeatherProvider'
import { App } from './App'

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </I18nextProvider>,
  document.getElementById('root')
)