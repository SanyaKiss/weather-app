import React, { FC } from "react";
//@ts-ignore
import styles from "./Tabs.module.scss";

import { dayFormat } from "../../../utils/dateFormatter";
import { WeatherApiResponse } from "../../../@types/types";
import { getDailyForecastData } from "../../../utils/getDailyWeather";

type TabsProps = {
  data: WeatherApiResponse[];
  selectDay: number;
  handleClick: (date: number, index: number) => void;
};

export const Tabs: FC<TabsProps> = ({ data, selectDay, handleClick }) => {
  return (
    <div className={styles.tabs}>
      {getDailyForecastData(data).map((item, index) => (
        <div
          className={`${styles.tabItem} ${
            selectDay === index ? styles["-active"] : ""
          }`}
          key={index}
          onClick={() => handleClick(item.dt_txt, index)}
        >
          <div className={styles.tabItem__icon}></div>
          <div className={styles.tabItem__date}>{dayFormat(item.dt_txt)}</div>
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
