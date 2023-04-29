import { FC } from "react";
import pressureIcon from "../../assets/img/pressure.png";
import humidityIcon from "../../assets/img/humidity.png";
import windIcon from "../../assets/img/wind.png";
import { MainData, WindData } from "../../@types/types";
import { useTranslation } from "react-i18next";

interface InfoCardsProps {
  wind: WindData;
  main:MainData
}

export const InfoCards: FC<InfoCardsProps> = ({ wind, main }) => {
  const { t } = useTranslation();

  return (
    <div className="info-container">
      <div className="info">
        <div className="info__text-block">
          <p className="info__title">{t('Wind')}</p>
          <div className="info__value">{Math.round(wind.speed)} {t('M/sec')}</div>
        </div>
        <img src={windIcon} alt='wind' className="info__icon" />
      </div>
      <div className="info">
        <div className="info__text-block">
          <p className="info__title">{t('Hudimity')}</p>
          <div className="info__value">{main.humidity}%</div>
        </div>
        <img src={humidityIcon} alt='hudimity' className="info__icon" />
      </div>
      <div className="info">
        <div className="info__text-block">
          <p className="info__title">{t('Pressure')}</p>
          <div className="info__value">{main.pressure}{t('hPa')}</div>
        </div>
        <img src={pressureIcon} alt='pressure' className="info__icon" />
      </div>
    </div>
  );
};
