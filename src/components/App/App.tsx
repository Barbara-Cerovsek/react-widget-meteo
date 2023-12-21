import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const [zip, setZip] = useState(64500);
  const [weatherData, setWeatherData] = useState(null);

  const fahrenheitToCelsius = (fahren) => {
    return Math.round(fahren - 273.15);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=44b69afe1e2a24d74186cc777a88f9a2`
    );

    if (response.data) {
      response.data.main.temp = fahrenheitToCelsius(response.data.main.temp);
    }
    setWeatherData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="widget">
      <Icon name="sun" size="huge" />
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city zipcode"
          value={zip}
          onChange={handleInputChange}
        />
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
