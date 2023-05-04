import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import i18n from "../18n";
import { useWeatherData } from "../context/WeatherProvider";

export const Header: FC = () => {
  const { units, setUnits, setCurrentCity } = useWeatherData();
  const [language, setLanguage] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const currentDate = moment().format("dddd, MMMM DD, YYYY");

  useEffect(() => {
    language ? i18n.changeLanguage("uk") : i18n.changeLanguage("en");
  }, [language]);

  const handleLanguageChange = () => {
    setLanguage((prev) => !prev);
  };
  const handleUnitsChange = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCurrentCity(search);
    setSearch("");
  };

  const currentLang = language ? "укр" : "en";
  const currentUnits = units === "metric" ? "°C" : "°F";

  return (
    <header className="header">
      <h1 className="header__date">{currentDate}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="header__input"
          type="text"
          placeholder="Enter city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="header__buttons">
        <button
          className="header__button button"
          onClick={handleLanguageChange}
        >
          {currentLang}
        </button>
        <button className="header__button button" onClick={handleUnitsChange}>
          {currentUnits}
        </button>
      </div>
    </header>
  );
};
