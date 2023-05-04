import React, { FC, useState } from "react";
import { getDailyForecastData } from "../../utils/getDailyWeather";
import { WeatherApiResponse } from "../../@types/types";
import { dateFormat } from "../../utils/dateFormatter";
import { Tabs } from "./Tabs";
import { HourlyWeather } from "./HourlyWeather";
import { MainCard } from "./MainCard";
import { InfoCards } from "./InfoCards";
import { useWeatherData } from "../../context/WeatherProvider";

export const Forecast: FC = () => {
  const { currentWeather, forecast, units } = useWeatherData();
  const data = forecast?.list;
  const todayData = () => {
    const today = dateFormat();
    return data!.filter((item) => dateFormat(item.dt_txt).includes(today));
  };
  const [hourlyWeather, setHourlyWeather] = useState<WeatherApiResponse[]>(
    todayData()
  );
  const [dayWeather, setDayWeather] = useState<WeatherApiResponse>(
    currentWeather!
  );
  const [selectDay, setSelectDay] = useState(0);

  const handleClick = (date: number, index: number) => {
    const dailyData = data!.filter((item) =>
      dateFormat(item.dt_txt).includes(dateFormat(date))
    );
    setHourlyWeather(dailyData);
    setSelectDay(index);
    const filterWeather = getDailyForecastData(data!).filter((item) =>
      dateFormat(item.dt_txt).includes(dateFormat(date))
    );
    setDayWeather(
      index === 0
        ? currentWeather!
        : {
            ...filterWeather[0],
            name: currentWeather!.name,
          }
    );
  };
  return (
    <div className="forecast">
      <Tabs weather={data!} selectDay={selectDay} handleClick={handleClick} />
      <div className="weather-container">
        <HourlyWeather weather={hourlyWeather} />
        <div className="weather-cards">
          {dayWeather.sys !== undefined && (
            <MainCard
              sys={dayWeather.sys}
              name={dayWeather.name}
              main={dayWeather.main}
              icon={dayWeather.weather[0].icon}
              units={units}
            />
          )}
          <InfoCards wind={dayWeather.wind} main={dayWeather.main} />
        </div>
      </div>
    </div>
  );
};
export * from './Forecast';
