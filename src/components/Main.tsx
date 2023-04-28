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
  sunrise: number;
  sunset: number;
}

interface SysData {
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

export const Main = () => {
  const API_KEY = "1832d0fc3837773dd06409046fe728ce";
  const [currentCity, setCurrentCity] = useState("Kyiv");
  const [search, setSearch] = useState<string>("");

  const [currentWeather, setCurrentWeather] = useState<
    WeatherApiResponse | undefined
  >(undefined);
  const [forecast, setForecast] = useState<ForecastApiResponse | undefined>(
    undefined
  );
  const [language, setLanguage] = useState<boolean>(false);

  const handleLanguage = () => {
    setLanguage((prev) => !prev);
    language ? i18n.changeLanguage("uk") : i18n.changeLanguage("en");
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric&lang=ua`
        );
        setCurrentWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get<ForecastApiResponse>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${API_KEY}&units=metric`
        );
        setForecast(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [currentCity]);

  const currentDate = moment().format("dddd, MMMM DD, YYYY");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrentCity(search);
    setSearch("");
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__date">{currentDate}</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="header__input"
            type="text"
            placeholder="enter city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="header__button" type="submit">
            Get
          </button>
        </form>
        <button className="header__button" onClick={handleLanguage}>
          {language ? "укр" : "en"}
        </button>
      </header>
      {forecast &&  currentWeather && <Forecast forecastData={forecast} weatherData={currentWeather}/>}
      {/* {currentWeather && <CurrentWeather weatherData={currentWeather} />} */}
    </div>
  );
};
