import React, { useEffect, useState } from "react";
import { Forecast } from "./Forecast/index";
import { ForecastApiResponse, WeatherApiResponse } from "../@types/types";
import { getCurrentWeather, getForecast } from "../api/fetchWeather";
import { Header } from "./Header";

export const Main = () => {
  const [currentCity, setCurrentCity] = useState("Kyiv");
  const [currentWeather, setCurrentWeather] =
    useState<WeatherApiResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getCurrentWeather(currentCity);
      setCurrentWeather(data ?? null);
    };

    const fetchForecastData = async () => {
      const data = await getForecast(currentCity);
      setForecast(data ?? null);
    };

    fetchWeatherData();
    fetchForecastData();
  }, [currentCity]);
  
  const handleCityChange = (city: string) => {
    setCurrentCity(city);
  };

  return (
    <div>
      <Header searchCity={handleCityChange} />
      {forecast && currentWeather && (
        <Forecast forecastData={forecast} weatherData={currentWeather} />
      )}
    </div>
  );
};
