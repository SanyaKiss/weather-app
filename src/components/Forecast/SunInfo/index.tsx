import React, { FC } from "react";
//@ts-ignore
import styles from "./SunInfo.module.scss";
import sunriseIcon from '../../../assets/weather-icons/icons8-sunrise-64.png'
import sunsetIcon from '../../../assets/weather-icons/icons8-sunset-64.png'
import { sunTimeFormat } from "../../../utils/dateFormatter";
import { useTranslation } from "react-i18next";
import { SysData } from "../../../@types/types";

type SunStateProps = {
  sys: SysData;
};

export const SunInfo: FC<SunStateProps> = ({ sys }) => {
  const { t } = useTranslation();

  const sunriseTime = sunTimeFormat(sys.sunrise);
  const sunsetTime = sunTimeFormat(sys.sunset);

  return (
    <div className={styles.sunInfo}>
      <div className={styles.sunInfo__title}>{t("Sunrise & Sunset")}</div>
      <div className={styles.sunriseSunset}>
        <div className={styles.sunriseSunset_item}>
          <img src={sunriseIcon} alt="sunrise" className={styles.sunriseSunset__icon}/>
          <div className={styles.sunriseSunset__info}>
            <p className={styles.sunriseSunset__name}>{t("Sunrise")}</p>
            <p className={styles.sunriseSunset__time}>{sunriseTime} </p>
          </div>
        </div>
        <div className={styles.sunriseSunset_item}>
          <img src={sunsetIcon} alt="sunrise" className={styles.sunriseSunset__icon} />
          <div className={styles.sunriseSunset__info}>
            <p className={styles.sunriseSunset__name}>{t("Sunset")}</p>
            <p className={styles.sunriseSunset__time}>{sunsetTime} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
