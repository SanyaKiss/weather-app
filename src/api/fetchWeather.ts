import axios from "axios";
import { ForecastApiResponse, WeatherApiResponse } from "../@types/types";

export const getCurrentWeather = async (
  city: string,
  units:string
): Promise<WeatherApiResponse | undefined> => {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getForecast = async (
  city: string,
  units:string
): Promise<ForecastApiResponse | undefined> => {
  try {
    const response = await axios.get<ForecastApiResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
