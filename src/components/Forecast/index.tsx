import React, { FC, useState } from "react";
import { getDailyForecastData } from "../../utils/getDailyWeather";
import { ForecastApiResponse, WeatherApiResponse } from "../../@types/types";
import { dateFormat } from "../../utils/dateFormatter";
import { Tabs } from "./Tabs";
import { HourlyWeather } from "./HourlyWeather";
import { SunInfo } from "./SunInfo";
import { MainCard } from "./MainCard";
import { InfoCards } from "./InfoCards";

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
  const [dayWeather, setDayWeather] = useState<WeatherApiResponse>(weatherData);
  const [selectDay, setSelectDay] = useState(0);

  const handleClick = (date: number, index: number) => {
    const dailyData = data.filter((item) =>
      dateFormat(item.dt_txt).includes(dateFormat(date))
    );
    setHourlyWeather(dailyData);
    setSelectDay(index);
    const filterWeather = getDailyForecastData(data).filter((item) =>
      dateFormat(item.dt_txt).includes(dateFormat(date))
    );

    setDayWeather(index === 0 ? weatherData : {...filterWeather[0], name: weatherData.name});
  };

  return (
    <div className="forecast">
      <Tabs weather={data} selectDay={selectDay} handleClick={handleClick} />
      <div className="weather-container">
        <HourlyWeather weather={hourlyWeather} />
        {dayWeather.sys && <SunInfo sys={dayWeather.sys } />}
        <MainCard name={dayWeather.name} main={dayWeather.main} />
        <InfoCards wind={dayWeather.wind} main={dayWeather.main} />
      </div>
    </div>
  );
};