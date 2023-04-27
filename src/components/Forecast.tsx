import React from "react";
import { ForecastData } from "./Main";
import moment from "moment";

export const Forecast = ({
  forecastData,
}: {
  forecastData: ForecastData[];
}) => {

  const fiveDays = forecastData.slice(0, 5)

  return (
    <div className="forecast">
      {fiveDays.map((data, index) => (
        <div className="forecast-item" key={index}>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/w/${data.icon}.png`}
              alt="weather icon"
            />
          </div>
          <div className="date">{moment(data.date).format("ddd")}</div>
          <div className="temperature">{data.temperature}&deg;</div>
        </div>
      ))}
    </div>
  );
};
