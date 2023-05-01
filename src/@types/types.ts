import { IconType } from "./IconType";

export interface WeatherData {
  id?: number;
  main?: string;
  description?: string;
  icon: IconType;
}

export interface MainData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  maxTemp?: number;
  minTemp?: number;
}

export interface SysData {
  sunrise: number;
  sunset: number;
}

export interface WindData {
  speed: number;
}

export interface WeatherApiResponse {
  weather: WeatherData[];
  main: MainData;
  sys?: SysData;
  wind: WindData;
  dt_txt: number;
  name: string;
}

export interface ForecastApiResponse {
  list: WeatherApiResponse[];
}

export interface ForecastData {
  date: string;
  temperature: number;
  icon: IconType;
}

export interface DailyForecast {
  [key: string]: {
    minTemperature: number;
    maxTemperature: number;
    totalTemperature: number;
    totalFeelsLike: number;
    totalWindSpeed: number;
    totalHumidity: number;
    totalPressure: number;
    dt_txt: number;
    icon: IconType;
    count: 1;
  };
}

export type UnitsType = "metric" | "imperial";
