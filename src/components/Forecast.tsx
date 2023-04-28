import React, { FC, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { useTranslation } from "react-i18next";
import { ForecastApiResponse, WeatherApiResponse } from "./Main";
import { getDailyForecastData } from "../utils/getDailyWeather";
import { CurrentWeather } from "./CurrentWeather";

export interface DailyForecast {
  [key: string]: {
    minTemperature: number;
    maxTemperature: number;
    totalTemperature: number;
    totalFeelsLike: number;
    totalWindSpeed: number;
    totalHumidity: number;
    totalPressure: number;
    count: 1;
  };
}

type ForecastProps = {
  forecastData: ForecastApiResponse;
  weatherData: WeatherApiResponse;
};

export const Forecast: FC<ForecastProps> = ({ forecastData, weatherData }) => {
  const { list } = forecastData;
  const data = list;
  const dailyData = () => {
    const today = moment().format("ddd, D MMM");
    const filteredForecast = data.filter((item) =>
      moment(item.dt_txt).format("ddd, D MMM, LT").includes(today)
    );
    return filteredForecast;
  };

  const [hourlyWeather, setHourlyWeather] = useState<WeatherApiResponse[]>(
    dailyData()
  );
  const [selectDay, setSelectDay] = useState(0);

  const handleClick = (date: string, index: number) => {
    const filteredForecast = data.filter((item) =>
      moment(item.dt_txt).format("ddd, D MMM, LT").includes(date)
    );
    setHourlyWeather(filteredForecast);
    setSelectDay(index);
  };
  return (
    <div className="forecast">
      <div className="days-container">
        {getDailyForecastData(data)
          .slice(0, 6)
          .map((item, index) => (
            <div
              className={`forecast__item ${
                selectDay === index ? "-active" : ""
              }`}
              key={index}
              onClick={() => handleClick(item.date, index)}
            >
              <div className="icon"></div>
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
      <div className="weather-container">
        <div className="hourly-container">
          <table className="hourly">
            {hourlyWeather.map((item) => (
              <tr>
                <td
                  className="hourly__time"
                  style={{ backgroundColor: "#fff1cb" }}
                >
                  {moment(item.dt_txt).format("h:mm A")}
                </td>
                <td>
                  <FontAwesomeIcon
                    className="hourly__icon"
                    style={{ color: "rgba(255, 165, 0, 0.4)" }}
                    color="orange"
                    size="2xl"
                    icon={getWeatherIcon(item.weather[0].icon)}
                  />
                </td>
                <td className="hourly__temperature">
                  {Math.round(item.main.temp)}&deg;
                </td>
              </tr>
            ))}
          </table>
        </div>
        {weatherData && <CurrentWeather weatherData={weatherData} />}
      </div>
    </div>
  );
};
