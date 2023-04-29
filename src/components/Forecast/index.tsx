import React, { FC, useState } from "react";
import { getDailyForecastData } from "../../utils/getDailyWeather";
import { ForecastApiResponse, WeatherApiResponse } from "../../@types/types";
import { dateFormat } from "../../utils/dateFormatter";
import { Tabs } from "./Tabs";
import { HourlyWeather } from "./HourlyWeather";
import { SunStateBlock } from "./SunStateBlock";
import { MainCard } from "./MainCard";
import { InfoCards } from "./InfoCards";

type ForecastProps = {
  forecastData: ForecastApiResponse;
  weatherData: WeatherApiResponse;
};

export const Forecast: FC<ForecastProps> = ({ forecastData, weatherData }) => {
  const { list: data } = forecastData;
  const { name, main, sys, wind } = weatherData;
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

    setDayWeather(index === 0 ? weatherData : filterWeather[0]);
  };

  return (
    <div className="forecast">
      <Tabs data={data} selectDay={selectDay} handleClick={handleClick} />
      <div className="weather-container">
        <HourlyWeather weather={hourlyWeather} />
        {sys && <SunStateBlock sys={sys} />}
        <MainCard name={name} main={main} />
        <InfoCards wind={wind} main={main} />
      </div>
    </div>
  );
};
