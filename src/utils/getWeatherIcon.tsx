// import {
//   faSun,
//   faCloudSun,
//   faCloud,
//   faCloudShowersHeavy,
//   faCloudSunRain,
//   faBolt,
//   faSnowflake,
//   faSmog,
//   faQuestion,
//   faMoon,
//   faCloudMoon,
//   faCloudMoonRain,
// } from "@fortawesome/free-solid-svg-icons";

import day from '../assets/weather-icons/icons8-sun-64.png'
import night from '../assets/weather-icons/icons8-moon-and-stars-64.png'
import cloudDay from '../assets/weather-icons/icons8-partly-cloudy-day-64.png'
import cloudNight from '../assets/weather-icons/02n.png'
import cloud from '../assets/weather-icons/icons8-cloud-64.png'
import rain from '../assets/weather-icons/icons8-rain-64.png'
import rainNight from '../assets/weather-icons/icons8-rainy-night-64.png'
import storm from '../assets/weather-icons/icons8-storm-64.png'
import snow from '../assets/weather-icons/icons8-snow-storm-64.png'
import fog from '../assets/weather-icons/icons8-fog-64.png'

export type IconType =
  | "01d"
  | "01n"
  | "02d"
  | "02n"
  | "03d"
  | "03n"
  | "04d"
  | "04n"
  | "09d"
  | "09n"
  | "10d"
  | "10n"
  | "11d"
  | "11n"
  | "13d"
  | "13n"
  | "50d"
  | "50n"

 const weatherIcons = {
  "01d": day,
  "01n": night,
  "02d": cloudDay,
  "02n": cloudNight,
  "03d": cloud,
  "03n": cloud,
  "04d": cloud,
  "04n": cloud,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rainNight,
  "11d": storm,
  "11n": storm,
  "13d": snow,
  "13n": snow,
  "50d": fog,
  "50n": fog,
};

export function getWeatherIcon(weatherCode:IconType) {
    return weatherIcons[weatherCode] 
  }