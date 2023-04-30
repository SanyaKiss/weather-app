import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CityNotFoundProps {
  cityName: string;
  onBackClick: () => void;
}

export const NotFound: FC<CityNotFoundProps> = ({ cityName, onBackClick }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>
        {t("NotFound")} "{cityName}"
      </h2>
      <button className="button" onClick={onBackClick}>
        {t("Back")}
      </button>
    </div>
  );
};
