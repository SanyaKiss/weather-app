import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import i18n from "../18n";
import searchIcon from "../assets/img/search-icon.png";

type HeaderProps = {
  cityChange: (city: string) => void;
};

export const Header: FC<HeaderProps> = ({ cityChange }) => {
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
        <button className="header__button submit-button" type="submit">
          <img className="header__icon" src={searchIcon} alt="search" />
        </button>
      </form>
      <button className="header__button button" onClick={handleLanguageChange}>
        {language ? "укр" : "en"}
      </button>
    </header>
  );
};
