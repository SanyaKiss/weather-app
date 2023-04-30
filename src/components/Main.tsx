import React, { useEffect, useState } from "react";
import { Forecast } from "./Forecast/index";
import { ForecastApiResponse, WeatherApiResponse } from "../@types/types";
import { getCurrentWeather, getForecast } from "../api/fetchWeather";
import { Header } from "./Header";
import { NotFound } from "./NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Main = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState("Kyiv");
  const [currentWeather, setCurrentWeather] =
    useState<WeatherApiResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getCurrentWeather(currentCity);
      setCurrentWeather(data ?? null);
      setLoading(false);
    };

    const fetchForecastData = async () => {
      const data = await getForecast(currentCity);
      setForecast(data ?? null);
      setLoading(false);
    };
    fetchWeatherData();
    fetchForecastData();
  }, [currentCity]);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
  };
  const handleBackClick = () => {
    setCurrentCity("Kyiv");
  };
  return (
    <div className="main">
      <Header cityChange={handleCityChange} />
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
      ) : (
        <>
          {currentWeather && forecast ? (
            <Forecast forecastData={forecast} weatherData={currentWeather} />
          ) : (
            <NotFound cityName={currentCity} onBackClick={handleBackClick}  />
          )}
        </>
      )}
    </div>
  );
};
