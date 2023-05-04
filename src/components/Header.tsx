import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import i18n from "../18n";
import { UnitsType } from "../@types/types";

type HeaderProps = {
  cityChange: (city: string) => void;
  unitsChange: () => void;
  units: UnitsType;
};

export const Header: FC<HeaderProps> = ({ cityChange, unitsChange, units }) => {
  const [language, setLanguage] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const currentDate = moment().format("dddd, MMMM DD, YYYY");

  useEffect(() => {
    language ? i18n.changeLanguage("uk") : i18n.changeLanguage("en");
  }, [language]);

  const handleLanguageChange = () => {
    setLanguage((prev) => !prev);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    cityChange(search);
    setSearch("");
  };

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
          {language ? "укр" : "en"}
        </button>
        <button className="header__button button" onClick={unitsChange}>
          {units === "metric" ? "°C" : "°F"}
        </button>
      </div>
    </header>
  );
};
