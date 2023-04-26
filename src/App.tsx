import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";

interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

export interface WeatherApiResponse {
  weather: WeatherData[];
  main: MainData;
  dt_txt: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

function App() {
  const API_KEY = "1832d0fc3837773dd06409046fe728ce";
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<
    WeatherApiResponse | undefined
  >(undefined);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric&lang=ua`
        );
        setCurrentWeather(response.data);
        console.log(currentWeather, 'CURR')
      } catch (error) {
        console.error(error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get<{ list: WeatherApiResponse[] }>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${API_KEY}&units=metric`
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



  return (
    <div className="App">
      <form >
        <input
          type="text"
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
        />
        <button >Get weather</button>
      </form>
      {currentWeather && <CurrentWeather weatherData={currentWeather} />}
      {forecast?.length > 0 && <Forecast forecastData={forecast} />}
    </div>
  );
}

export default App;
