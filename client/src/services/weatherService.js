import api from './api';

/**
 * Service for fetching weather data via Express backend
 */
export const weatherService = {
  /**
   * Get weather for a given city
   * @param {string} city City query name
   * @param {string} unit 'metric' or 'imperial'
   */
  getWeatherByCity: async (city, unit = 'metric') => {
    return api.get(`/weather?city=${encodeURIComponent(city)}&units=${unit}`);
  },

  /**
   * Get weather for geographic coordinates (lat, lon)
   * @param {number} lat Latitude
   * @param {number} lon Longitude
   * @param {string} unit 'metric' or 'imperial'
   */
  getWeatherByCoords: async (lat, lon, unit = 'metric') => {
    return api.get(`/weather/coords?lat=${lat}&lon=${lon}&units=${unit}`);
  },
};
