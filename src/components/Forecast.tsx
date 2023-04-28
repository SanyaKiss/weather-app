import React, { FC, useEffect, useState } from "react";
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
  const dailyData = () => {
    const today = moment().format("ddd, D MMM");
    const filteredForecast = forecastData.filter((item) =>
      item.date.includes(today)
    );
    return filteredForecast;
  };
  const [hourlyWeather, setHourlyWeather] = useState<ForecastData[]>(
    dailyData()
  );
  const [selectDay, setSelectDay] = useState(0);
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

  const handleClick = (date: string, index: number) => {
    const filteredForecast = forecastData.filter((item) =>
      item.date.includes(date)
    );
    setHourlyWeather(filteredForecast);
    setSelectDay(index);
  };
  return (
    <div className="forecast">
      <div className="days-container">
        {dailyTemperature.slice(0, 6).map((item, index) => (
          <div
            className={`forecast__item ${selectDay === index ? "-active" : ""}`}
            key={index}
            onClick={() => handleClick(item.date, index)}
          >
            <div className="icon">
              {/* <img
                src={`http://openweathermap.org/img/w/${item}.png`}
                alt="weather icon"
              /> */}
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
      <div className="hourly-container">
      <table className="hourly">
        {hourlyWeather.map((item) => (
              <tr>
                <td className="hourly__time" style={{backgroundColor: "#fff1cb"}}>
                  {moment(item.date).format("h:mm A")}
                </td>
                <td >
                  <FontAwesomeIcon
                    className="hourly__icon"
                    style={{ color: "rgba(255, 165, 0, 0.4)" }}
                    color="orange"
                    size="2xl"
                    icon={getWeatherIcon(item.icon)}
                  />
                </td>
                <td className="hourly__temperature">{item.temperature}&deg;</td>
              </tr>
        ))}
        </table>
      </div>
    </div>
  );
};
