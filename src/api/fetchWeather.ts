import axios from 'axios';
import { ForecastApiResponse, WeatherApiResponse } from '../@types/types';
import { API_KEY } from './API_KEY';

export const getCurrentWeather = async (city: string): Promise<WeatherApiResponse | undefined> => {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getForecast = async (city: string): Promise<ForecastApiResponse | undefined> => {
  try {
    const response = await axios.get<ForecastApiResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};