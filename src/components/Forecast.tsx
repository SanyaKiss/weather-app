import React from "react";
import { ForecastData } from "../App";

export const Forecast = ({
  forecastData,
}: {
  forecastData: ForecastData[];
}) => {
  return (
    <div className="forecast">
      <h3>Forecast</h3>
      {forecastData.map((data, index) => (
        <div className="forecast-item" key={index}>
          <hr />
          <div className="date">{data.date}</div>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/w/${data.icon}.png`}
              alt="weather icon"
            />
          </div>
          <div className="temperature">{data.temperature}&deg;C</div>
          <div className="description">{data.description}</div>
        </div>
      ))}
    </div>
  );
};
