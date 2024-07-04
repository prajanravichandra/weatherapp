import React, { useState } from 'react';
import './weather.css';
import axios from 'axios';
import { 
  WiDayThunderstorm, WiSprinkle, WiRain, WiSnow, WiSmoke, 
  WiDayHaze, WiDust, WiFog, WiSandstorm, WiVolcano, WiStrongWind, 
  WiTornado, WiDaySunny, WiCloud 
} from 'react-icons/wi';

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
  const [weather, setWeather] = useState(null);
  const [found, setFound] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [tem, setTem] = useState(0);

  const fetchWeather = async () => {
    const apiKey = 'e5f5ad450f23df32cacdadf6971f6ab7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setTem(response.data.main.temp);
      setFound(true); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setFound(false);
      } else {
        console.error("Error fetching the weather data", error.message);
      }
      setWeather(null);
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
      {weather && (
        <div>
          <h3>Temperature in {weather.name}</h3>
          {found ? (
            <div className="info">
              <div >
                <b>Temperature:</b>
                {toggle ? (
                  <p>{tem} °C</p>
                ) : (
                  <p>{(tem * 9/5) + 32} °F</p>
                )}
              </div>
              <p><b>Country:</b><br /> {weather.sys.country}</p>
              <p><b>Condition:</b><br /> {weather.weather[0].description}</p>
              <p><b>Humidity:</b><br /> {weather.main.humidity} %</p>
              <p><b>Pressure:</b><br /> {weather.main.pressure} hPa</p>
              <p><b>Wind Speed:</b><br /> {weather.wind.speed} km/hr</p>
              <div>
              </div>
            </div>
          ) : (
            <div className="not-found">
              <h1>NOT FOUND</h1>
            </div>
          )}
          {weatherIcons[weather.weather[0].main]}
        </div>
      )}
    </div>
  );
};

export default Weather;
