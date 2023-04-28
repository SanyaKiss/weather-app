import React from "react";
import { DailyForecast } from "../components/Forecast";
import { WeatherApiResponse } from "../components/Main";
import moment from "moment";

export const getDailyForecastData = (data: WeatherApiResponse[]) => {
  const dailyForecast = data.reduce((acc: DailyForecast, curr) => {
    const date = moment(curr.dt_txt).format("ddd, D MMM, LT").split(", ")[1];
    const temperature = Math.round(curr.main.temp);
    const feelsLike = Math.round(curr.main.feels_like);
    const windSpeed = Math.round(curr.wind.speed);
    const humidity = curr.main.humidity;
    const pressure = curr.main.pressure;

    if (!acc[date]) {
      acc[date] = {
        minTemperature: temperature,
        maxTemperature: temperature,
        totalTemperature: temperature,
        totalFeelsLike: feelsLike,
        totalWindSpeed: windSpeed,
        totalHumidity: humidity,
        totalPressure: pressure,
        count: 1,
      };
    } else {
      acc[date].minTemperature = Math.min(acc[date].minTemperature, temperature);
      acc[date].maxTemperature = Math.max(acc[date].maxTemperature, temperature);
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
    const { minTemperature, maxTemperature, totalTemperature, totalFeelsLike, totalWindSpeed, totalHumidity, totalPressure, count } = dailyForecast[date];
    return {
      date: date,
      minTemperature: minTemperature,
      maxTemperature: maxTemperature,
      averageTemperature: Math.round(totalTemperature / count),
      averageFeelsLike: Math.round(totalFeelsLike / count),
      averageWindSpeed: Math.round(totalWindSpeed / count),
      averageHumidity: Math.round(totalHumidity / count),
      averagePressure: Math.round(totalPressure / count),
    };
  });
  return dailyTemperature;
};





