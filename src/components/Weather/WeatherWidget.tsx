import React, { useEffect, useState } from 'react';

interface WeatherData {
  name: string;
  temp: number;
  icon: string;
  description: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '190915d2b2de649d87b68a4ccc76dfca'; // replace with yours
        const city = 'Ohrid'; // or any default
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          description: data.weather[0].main,
          name: data.name
        });
      } catch (err) {
        console.error('Weather error:', err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-widget">
      {weather ? (
        <>
          <p>{weather.name}</p>
          <img src={weather.icon} alt={weather.description} />
          <span>{weather.temp}°C</span>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default WeatherWidget;
