import React from "react";
import { WeatherApiResponse } from "./Main";
import moment from "moment";
import sun from "../assets/img/sun.svg";
import moon from "../assets/img/moon.svg";
import pressure from "../assets/img/pressure.png";
import humidity from "../assets/img/humidity.png";
import wind from "../assets/img/wind.png";

export const CurrentWeather = ({
  weatherData,
}: {
  weatherData: WeatherApiResponse;
}) => {
  return (
    <div className="current-weather">
      <div className="main-block">
        <h2 className="city-name">Odessa</h2>
        <div className="temperature-icon">
          <h1 className="temperature">
            {Math.round(weatherData.main.temp)}&deg;C
          </h1>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        </div>
        <p className="feels-like">
          Feels like {weatherData.main.feels_like}&deg;
        </p>
        <div className="sun-block">
          <div className="title">Sunrise & Sunset</div>
          <div className="sun-states">
            <div className="sun-state">
              <img src={sun} alt="sunrise" className="sun-state__icon" />
              <div className="sun-state__info">
                <p className="sun-state__name">Sunrise</p>
                <p className="sun-state__time">
                  {moment.unix(weatherData.sys.sunrise).format("h:mm A")}
                </p>
              </div>
            </div>
            <div className="sun-state">
              <img src={moon} alt="sunrise" className="sun-state__icon" />
              <div className="sun-state__info">
                <p className="sun-state__name">Sunset</p>
                <p className="sun-state__time">
                  {moment.unix(weatherData.sys.sunset).format("h:mm A")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-block">
        <div className="info">
          <div className="info__text-block">
            <p className="info__title">Wind</p>
            <div className="info__value">{weatherData.wind.speed}M/sec</div>
          </div>
          <img src={wind} alt="wind" className="info__icon" />
        </div>
        <div className="info">
          <div className="info__text-block">
            <p className="info__title">humidity</p>
            <div className="info__value">{weatherData.main.humidity}%</div>
          </div>
          <img src={humidity} alt="wind" className="info__icon" />
        </div>
        <div className="info">
          <div className="info__text-block">
            <p className="info__title">pressure</p>
            <div className="info__value">{weatherData.main.pressure}hPa</div>
          </div>
          <img src={pressure} alt="wind" className="info__icon" />
        </div>
      </div>
    </div>
  );
};
