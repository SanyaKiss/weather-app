import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import i18n from "../18n";
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
  sunrise:number;
  sunset:number;
}

interface SysData {
  sunrise:number;
  sunset:number;
}

interface WindData{
  speed:number;
}

export interface WeatherApiResponse {
  weather: WeatherData[];
  main: MainData;
  sys:SysData;
  wind:WindData;
  dt_txt: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  icon: IconType;
}

export const Main = () => {
  const API_KEY = "1832d0fc3837773dd06409046fe728ce";
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<
    WeatherApiResponse | undefined
  >(undefined);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [language, setLanguage] = useState<boolean>(false);

  const handleLanguage = () => {
    setLanguage((prev) => !prev);
    language ? i18n.changeLanguage("uk") : i18n.changeLanguage("en");
  };


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/weather?q=Odessa&appid=${API_KEY}&units=metric&lang=ua`
        );
        setCurrentWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get<{ list: WeatherApiResponse[] }>(
          `https://api.openweathermap.org/data/2.5/forecast?q=Odessa&appid=${API_KEY}&units=metric`
        );
        const forecastData: ForecastData[] = response.data.list.map((data) => {
          return {
            date: moment(data.dt_txt).format("ddd, D MMM, LT"),
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          };
        });
        setForecast(forecastData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [currentCity]);

  const currentDate = (moment().format('dddd, MMMM DD, YYYY'))

  return (
    <div className="main">
      <h1 className="current-date">{currentDate}</h1>
      <button onClick={handleLanguage}>{language ? "укр" : "en"}</button>
      {/* <input
        type="text"
        value={currentCity}
        onChange={(e) => setCurrentCity(e.target.value)}
      /> */}
      {forecast?.length > 0 && <Forecast forecastData={forecast} />}
      {currentWeather && <CurrentWeather weatherData={currentWeather} />}
    </div>
  );
};
