import React, { useEffect } from 'react';
import styles from './Weather.module.css';

// todo
// 1. setup fetch from API
// 2. save data to state and render in UI
// 3. setup form
// 4. make fetch from API with form input
// 5. add icon and styling

const Weather = () => {
  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const weatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${token}&units=metric`
        );
        const data = await response.json();
        console.log(data.weather[0].main);
      } catch {
        console.log('Data not found');
      }
    };
    weatherData();
  });

  return (
    <div>
      <h2>How's the weather out there?</h2>
      <form>
        <input
          type="text"
          placeholder="Enter City"
          maxLength={50}
          className={styles.textInput}
        />
        <button className={styles.Button} type="submit">
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default Weather;
