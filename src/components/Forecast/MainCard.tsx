import React, { FC } from "react";
import { MainData } from "../../@types/types";
import { useTranslation } from "react-i18next";

interface MainCardProps {
  name: string;
  main: MainData;
}
export const MainCard: FC<MainCardProps> = ({ name, main }) => {
  const { t } = useTranslation();

  return (
    <div className="main-container">
      <h2 className="city-name">{name}</h2>
      <div className="temperature-icon">
        <h1 className="temperature">{Math.round(main?.temp)}&deg;C</h1>
      </div>
      <p className="feels-like">
        {t("Feels like")} {Math.round(main?.feels_like)}&deg;
      </p>
    </div>
  );
};
