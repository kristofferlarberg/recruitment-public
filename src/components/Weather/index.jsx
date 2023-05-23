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
// 7. adjust styling

const Weather = () => {
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [apiError, setApiError] = useState(false);
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
          setWeather({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
          });
        } catch {
          setApiError(true);
        }
      }
    };
    weatherData();
  }, [city]);

  const onSubmit = (input) => setCity(input.city);

  return (
    <div>
      <h2>How's the weather out there?</h2>
      {weather && (
        <>
          <h3>{weather.city}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            style={{ width: '50px' }}
          />
          <p>{weather.temp} °C</p>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {apiError && <p>Sorry, the city could not be found.</p>}
        <input className={styles.Button} type="submit" value="Get Weather" />
      </form>
    </div>
  );
};

export default Weather;
