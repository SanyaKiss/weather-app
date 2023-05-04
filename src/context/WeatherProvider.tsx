import React, {
  useState,
  useEffect,
  createContext,
  FC,
  useContext,
} from "react";
import { getCurrentWeather, getForecast } from "../api/fetchWeather";
import { ForecastApiResponse, WeatherApiResponse } from "../@types/types";
import { IWeatherContext } from "../@types/IWeatherContext";

export const WeatherContext = createContext({} as IWeatherContext);

export const WeatherProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [currentWeather, setCurrentWeather] =
    useState<WeatherApiResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState<string>("Kyiv");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

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

  const value = {
    currentWeather,
    forecast,
    loading,
    currentCity,
    setCurrentCity,
    units,
    setUnits,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeatherData = () => useContext(WeatherContext);
