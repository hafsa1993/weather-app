import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [weatherData, setWeatherData] = useState({});

  return (
    <DataContext.Provider
      value={{
        searchText,
        setSearchText,
        weatherData,
        setWeatherData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
