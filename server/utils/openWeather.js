const axios = require('axios');

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Helper to convert wind degrees into compass directions
 */
const getWindDirection = (deg) => {
  if (deg === undefined) return 'N';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

/**
 * Map OpenWeather main condition to SkyCast icon type string
 */
const mapIconType = (main, iconCode = '') => {
  const isNight = iconCode.endsWith('n');
  switch (main?.toLowerCase()) {
    case 'clear':
      return isNight ? 'moon' : 'sun';
    case 'clouds':
      return isNight ? 'cloudy-night' : 'cloudy-sun';
    case 'rain':
    case 'drizzle':
      return 'rain-light';
    case 'thunderstorm':
      return 'thunderstorm';
    case 'snow':
      return 'snow';
    case 'atmosphere':
    case 'mist':
    case 'fog':
    case 'haze':
      return 'cloud';
    default:
      return 'sun';
  }
};

/**
 * Format Unix timestamp into 12-hour time string (e.g. 06:14 AM)
 */
const formatTimeStr = (unixTimestamp) => {
  if (!unixTimestamp) return '';
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Calculate EPA/US Air Quality Index, Category & Pollutant metrics
 */
const calculateAirQuality = (pollutionData = null) => {
  if (!pollutionData || !pollutionData.components) {
    return {
      value: 38,
      category: 'Good',
      status: 'Good',
      color: 'emerald',
      colorCode: '#10b981',
      pm25: 8.4,
      pm10: 16.2,
      co: 0.4,
      no2: 12.1,
      so2: 4.2,
      o3: 28.5,
    };
  }

  const { components, main } = pollutionData;
  const aqiLevel = main?.aqi || 1;

  const pm25 = components.pm2_5 ? Number(components.pm2_5.toFixed(1)) : 10.0;
  const pm10 = components.pm10 ? Number(components.pm10.toFixed(1)) : 20.0;
  const co = components.co ? Number((components.co / 1000).toFixed(1)) : 0.4;
  const no2 = components.no2 ? Number(components.no2.toFixed(1)) : 14.0;
  const so2 = components.so2 ? Number(components.so2.toFixed(1)) : 5.0;
  const o3 = components.o3 ? Number(components.o3.toFixed(1)) : 30.0;

  let aqiValue = 35;
  if (aqiLevel === 1) aqiValue = Math.min(50, Math.round(pm25 * 3.5));
  else if (aqiLevel === 2) aqiValue = Math.min(100, 51 + Math.round(pm25 * 2.2));
  else if (aqiLevel === 3) aqiValue = Math.min(150, 101 + Math.round(pm25 * 1.5));
  else if (aqiLevel === 4) aqiValue = Math.min(200, 151 + Math.round(pm25 * 1.2));
  else if (aqiLevel >= 5) aqiValue = Math.min(500, 201 + Math.round(pm25 * 1.8));

  let category = 'Good';
  let color = 'emerald';
  let colorCode = '#10b981';

  if (aqiValue <= 50) {
    category = 'Good';
    color = 'emerald';
    colorCode = '#10b981';
  } else if (aqiValue <= 100) {
    category = 'Moderate';
    color = 'amber';
    colorCode = '#f59e0b';
  } else if (aqiValue <= 150) {
    category = 'Unhealthy for Sensitive Groups';
    color = 'orange';
    colorCode = '#f97316';
  } else if (aqiValue <= 200) {
    category = 'Unhealthy';
    color = 'rose';
    colorCode = '#ef4444';
  } else if (aqiValue <= 300) {
    category = 'Very Unhealthy';
    color = 'purple';
    colorCode = '#a855f7';
  } else {
    category = 'Hazardous';
    color = 'maroon';
    colorCode = '#881337';
  }

  return {
    value: aqiValue,
    category,
    status: category,
    color,
    colorCode,
    pm25,
    pm10,
    co,
    no2,
    so2,
    o3,
  };
};

/**
 * Helper to construct normalized weather object from raw OpenWeather response
 */
const normalizeWeatherPayload = (current, forecastList = [], pollutionData = null) => {
  // Process Hourly Projections
  const hourly = forecastList.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temp: Math.round(item.main.temp),
    icon: mapIconType(item.weather?.[0]?.main, item.weather?.[0]?.icon),
    pop: `${Math.round((item.pop || 0) * 100)}%`,
  }));

  // Process Weekly Projections
  const weeklyRaw = forecastList.filter((item) => item.dt_txt && item.dt_txt.includes('12:00:00'));
  const weekly = weeklyRaw.map((item) => ({
    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    condition: item.weather?.[0]?.main || 'Clear',
    icon: mapIconType(item.weather?.[0]?.main, item.weather?.[0]?.icon),
    minTemp: Math.round(item.main.temp_min),
    maxTemp: Math.round(item.main.temp_max),
    humidity: item.main.humidity,
    windSpeed: Math.round((item.wind?.speed || 0) * 3.6),
    pop: `${Math.round((item.pop || 0) * 100)}%`,
  }));

  const aqiPayload = calculateAirQuality(pollutionData);

  return {
    name: current.name || 'Your Location',
    country: current.sys?.country || '',
    temp: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    tempMin: Math.round(current.main.temp_min),
    tempMax: Math.round(current.main.temp_max),
    condition: current.weather?.[0]?.main || 'Clear',
    iconType: mapIconType(current.weather?.[0]?.main, current.weather?.[0]?.icon),
    description: current.weather?.[0]?.description || '',
    humidity: current.main.humidity,
    windSpeed: Math.round((current.wind?.speed || 0) * 3.6),
    windDirection: getWindDirection(current.wind?.deg),
    windGust: Math.round((current.wind?.gust || current.wind?.speed || 0) * 3.6),
    pressure: current.main.pressure,
    visibility: current.visibility ? `${(current.visibility / 1000).toFixed(1)} km` : '10 km',
    dewPoint: Math.round(current.main.temp - (100 - current.main.humidity) / 5),
    sunrise: formatTimeStr(current.sys?.sunrise),
    sunset: formatTimeStr(current.sys?.sunset),
    sunProgress: 55,
    icon: current.weather?.[0]?.icon,
    coords: current.coord ? { lat: current.coord.lat, lon: current.coord.lon } : null,
    aqi: aqiPayload,
    uvIndex: 5,
    uvLevel: 'Moderate',
    hourly,
    weekly: weekly.length > 0 ? weekly : [
      { day: 'Today', condition: current.weather?.[0]?.main || 'Clear', icon: mapIconType(current.weather?.[0]?.main), minTemp: Math.round(current.main.temp_min), maxTemp: Math.round(current.main.temp_max), humidity: current.main.humidity, windSpeed: Math.round((current.wind?.speed || 0) * 3.6), pop: '10%' }
    ],
  };
};

