import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Weather.module.css';

// todo
// 1. setup fetch from API x
// 2. save data to state and render in UI x
// 3. setup form x
// 4. make fetch from API with form input x
// 5. validate input x
// 6. add icon x
// 7. adjust styling x

const WeatherInfo = ({ city, icon, temp }) => (
  <div
    style={{
      backgroundColor: 'darkcyan',
      marginTop: '1rem',
      marginBottom: '1rem',
      padding: '1rem 1rem 1.5rem',
      borderRadius: '20px',
      maxWidth: '20rem',
      minWidth: '15rem',
    }}
  >
    <h3 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>{city}</h3>
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      style={{ width: '50px' }}
    />
    <p style={{ color: 'white', margin: '0' }}>{temp} °C</p>
  </div>
);

const WeatherForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1.5rem' }}>
      <label htmlFor="city" className={styles.srOnly}>
        City
      </label>
      <input
        className={styles.textInput}
        type="text"
        placeholder="Enter City"
        aria-invalid={errors.city ? 'true' : 'false'}
        {...register('city', {
          required:
            'Input the city name of where you want to see the current weather.',
          maxLength: { value: 50, message: 'Max 50 characters.' },
          pattern: {
            value: /^[A-Öa-ö ]+$/i,
            message: 'Only latin letters are accepted.',
          },
        })}
      />
      {errors.city && <p role="alert">{errors.city.message}</p>}
      <input className={styles.Button} type="submit" value="Get Weather" />
    </form>
  );
};

const Weather = () => {
  const [weather, setWeather] = useState('');
  const [apiError, setApiError] = useState(false);

  const token = import.meta.env.VITE_API_TOKEN;

  const weatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`
      );
      const data = await response.json();
      setWeather({
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
      });
    } catch {
      setApiError(true);
    }
  };

  const onSubmit = (input) => weatherData(input.city);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <h2 style={{ marginBottom: '2rem' }}>How's the weather out there?</h2>
      {weather && (
        <WeatherInfo
          city={weather.city}
          icon={weather.icon}
          temp={weather.temp}
        />
      )}
      <WeatherForm onSubmit={onSubmit} />
      {apiError && <p>Sorry, the city could not be found.</p>}
    </div>
  );
};

export default Weather;
