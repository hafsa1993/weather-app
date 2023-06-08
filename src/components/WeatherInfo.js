import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

export default function WeatherInfo() {
  const { weatherData } = useContext(DataContext);
  const [weatherType, setWeatherType] = useState("");

  const sunsetTimeInMs = new Date(weatherData.sunset * 1000);
  const sunsetTime = `${sunsetTimeInMs.getHours()} : ${sunsetTimeInMs.getMinutes()}`;

  useEffect(() => {
    if (weatherData.weatherMood) {
      switch (weatherData.weatherMood) {
        case "Clouds":
          setWeatherType("wi-day-cloudy");
          break;
        case "Rain":
          setWeatherType("wi-rain");
          break;
        case "Drizzle":
          setWeatherType("wi-showers");
          break;
        case "Haze":
          setWeatherType("wi-fog");
          break;
        case "Clear":
          setWeatherType("wi-day-sunny");
          break;
        case "Mist":
          setWeatherType("wi-dust");
          break;
        default:
          setWeatherType("wi-day-sunny");
      }
    }
  }, [weatherData]);

  return (
    <article className="widget">
      <div className="weatherIcon">
        <i className={`wi ${weatherType}`}></i>
      </div>
      <div className="weatherInfo">
        <div className="temperature">
          <span>{((weatherData.temp - 32) * (5 / 9)).toFixed(1)}&deg;</span>
        </div>
        <div className="description">
          <div className="weatherCondition">{weatherData.weatherMood}</div>
          <div className="place">
            {weatherData.name}, {weatherData.country}
          </div>
        </div>
      </div>
      <div className="date">{new Date().toLocaleString()}</div>
      <div className="extra-temp">
        <div className="temp-info-minmax">
          <div className="two-sided-section">
            <p>
              <i className="wi wi-sunset"></i>
            </p>
            <p className="extra-info-leftside">
              {sunsetTime} PM
              <br />
              Sunset
            </p>
          </div>

          <div className="two-sided-section">
            <p>
              <i className="wi wi-humidity"></i>
            </p>
            <p className="extra-info-leftside">
              {weatherData.humidity}
              <br />
              Humidity
            </p>
          </div>
        </div>
        <div className="weather-extra-info">
          <div className="two-sided-section">
            <p>
              <i className="wi wi-rain"></i>
            </p>
            <p className="extra-info-leftside">
              {weatherData.pressure}
              <br />
              Pressure
            </p>
          </div>

          <div className="two-sided-section">
            <p>
              <i className="wi wi-strong-wind"></i>
            </p>
            <p className="extra-info-leftside">
              {weatherData.speed}
              <br />
              Speed
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
