import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";

export default function SearchForm() {
  const { searchText, setSearchText, setWeatherData } = useContext(DataContext);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchData = async (url) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const json = await response.json();
      const { temp, humidity, pressure } = json.main;
      const { main: weatherMood } = json.weather[0];
      const { name } = json;
      const { speed } = json.wind;
      const { country, sunset } = json.sys;

      const weatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunset,
      };

      setWeatherData(weatherInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchText("");
    }
  };

  const getWeatherInfo = (e) => {
    e.preventDefault();
    fetchData(`https://open-weather13.p.rapidapi.com/city/${searchText}`);
  };

  useEffect(() => {
    fetchData("https://open-weather13.p.rapidapi.com/city/hubli");
  }, []);

  return (
    <div className="wrap">
      <form className="search" onSubmit={getWeatherInfo}>
        <input
          className="searchInput"
          type="search"
          id="search"
          autoFocus
          required
          placeholder="Enter city name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="searchButton">Search</button>
      </form>
    </div>
  );
}
