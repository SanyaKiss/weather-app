import React, { FC, useState } from "react";
import { ForecastData, WeatherData } from "./Main";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { useTranslation } from "react-i18next";

interface DailyForecast {
  [key: string]: {
    minTemperature: number;
    maxTemperature: number;
  };
}

type ForecastProps = {
  forecastData: ForecastData[];
};

export const Forecast: FC<ForecastProps> = ({ forecastData }) => {
  const [dailyWeather, setDailyWeather] = useState<ForecastData[]>([]);
  const { t } = useTranslation();

  const dailyForecast = forecastData.reduce((acc: DailyForecast, curr) => {
    const date = curr.date.split(", ")[1];
    const temperature = curr.temperature;
    if (!acc[date]) {
      acc[date] = { minTemperature: temperature, maxTemperature: temperature };
    } else {
      acc[date].minTemperature = Math.min(
        acc[date].minTemperature,
        temperature
      );
      acc[date].maxTemperature = Math.max(
        acc[date].maxTemperature,
        temperature
      );
    }
    return acc;
  }, {});

  const dailyTemperature = Object.keys(dailyForecast).map((date) => {
    return {
      date: date,
      minTemperature: dailyForecast[date].minTemperature,
      maxTemperature: dailyForecast[date].maxTemperature,
    };
  });

  const handleClick = (date: string) => {
    const filteredForecast = forecastData.filter((item) =>
      item.date.includes(date)
    );
    setDailyWeather(filteredForecast);
  };
  return (
    <div className="forecast">
      <div className="forecast-buttons">
        {dailyTemperature.slice(0, 6).map((item, index) => (
          <div
            className="forecast__item"
            key={index}
            onClick={() => handleClick(item.date)}
          >
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/w/${item}.png`}
                alt="weather icon"
              />
            </div>
            <div className="date">
              {moment(`2023 ${item.date}`).format("ddd")}
            </div>
            <div className="temperatures">
              <span className="temperature">{item.minTemperature}&deg;</span>
              <span className="temperature">{item.maxTemperature}&deg;</span>
            </div>
          </div>
        ))}
      </div>
      <div className="forecast-daily-block">
        {dailyWeather.map((item) => (
          <div className="forecast__daily">
            <div> {moment(item.date).format("h:mm A")}</div>
            {/* <img
              src={`http://openweathermap.org/img/w/${item.icon}.png`}
              alt="weather icon"
            /> */}
            <FontAwesomeIcon
              color="orange"
              size="2xl"
              icon={getWeatherIcon(item.icon)}
            />
            <div>{item.temperature}&deg;</div>
          </div>
        ))}
      </div>
    </div>
  );
};
