import moment from "moment";
import { DailyForecast, WeatherApiResponse } from "../@types/types";

export const getDailyForecastData = (data: WeatherApiResponse[]) => {
  const dailyForecast = data.reduce((acc: DailyForecast, curr) => {
    const date = moment(curr.dt_txt).format("ddd, D MMM, LT").split(", ")[1];
    const temperature = Math.round(curr.main.temp);
    const feelsLike = Math.round(curr.main.feels_like);
    const windSpeed = Math.round(curr.wind.speed);
    const humidity = curr.main.humidity;
    const pressure = curr.main.pressure;
    const dt_txt = curr.dt_txt
    if (!acc[date]) {
      acc[date] = {
        minTemperature: temperature,
        maxTemperature: temperature,
        totalTemperature: temperature,
        totalFeelsLike: feelsLike,
        totalWindSpeed: windSpeed,
        totalHumidity: humidity,
        totalPressure: pressure,
        dt_txt:dt_txt,
        count: 1,
      };
    } else {
      acc[date].minTemperature = Math.min(
        acc[date].minTemperature,
        temperature
      );
      acc[date].maxTemperature = Math.max(
        acc[date].maxTemperature,
        temperature
      );
      acc[date].totalTemperature += temperature;
      acc[date].totalFeelsLike += feelsLike;
      acc[date].totalWindSpeed += windSpeed;
      acc[date].totalHumidity += humidity;
      acc[date].totalPressure += pressure;
      acc[date].count++;
    }
    return acc;
  }, {});

  const dailyTemperature = Object.keys(dailyForecast).map((date) => {
    const {
      minTemperature,
      maxTemperature,
      totalTemperature,
      totalFeelsLike,
      totalWindSpeed,
      totalHumidity,
      totalPressure,
      dt_txt,
      count,
    } = dailyForecast[date];
    return {
      main: {
        temp: Math.round(totalTemperature / count),
        feels_like: Math.round(totalFeelsLike / count),
        humidity: Math.round(totalHumidity / count),
        pressure: Math.round(totalPressure / count),
        maxTemp: maxTemperature,
        minTemp: minTemperature,
      },
      wind: {
        speed: Math.round(totalWindSpeed / count),
      },
      dt_txt:dt_txt
    };
  });
  return dailyTemperature;
};
