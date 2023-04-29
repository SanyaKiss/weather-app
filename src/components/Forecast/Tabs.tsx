import React, { FC } from "react";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { dayFormat, hourlyFormat } from "../../utils/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherApiResponse } from "../../@types/types";
import { getDailyForecastData } from "../../utils/getDailyWeather";

type TabsProps = {
  data: WeatherApiResponse[];
  selectDay: number;
  handleClick: (date: number, index: number) => void;
};

export const Tabs: FC<TabsProps> = ({ data , selectDay, handleClick}) => {
  return (
    <div className="days-container">
      {getDailyForecastData(data).map((item, index) => (
        <div
          className={`forecast__item ${selectDay === index ? "-active" : ""}`}
          key={index}
          onClick={() => handleClick(item.dt_txt, index)}
        >
          <div className="icon"></div>
          <div className="date">{dayFormat(item.dt_txt)}</div>
          <div className="temperatures">
            <span className="temperature">{item.main.minTemp}&deg;</span>
            <span className="temperature">{item.main.maxTemp}&deg;</span>
          </div>
        </div>
      ))}
    </div>
  );
};
