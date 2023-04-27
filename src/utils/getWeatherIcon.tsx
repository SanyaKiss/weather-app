// export function getWeatherIcon(weatherCode:string) {
//     switch (weatherCode) {
//       case "01d":
//       case "01n":
//         return "fas fa-sun";
//       case "02d":
//       case "02n":
//         return "fas fa-cloud-sun";
//       case "03d":
//       case "03n":
//         return "fas fa-cloud";
//       case "04d":
//       case "04n":
//         return "fas fa-cloud-meatball";
//       case "09d":
//       case "09n":
//         return "fas fa-cloud-showers-heavy";
//       case "10d":
//       case "10n":
//         return "fas fa-cloud-sun-rain";
//       case "11d":
//       case "11n":
//         return "fas fa-bolt";
//       case "13d":
//       case "13n":
//         return "fas fa-snowflake";
//       case "50d":
//       case "50n":
//         return "fas fa-smog";
//       default:
//         return "fas fa-question";
//     }
//   }

import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudMeatball,
  faCloudShowersHeavy,
  faCloudSunRain,
  faBolt,
  faSnowflake,
  faSmog,
  faQuestion,
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
  "01n": faSun,
  "02d": faCloudSun,
  "02n": faCloudSun,
  "03d": faCloud,
  "03n": faCloud,
  "04d": faCloudMeatball,
  "04n": faCloudMeatball,
  "09d": faCloudShowersHeavy,
  "09n": faCloudShowersHeavy,
  "10d": faCloudSunRain,
  "10n": faCloudSunRain,
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