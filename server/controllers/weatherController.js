const { fetchWeatherFromAPI, fetchWeatherByCoordsFromAPI } = require('../utils/openWeather');

/**
 * @desc    Get weather & forecast by city name
 * @route   GET /api/weather?city=London&units=metric
 * @access  Public
 */
const getWeatherByCity = async (req, res, next) => {
  try {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City name parameter is required (e.g. /api/weather?city=London)',
      });
    }

    const weatherData = await fetchWeatherFromAPI(city, units);
    return res.status(200).json({
      success: true,
      source: 'live_api',
      data: weatherData,
    });
  } catch (error) {
    if (error.message === 'API_KEY_MISSING') {
      return res.status(200).json({
        success: true,
        source: 'mock_fallback',
        warning: 'OPENWEATHER_API_KEY is not configured in server/.env. Displaying mock weather dataset.',
        data: null,
      });
    }

    const statusCode = error.statusCode || res.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || 'Error fetching weather data.',
    });
  }
};

/**
 * @desc    Get weather & forecast by geographic coordinates (lat, lon)
 * @route   GET /api/weather/coords?lat=...&lon=...&units=metric
 * @access  Public
 */
const getWeatherByCoords = async (req, res, next) => {
  try {
    const { lat, lon, units = 'metric' } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and Longitude parameters are required (e.g. /api/weather/coords?lat=40.71&lon=-74.00)',
      });
    }

    const weatherData = await fetchWeatherByCoordsFromAPI(lat, lon, units);
    return res.status(200).json({
      success: true,
      source: 'live_api_coords',
      data: weatherData,
    });
  } catch (error) {
    if (error.message === 'API_KEY_MISSING') {
      return res.status(200).json({
        success: true,
        source: 'mock_fallback',
        warning: 'OPENWEATHER_API_KEY is not configured in server/.env.',
        data: null,
      });
    }

    const statusCode = error.statusCode || res.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || 'Error fetching weather data for coordinates.',
    });
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoords,
};
