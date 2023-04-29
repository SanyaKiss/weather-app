import { IconType } from "../utils/getWeatherIcon";

export interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: IconType;
  }
  
  interface MainData {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
  }
  
  export interface SysData {
    sunrise: number;
    sunset: number;
  }
  
  interface WindData {
    speed: number;
  }
  
  export interface WeatherApiResponse {
    weather: WeatherData[];
    main: MainData;
    sys: SysData;
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
      count: 1;
    };
  }
  