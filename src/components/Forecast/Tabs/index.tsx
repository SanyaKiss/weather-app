import React, { FC } from "react";
//@ts-ignore
import styles from "./Tabs.module.scss";
import { dayFormat } from "../../../utils/dateFormatter";
import { WeatherApiResponse } from "../../../@types/types";
import { getDailyForecastData } from "../../../utils/getDailyWeather";
import { getWeatherIcon } from "../../../utils/getWeatherIcon";
import { useTranslation } from "react-i18next";

type TabsProps = {
  weather: WeatherApiResponse[];
  selectDay: number;
  handleClick: (date: number, index: number) => void;
};

export const Tabs: FC<TabsProps> = ({ weather, selectDay, handleClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabs}>
      {getDailyForecastData(weather).map((item, index) => (
        <div
          className={`${styles.tabItem} ${
            selectDay === index ? styles["-active"] : ""
          }`}
          key={index}
          onClick={() => handleClick(item.dt_txt, index)}
        >
          <div className={styles.tabItem__date}>
            {t(dayFormat(item.dt_txt))}
          </div>
          <img
            className={styles.tabItem__icon}
            src={getWeatherIcon(item.weather.icon)}
            alt="weather icon"
          />
          <div className={styles.tabItem__temperatures}>
            <span className={styles.tabItem__temperature}>
              {item.main.minTemp}&deg;
            </span>
            <span className={styles.tabItem__temperature}>
              {item.main.maxTemp}&deg;
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
