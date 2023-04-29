import moment from 'moment';
import React, { FC, useState } from 'react'
import i18n from '../18n';

type HeaderProps = {
    searchCity: (city: string) => void;
  };

export const Header:FC<HeaderProps> = ({searchCity}) => {
      const [language, setLanguage] = useState<boolean>(false);
      const [search, setSearch] = useState<string>("");
    
  const handleLanguage = () => {
    setLanguage((prev) => !prev);
    language ? i18n.changeLanguage("uk") : i18n.changeLanguage("en");
  };

  const currentDate = moment().format("dddd, MMMM DD, YYYY");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    searchCity(search);
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
        placeholder="enter city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="header__button" type="submit">
        Get
      </button>
    </form>
    <button className="header__button" onClick={handleLanguage}>
      {language ? "укр" : "en"}
    </button>
  </header>
)
}
