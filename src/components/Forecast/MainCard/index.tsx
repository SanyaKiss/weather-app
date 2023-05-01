import React, { FC } from "react";
//@ts-ignore
import styles from "./MainCard.module.scss";
import { MainData, UnitsType } from "../../../@types/types";
import { useTranslation } from "react-i18next";
import catsImg from "../../../assets/kittens_2_png/file_125700562.png";
import { IconType, getWeatherIcon } from "../../../utils/getWeatherIcon";

interface MainCardProps {
  name: string;
  main: MainData;
  icon:IconType;
  units: UnitsType
}
export const MainCard: FC<MainCardProps> = ({ name, main,icon, units }) => {
  const { t } = useTranslation();  
  const unitSymbol = units === "metric" ? "C" : "F";
  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.city}>{name}</h2>
        <div className={styles.temperatureIcon}>
          <h1 className={styles.temperature}>
            {Math.round(main?.temp)}&deg;{unitSymbol}
          </h1>
        </div>
        <p className={styles.feelsLike}>
          {t("Feels like")} {Math.round(main?.feels_like)}&deg;
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={getWeatherIcon(icon)} alt="" />
      </div>
    </div>
  );
};
