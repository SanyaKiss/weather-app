import React, { FC } from "react";
//@ts-ignore
import styles from "./HourlyWeather.module.scss";
import { WeatherApiResponse } from "../../../@types/types";
import { hourlyFormat } from "../../../utils/dateFormatter";
import { getWeatherIcon } from "../../../utils/getWeatherIcon";

type HourlyWeatherProps = {
  weather: WeatherApiResponse[];
};

export const HourlyWeather: FC<HourlyWeatherProps> = ({ weather }) => {
  return (
    <div className={styles.hourlyContainer}>
      <table >
        {weather.map((item) => (
          <td className={styles.hourItem}>
              <tr
                className={styles.hourItem__time}
                style={{ backgroundColor: "#f9b891" }}
              >
                {hourlyFormat(item.dt_txt)}
              </tr>
              <tr>
                {item.weather && (
                  <img
                    src={getWeatherIcon(item.weather[0].icon)}
                    alt="weather"
                    className={styles.hourItem__icon}
                  />
                )}
              </tr>
              <tr className={styles.hourItem__temperature}>
                {Math.round(item.main.temp)}&deg;
              </tr>
          </td>
        ))}
      </table>   </div>
  );
};
