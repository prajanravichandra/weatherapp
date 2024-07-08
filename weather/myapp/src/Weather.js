import React, { useState } from 'react';
import './weather.css';
import axios from 'axios';
import { Info } from './Info';
import { 
  WiDayThunderstorm, WiSprinkle, WiRain, WiSnow, WiSmoke, 
  WiDayHaze, WiDust, WiFog, WiSandstorm, WiVolcano, WiStrongWind, 
  WiTornado, WiDaySunny, WiCloud 
} from 'react-icons/wi';

const weatherIcons = {
  Thunderstorm: <WiDayThunderstorm size={'100px'} className="icon" />,
  Drizzle: <WiSprinkle size={'100px'} className="icon" />,
  Rain: <WiRain size={'100px'} className="icon" />,
  Snow: <WiSnow size={'100px'} className="icon" />,
  Mist: <WiFog size={'100px'} className="icon" />,
  Smoke: <WiSmoke size={'100px'} className="icon" />,
  Haze: <WiDayHaze size={'100px'} className="icon" />,
  Dust: <WiDust size={'100px'} className="icon" />,
  Fog: <WiFog size={'100px'} className="icon" />,
  Sand: <WiSandstorm size={'100px'} className="icon" />,
  Ash: <WiVolcano size={'100px'} className="icon" />,
  Squall: <WiStrongWind size={'100px'} className="icon" />,
  Tornado: <WiTornado size={'100px'} className="icon" />,
  Clear: <WiDaySunny size={'100px'} className="icon" />,
  Clouds: <WiCloud size={'100px'} className="icon" />
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [toggle, setToggle] = useState(true);

  const fetchWeather = async () => {
    const apiKey = process.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeatherData({
        ...response.data,
        temp: response.data.main.temp
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setWeatherData({ notFound: true });
      } else {
        console.error("Error fetching the weather data", error.message);
        setWeatherData(null);
      }
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='main'>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="form_item">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          className="input"
        />
        <button type="submit" className="form_item">Get Weather</button>
      </form>
      <button type="button" onClick={handleToggle}>Convert</button>
      {weatherData ? (
        weatherData.notFound ? (
          <div className="not-found">
            <h1>NOT FOUND</h1>
          </div>
        ) : (
          <div>
            <h3>Temperature in {weatherData.name}</h3>
            <div className="info">
              <div>
                <b>Temperature:</b>
                {toggle ? (
                  <p>{weatherData.temp} °C</p>
                ) : (
                  <p>{(weatherData.temp * 9/5) + 32} °F</p>
                )}
              </div>
              <Info name={"Country:"} param={weatherData.sys.country}></Info>
              <Info name={"Condition:"} param={weatherData.weather[0].description}></Info>
              <Info name={"Humidity:"} param={weatherData.main.humidity}></Info>
              <Info name={"Pressure:"} param={weatherData.main.pressure}></Info>
              <Info name={"Wind Speed:"} param={weatherData.wind.speed}></Info>
            </div>
            {weatherIcons[weatherData.weather[0].main]}
          </div>
        )
      ) : null}
    </div>
  );
};

export default Weather;
