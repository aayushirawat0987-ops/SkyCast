import { useState, useCallback } from 'react';
import { weatherService } from '../services/weatherService';

/**
 * Custom React hook for fetching and managing weather & forecast state
 */
export const useWeather = () => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await weatherService.getWeatherByCity(city);
      setData(weatherRes);
      const forecastRes = await weatherService.getForecast(city);
      setForecast(forecastRes);
    } catch (err) {
      setError(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, forecast, loading, error, fetchWeather };
};
