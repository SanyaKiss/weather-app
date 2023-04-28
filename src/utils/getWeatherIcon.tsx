import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudShowersHeavy,
  faCloudSunRain,
  faBolt,
  faSnowflake,
  faSmog,
  faQuestion,
  faMoon,
  faCloudMoon,
  faCloudMoonRain,
} from "@fortawesome/free-solid-svg-icons";

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
  | "default";

 const weatherIcons = {
  "01d": faSun,
  "01n": faMoon,
  "02d": faCloudSun,
  "02n": faCloudMoon,
  "03d": faCloud,
  "03n": faCloud,
  "04d": faCloud,
  "04n": faCloud,
  "09d": faCloudShowersHeavy,
  "09n": faCloudShowersHeavy,
  "10d": faCloudSunRain,
  "10n": faCloudMoonRain,
  "11d": faBolt,
  "11n": faBolt,
  "13d": faSnowflake,
  "13n": faSnowflake,
  "50d": faSmog,
  "50n": faSmog,
  default: faQuestion,
};

export function getWeatherIcon(weatherCode:IconType) {
    return weatherIcons[weatherCode] || weatherIcons["default"];
  }