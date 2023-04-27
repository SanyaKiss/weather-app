import React, { FC, useState } from "react";
import { ForecastData, WeatherData } from "./Main";
import moment from "moment";

// interface DailyForecast {
//   [key: string]: {
//     temperature: number;
//     count: number;
//   };
// }

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

  console.log(dailyForecast);

  const dailyTemperature = Object.keys(dailyForecast).map((date) => {
    return {
      date: date,
      minTemperature: dailyForecast[date].minTemperature,
      maxTemperature: dailyForecast[date].maxTemperature,
    };
  });

  console.log(dailyTemperature);

  // const dailyForecast = forecastData.reduce((acc: DailyForecast, curr) => {
  //   const date = curr.date.split(", ")[1];
  //   const temperature = curr.temperature;
  //   if (!acc[date]) {
  //     acc[date] = { temperature: temperature, count: 1 };
  //   } else {
  //     acc[date].temperature += temperature;
  //     acc[date].count++;
  //   }
  //   return acc;
  // }, {});

  // const dailyTemperature = Object.keys(dailyForecast).map((date) => {
  //   return {
  //     date: date,
  //     temperature: Math.round(
  //       dailyForecast[date].temperature / dailyForecast[date].count
  //     ),
  //   };
  // });

  const handleClick = (date: string) => {
    const filteredForecast = forecastData.filter((item) =>
      item.date.includes(date)
    );
    setDailyWeather(filteredForecast);
  };
  return (
    <div className="forecast">
      <div className="forecast__buttons">
        {dailyTemperature.slice(0, 6).map((item, index) => (
          <div
            className="forecast-item"
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
      <div>
        {dailyWeather.map((item) => (
          <div className="forecast-daily">
            <div> {moment(item.date).format("h:mm A")}</div>
            <img
              src={`http://openweathermap.org/img/w/${item.icon}.png`}
              alt="weather icon"
            />
            <div>{item.temperature}&deg;</div>
          </div>
        ))}
      </div>
    </div>
  );
};
