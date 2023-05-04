import { Dispatch, SetStateAction } from "react";
import { ForecastApiResponse, WeatherApiResponse } from "./types";

export interface IWeatherContext {
  currentWeather: WeatherApiResponse | null;
  forecast: ForecastApiResponse | null;
  loading: boolean;
  currentCity: string;
  setCurrentCity: Dispatch<SetStateAction<string>>;
  units: "metric" | "imperial";
  setUnits: Dispatch<SetStateAction<"metric" | "imperial">>;
}
