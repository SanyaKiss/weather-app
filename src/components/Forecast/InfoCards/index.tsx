import { FC } from "react";
//@ts-ignore
import styles from "./InfoCards.module.scss";
import pressureIcon from "../../../assets/img/pressure.png";
import humidityIcon from "../../../assets/img/humidity.png";
import windIcon from "../../../assets/img/wind.png";
import { MainData, WindData } from "../../../@types/types";
import { useTranslation } from "react-i18next";

interface InfoCardsProps {
  wind: WindData;
  main: MainData;
}

export const InfoCards: FC<InfoCardsProps> = ({ wind, main }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <div className={styles.card__textBlock}>
          <p className={styles.card__title}>{t("Wind")}</p>
          <div className={styles.card__value}>
            {Math.round(wind.speed)} {t("M/sec")}
          </div>
        </div>
        <img src={windIcon} alt="wind" className={styles.card__icon} />
      </div>
      <div className={styles.card}>
        <div className={styles.card__textBlock}>
          <p className={styles.card__title}>{t("Hudimity")}</p>
          <div className={styles.card__value}>{main.humidity}%</div>
        </div>
        <img src={humidityIcon} alt="hudimity" className={styles.card__icon} />
      </div>
      <div className={styles.card}>
        <div className={styles.card__textBlock}>
          <p className={styles.card__title}>{t("Pressure")}</p>
          <div className={styles.card__value}>
            {main.pressure}
            {t("hPa")}
          </div>
        </div>
        <img src={pressureIcon} alt="pressure" className={styles.card__icon} />
      </div>
    </div>
  );
};
