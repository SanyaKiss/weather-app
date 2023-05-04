import { FC, useMemo } from "react";
//@ts-ignore
import styles from "./InfoCards.module.scss";
import pressureIcon from "../../../assets/weather-icons/pressure.png";
import humidityIcon from "../../../assets/weather-icons/icons8-hygrometer-64.png";
import windIcon from "../../../assets/weather-icons/icons8-wind-64.png";
import { MainData, WindData } from "../../../@types/types";
import { useTranslation } from "react-i18next";

interface InfoCardsProps {
  wind: WindData;
  main: MainData;
}

interface Card {
  title: string;
  value: string;
  iconSrc: string;
  imgAlt: string;
}

export const InfoCards: FC<InfoCardsProps> = ({ wind, main }) => {
  const { t } = useTranslation();
  const cards: Card[] = useMemo(
    () => [
      {
        title: t("Wind"),
        value: Math.round(wind.speed) + " " + t("M/sec"),
        iconSrc: windIcon,
        imgAlt: "",
      },
      {
        title: t("Hudimity"),
        value: main.pressure + " " + t("hPa"),
        iconSrc: humidityIcon,
        imgAlt: "hudimity",
      },
      {
        title: t("Pressure"),
        value: main.pressure + " " + t("hPa"),
        iconSrc: pressureIcon,
        imgAlt: "pressure",
      },
    ],
    [main.pressure, t, wind.speed]
  );

  return (
    <div className={styles.cardsContainer}>
      {cards.map(({ title, value, iconSrc, imgAlt }, i) => (
        <div key={i} className={styles.card}>
          <p className={styles.card__title}>{title}</p>
          <div className={styles.card__value}>{value}</div>
          <img src={iconSrc} alt={imgAlt} className={styles.card__icon} />
        </div>
      ))}
    </div>
  );
};
