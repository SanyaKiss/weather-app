import { FC } from "react";
import pressureIcon from "../../assets/img/pressure.png";
import humidityIcon from "../../assets/img/humidity.png";
import windIcon from "../../assets/img/wind.png";
import { useTranslation } from "react-i18next";
import { InfoCard } from "./infoCard";
import { SunStateBlock } from "./SunStateBlock";
import { WeatherApiResponse } from "../../@types/types";

interface CurrentWeatherProps {
  weatherData: WeatherApiResponse;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({ weatherData }) => {
  const { t } = useTranslation();
  const { name, main, sys, wind } = weatherData;

  return (
    <div className="current-weather">
      <div className="main-container">
        <h2 className="city-name">{name}</h2>
        <div className="temperature-icon">
          <h1 className="temperature">{Math.round(main.temp)}&deg;C</h1>
        </div>
        <p className="feels-like">
          {t("Feels like")} {Math.round(main.feels_like)}&deg;
        </p>
        {sys && <SunStateBlock sys={sys} />}
      </div>
      <div className="info-container">
        <InfoCard
          title={t("Wind")}
          value={`${wind.speed} ${t("M/sec")}`}
          icon={windIcon}
        />
        <InfoCard
          title={t("Humidity")}
          value={`${main.humidity}%`}
          icon={humidityIcon}
        />

        <InfoCard
          title={t("Pressure")}
          value={`${main.pressure} ${t("hPa")}`}
          icon={pressureIcon}
        />
      </div>
    </div>
  );
};