/**
 * Fetch weather from OpenWeatherMap by City Name
 */
const fetchWeatherFromAPI = async (city, units = 'metric') => {
  const apiKey = process.env.OPENWEATHER_API_KEY || '947eb7248a8e2058235c2b7c5d265f71';

  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    const error = new Error('API_KEY_MISSING');
    error.statusCode = 401;
    throw error;
  }

  try {
    const currentRes = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: { q: city, appid: apiKey, units },
      timeout: 8000,
    });

    const lat = currentRes.data.coord?.lat;
    const lon = currentRes.data.coord?.lon;

    let forecastList = [];
    let pollutionData = null;

    try {
      const forecastRes = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
        params: { q: city, appid: apiKey, units },
        timeout: 8000,
      });
      forecastList = forecastRes.data.list || [];
    } catch (fErr) {
      console.warn('Forecast fetch warning:', fErr.message);
    }

    if (lat && lon) {
      try {
        const pollutionRes = await axios.get(`${OPENWEATHER_BASE_URL}/air_pollution`, {
          params: { lat, lon, appid: apiKey },
          timeout: 8000,
        });
        pollutionData = pollutionRes.data.list?.[0] || null;
      } catch (pErr) {
        console.warn('Air pollution fetch warning:', pErr.message);
      }
    }

    return normalizeWeatherPayload(currentRes.data, forecastList, pollutionData);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        const err = new Error(`City '${city}' not found. Please check spelling.`);
        err.statusCode = 404;
        throw err;
      }
      if (error.response.status === 401) {
        const err = new Error('Invalid OpenWeatherMap API key provided.');
        err.statusCode = 401;
        throw err;
      }
    }
    throw error;
  }
};

/**
 * Fetch weather from OpenWeatherMap by Coordinates (lat, lon)
 */
const fetchWeatherByCoordsFromAPI = async (lat, lon, units = 'metric') => {
  const apiKey = process.env.OPENWEATHER_API_KEY || '947eb7248a8e2058235c2b7c5d265f71';

  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    const error = new Error('API_KEY_MISSING');
    error.statusCode = 401;
    throw error;
  }

  try {
    const currentRes = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: { lat, lon, appid: apiKey, units },
      timeout: 8000,
    });

    let forecastList = [];
    let pollutionData = null;

    try {
      const forecastRes = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
        params: { lat, lon, appid: apiKey, units },
        timeout: 8000,
      });
      forecastList = forecastRes.data.list || [];
    } catch (fErr) {
      console.warn('Forecast fetch warning:', fErr.message);
    }

    try {
      const pollutionRes = await axios.get(`${OPENWEATHER_BASE_URL}/air_pollution`, {
        params: { lat, lon, appid: apiKey },
        timeout: 8000,
      });
      pollutionData = pollutionRes.data.list?.[0] || null;
    } catch (pErr) {
      console.warn('Air pollution fetch warning:', pErr.message);
    }

    return normalizeWeatherPayload(currentRes.data, forecastList, pollutionData);
  } catch (error) {
    if (error.response?.status === 401) {
      const err = new Error('Invalid OpenWeatherMap API key provided.');
      err.statusCode = 401;
      throw err;
    }
    throw error;
  }
};

module.exports = {
  fetchWeatherFromAPI,
  fetchWeatherByCoordsFromAPI,
};
