import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Weather.module.css';

// todo
// 1. setup fetch from API
// 2. save data to state and render in UI
// 3. setup form
// 4. make fetch from API with form input
// 5. validate input
// 6. add contitional copy based on weather
// 7. add icon and styling

const Weather = () => {
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const weatherData = async () => {
      if (city) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`
          );
          const data = await response.json();
          setWeather(data.weather[0].main);
        } catch {
          console.log('Data not found');
        }
      }
    };
    weatherData();
  }, [city]);

  const onSubmit = (input) => setCity(input.city);

  console.log('errors', errors);

  return (
    <div>
      <h2>How's the weather out there?</h2>
      {weather && (
        <p>
          The weather in {city[0].toUpperCase() + city.slice(1)} is{' '}
          {weather.toLowerCase()}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Enter City"
          {...register('city', { required: true, maxLength: 50 })}
        />
        <input className={styles.Button} type="submit" value="Get Weather" />
      </form>
    </div>
  );
};

export default Weather;
