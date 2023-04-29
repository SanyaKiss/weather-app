import React, { FC } from "react";
import sunIcon from "../assets/img/sun.svg";
import moonIcon from "../assets/img/moon.svg";
import { sunTimeFormat } from "../utils/dateFormatter";
import { useTranslation } from "react-i18next";
import { SysData } from "../@types/types";

type SunStateProps = {
  sys: SysData;
};

export const SunStateBlock: FC<SunStateProps> = ({ sys }) => {
  const { t } = useTranslation();

  const sunriseTime = sunTimeFormat(sys.sunrise);
  const sunsetTime = sunTimeFormat(sys.sunset);

  return (
    <div className="sun-state-container">
      <div className="title">{t("Sunrise & Sunset")}</div>
      <div className="sun-states">
        <div className="sun-state">
          <img src={sunIcon} alt="sunrise" className="sun-state__icon" />
          <div className="sun-state__info">
            <p className="sun-state__name">{t("Sunrise")}</p>
            <p className="sun-state__time">{sunriseTime} </p>
          </div>
        </div>
        <div className="sun-state">
          <img src={moonIcon} alt="sunrise" className="sun-state__icon" />
          <div className="sun-state__info">
            <p className="sun-state__name">{t("Sunset")}</p>
            <p className="sun-state__time">{sunsetTime} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
