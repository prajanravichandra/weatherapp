import React, { useState } from 'react';
import './weather.css';
import axios from 'axios';
import { WiDayThunderstorm,  WiSprinkle,  WiRain,  WiSnow,  WiSmoke,  WiDayHaze,  WiDust,  WiFog,  WiSandstorm,  WiVolcano,  WiStrongWind,  WiTornado,  WiDaySunny,  WiCloud} from 'react-icons/wi';
const weatherIcons = {
  Thunderstorm: <WiDayThunderstorm size={'100px'} />,
  Drizzle: <WiSprinkle size={'100px'} />,
  Rain: <WiRain size={'100px'} />,
  Snow: <WiSnow size={'100px'} />,
  Mist: <WiFog size={'100px'} />,
  Smoke: <WiSmoke size={'100px'} />,
  Haze: <WiDayHaze size={'100px'} />,
  Dust: <WiDust size={'100px'} />,
  Fog: <WiFog size={'100px'} />,
  Sand: <WiSandstorm size={'100px'} />,
  Ash: <WiVolcano size={'100px'} />,
  Squall: <WiStrongWind size={'100px'} />,
  Tornado: <WiTornado size={'100px'} />,
  Clear: <WiDaySunny size={'100px'} />,
  Clouds: <WiCloud size={'100px'} />
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
      <form onSubmit={handleSubmit} className='formm'>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
        />
        <button type="submit" className='formm'>Get Weather</button>
      </form>
      <button type="button" onClick={handleToggle}>Convert</button> 
      {weather && found && (
        <div>
          <h3>Weather in {weather.name}</h3>
          {toggle ? (
            <p>Temperature: {tem} °C</p>
          ) : (
            <p>Temperature: {(tem * 9/5) + 32} °F</p>
          )}
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Pressure: {weather.main.pressure}pascal </p>
          <p>Wind Speed: {weather.wind.speed}km/hr </p>
          {weatherIcons[weather.weather[0].main]}
        </div>
      )}
      {!found && (
        <div>
          <h1>NOT FOUND</h1>
        </div>
      )}
    </div>
  );
};
export default Weather;