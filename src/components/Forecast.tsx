import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { getDailyForecastData } from "../utils/getDailyWeather";
import { CurrentWeather } from "./CurrentWeather";
import { ForecastApiResponse, WeatherApiResponse } from "../@types/types";
import { dateFormat, dayFormat, hourlyFormat } from "../utils/dateFormatter";

type ForecastProps = {
  forecastData: ForecastApiResponse;
  weatherData: WeatherApiResponse;
};

export const Forecast: FC<ForecastProps> = ({ forecastData, weatherData }) => {
  const { list: data } = forecastData;

  const todayData = () => {
    const today = dateFormat();
    return data.filter((item) => dateFormat(item.dt_txt).includes(today));
  };

  const [hourlyWeather, setHourlyWeather] = useState<WeatherApiResponse[]>(
    todayData()
  );
  const [selectDay, setSelectDay] = useState(0);

  const handleClick = (date: string, index: number) => {
    const dailyData = data.filter((item) =>
      dateFormat(item.dt_txt).includes(date)
    );
    setHourlyWeather(dailyData);
    setSelectDay(index);
  };

  return (
    <div className="forecast">
      <div className="days-container">
        {getDailyForecastData(data).map((item, index) => (
          <div
            className={`forecast__item ${selectDay === index ? "-active" : ""}`}
            key={index}
            onClick={() => handleClick(item.date, index)}
          >
            <div className="icon"></div>
            <div className="date">
              {dayFormat(item.date)}
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
                  {hourlyFormat(item.dt_txt)}
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
