import React, { useEffect, useState } from "react";
import { Forecast } from "./Forecast/Forecast";
import { ForecastApiResponse, WeatherApiResponse } from "../@types/types";
import { getCurrentWeather, getForecast } from "../api/fetchWeather";
import { Header } from "./Header";
import { NotFound } from "./NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Main = () => {
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [currentCity, setCurrentCity] = useState("Kyiv");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] =
    useState<WeatherApiResponse | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getCurrentWeather(currentCity, units);
      setCurrentWeather(data ?? null);
      setLoading(false);
    };

    const fetchForecastData = async () => {
      const data = await getForecast(currentCity, units);
      setForecast(data ?? null);
      setLoading(false);
    };
    fetchWeatherData();
    fetchForecastData();
  }, [currentCity, units]);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
  };

  const handleUnitsChange = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const handleBackClick = () => {
    setCurrentCity("Kyiv");
  };

  return (
    <div className="main">
      <Header
        cityChange={handleCityChange}
        unitsChange={handleUnitsChange}
        units={units}
      />
      {loading && <FontAwesomeIcon icon={faSpinner} spin size="2xl" />}
      {!loading && currentWeather && forecast ? (
        <Forecast
          forecastData={forecast}
          weatherData={currentWeather}
          units={units}
        />
      ) : (
        <NotFound cityName={currentCity} onBackClick={handleBackClick} />
      )}
    </div>
  );
};
