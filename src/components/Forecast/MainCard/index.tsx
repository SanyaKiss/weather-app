import React, { FC } from "react";
//@ts-ignore
import styles from "./MainCard.module.scss";
import { MainData } from "../../../@types/types";
import { useTranslation } from "react-i18next";
import catsImg from "../../../assets/kittens_2_png/file_125700562.png";

interface MainCardProps {
  name: string;
  main: MainData;
}
export const MainCard: FC<MainCardProps> = ({ name, main }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.city}>{name}</h2>
        <div className={styles.temperatureIcon}>
          <h1 className={styles.temperature}>{Math.round(main?.temp)}&deg;C</h1>
        </div>
        <p className={styles.feelsLike}>
          {t("Feels like")} {Math.round(main?.feels_like)}&deg;
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={catsImg} alt="" />
      </div>
    </div>
  );
};
