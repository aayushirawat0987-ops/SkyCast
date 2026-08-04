/**
 * Comprehensive Mock Weather Dataset for SkyCast Frontend UI
 * Includes Indian cities, hill stations, districts, global hubs, and dynamic mock generator with full AQI & Geo metadata.
 */
export const mockCitiesData = {
  'Ranikhet': {
    name: 'Ranikhet',
    district: 'Almora',
    state: 'Uttarakhand',
    country: 'India',
    locationString: 'Ranikhet, Almora, Uttarakhand, India',
    temp: 21,
    feelsLike: 21,
    tempMin: 15,
    tempMax: 24,
    condition: 'Pleasant & Mountain Breeze',
    iconType: 'cloudy-sun',
    description: 'Crisp pine-scented mountain air with clear ridge views',
    humidity: 62,
    windSpeed: 10,
    windDirection: 'NNE',
    windGust: 16,
    pressure: 1016,
    uvIndex: 7,
    uvLevel: 'High',
    visibility: '10 km',
    dewPoint: 13,
    sunrise: '05:38 AM',
    sunset: '07:08 PM',
    sunProgress: 65,
    aqi: {
      value: 22,
      category: 'Good',
      status: 'Good',
      color: 'emerald',
      colorCode: '#10b981',
      pm25: 4.8,
      pm10: 10.2,
      co: 0.2,
      no2: 8.1,
      so2: 2.1,
      o3: 20.5,
    },
    hourly: [
      { time: 'NOW', temp: 21, icon: 'cloudy-sun', pop: '10%' },
      { time: '3 PM', temp: 24, icon: 'sun', pop: '5%' },
      { time: '6 PM', temp: 20, icon: 'cloudy-sun', pop: '15%' },
      { time: '9 PM', temp: 17, icon: 'moon', pop: '10%' },
      { time: '12 AM', temp: 16, icon: 'moon', pop: '5%' },
      { time: '3 AM', temp: 15, icon: 'moon', pop: '0%' },
      { time: '6 AM', temp: 17, icon: 'sun', pop: '5%' },
      { time: '9 AM', temp: 20, icon: 'sun', pop: '5%' },
      { time: '12 PM', temp: 23, icon: 'sun', pop: '10%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Pleasant & Clear', icon: 'cloudy-sun', minTemp: 15, maxTemp: 24, humidity: 62, windSpeed: 10, pop: '10%' },
      { day: 'Wed', condition: 'Sunny Skies', icon: 'sun', minTemp: 16, maxTemp: 25, humidity: 58, windSpeed: 12, pop: '5%' },
      { day: 'Thu', condition: 'Passing Clouds', icon: 'cloud', minTemp: 15, maxTemp: 23, humidity: 64, windSpeed: 11, pop: '15%' },
      { day: 'Fri', condition: 'Light Mist', icon: 'cloudy-sun', minTemp: 14, maxTemp: 22, humidity: 70, windSpeed: 14, pop: '25%' },
      { day: 'Sat', condition: 'Clear Sunshine', icon: 'sun', minTemp: 15, maxTemp: 24, humidity: 60, windSpeed: 10, pop: '5%' },
      { day: 'Sun', condition: 'Sunny Spells', icon: 'cloudy-sun', minTemp: 16, maxTemp: 25, humidity: 56, windSpeed: 9, pop: '10%' },
      { day: 'Mon', condition: 'Fresh Breeze', icon: 'wind', minTemp: 15, maxTemp: 23, humidity: 62, windSpeed: 12, pop: '10%' },
    ],
  },

  'Khatima': {
    name: 'Khatima',
    district: 'Udham Singh Nagar',
    state: 'Uttarakhand',
    country: 'India',
    locationString: 'Khatima, Udham Singh Nagar, Uttarakhand, India',
    temp: 28,
    feelsLike: 31,
    tempMin: 23,
    tempMax: 32,
    condition: 'Partly Sunny & Warm',
    iconType: 'cloudy-sun',
    description: 'Warm valley weather with gentle terai breezes',
    humidity: 72,
    windSpeed: 12,
    windDirection: 'ESE',
    windGust: 18,
    pressure: 1010,
    uvIndex: 8,
    uvLevel: 'Very High',
    visibility: '9 km',
    dewPoint: 22,
    sunrise: '05:36 AM',
    sunset: '07:06 PM',
    sunProgress: 68,
    aqi: {
      value: 48,
      category: 'Good',
      status: 'Good',
      color: 'emerald',
      colorCode: '#10b981',
      pm25: 11.2,
      pm10: 22.4,
      co: 0.5,
      no2: 15.0,
      so2: 4.0,
      o3: 28.0,
    },
    hourly: [
      { time: 'NOW', temp: 28, icon: 'cloudy-sun', pop: '15%' },
      { time: '3 PM', temp: 32, icon: 'sun', pop: '10%' },
      { time: '6 PM', temp: 29, icon: 'cloudy-sun', pop: '20%' },
      { time: '9 PM', temp: 26, icon: 'moon', pop: '10%' },
      { time: '12 AM', temp: 24, icon: 'moon', pop: '5%' },
      { time: '3 AM', temp: 23, icon: 'moon', pop: '0%' },
      { time: '6 AM', temp: 25, icon: 'cloudy-sun', pop: '10%' },
      { time: '9 AM', temp: 28, icon: 'sun', pop: '10%' },
      { time: '12 PM', temp: 31, icon: 'sun', pop: '15%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Partly Sunny', icon: 'cloudy-sun', minTemp: 23, maxTemp: 32, humidity: 72, windSpeed: 12, pop: '15%' },
      { day: 'Wed', condition: 'Warm & Clear', icon: 'sun', minTemp: 24, maxTemp: 33, humidity: 68, windSpeed: 14, pop: '10%' },
      { day: 'Thu', condition: 'Scattered Clouds', icon: 'cloud', minTemp: 23, maxTemp: 31, humidity: 74, windSpeed: 13, pop: '20%' },
      { day: 'Fri', condition: 'Light Rain Spells', icon: 'rain-light', minTemp: 22, maxTemp: 29, humidity: 80, windSpeed: 16, pop: '45%' },
      { day: 'Sat', condition: 'Clearing Up', icon: 'cloudy-sun', minTemp: 23, maxTemp: 31, humidity: 70, windSpeed: 12, pop: '20%' },
      { day: 'Sun', condition: 'Sunny', icon: 'sun', minTemp: 24, maxTemp: 32, humidity: 65, windSpeed: 11, pop: '5%' },
      { day: 'Mon', condition: 'Pleasant Breeze', icon: 'wind', minTemp: 23, maxTemp: 31, humidity: 68, windSpeed: 13, pop: '10%' },
    ],
  },

  'Mumbai': {
    name: 'Mumbai',
    district: 'Mumbai City',
    state: 'Maharashtra',
    country: 'India',
    locationString: 'Mumbai, Maharashtra, India',
    temp: 31,
    feelsLike: 36,
    tempMin: 27,
    tempMax: 33,
    condition: 'Humid & Partly Cloudy',
    iconType: 'cloudy-sun',
    description: 'Warm coastal humidity with gentle sea breezes',
    humidity: 79,
    windSpeed: 16,
    windDirection: 'WSW',
    windGust: 24,
    pressure: 1009,
    uvIndex: 9,
    uvLevel: 'Very High',
    visibility: '9 km',
    dewPoint: 25,
    sunrise: '06:12 AM',
    sunset: '07:18 PM',
    sunProgress: 70,
    aqi: {
      value: 68,
      category: 'Moderate',
      status: 'Moderate',
      color: 'amber',
      colorCode: '#f59e0b',
      pm25: 18.5,
      pm10: 34.2,
      co: 0.8,
      no2: 21.0,
      so2: 7.4,
      o3: 35.8,
    },
    hourly: [
      { time: 'NOW', temp: 31, icon: 'cloudy-sun', pop: '20%' },
      { time: '3 PM', temp: 33, icon: 'sun', pop: '15%' },
      { time: '6 PM', temp: 30, icon: 'cloudy-sun', pop: '25%' },
      { time: '9 PM', temp: 28, icon: 'cloudy-night', pop: '30%' },
      { time: '12 AM', temp: 27, icon: 'moon', pop: '15%' },
      { time: '3 AM', temp: 27, icon: 'moon', pop: '10%' },
      { time: '6 AM', temp: 28, icon: 'cloudy-sun', pop: '15%' },
      { time: '9 AM', temp: 30, icon: 'sun', pop: '10%' },
      { time: '12 PM', temp: 32, icon: 'sun', pop: '15%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Humid & Partly Cloudy', icon: 'cloudy-sun', minTemp: 27, maxTemp: 33, humidity: 79, windSpeed: 16, pop: '20%' },
      { day: 'Wed', condition: 'Passing Showers', icon: 'rain-light', minTemp: 26, maxTemp: 31, humidity: 84, windSpeed: 20, pop: '60%' },
      { day: 'Thu', condition: 'Heavy Rain', icon: 'rain-heavy', minTemp: 25, maxTemp: 29, humidity: 90, windSpeed: 26, pop: '85%' },
      { day: 'Fri', condition: 'Thunderstorm', icon: 'thunderstorm', minTemp: 25, maxTemp: 30, humidity: 88, windSpeed: 22, pop: '75%' },
      { day: 'Sat', condition: 'Scattered Showers', icon: 'rain-light', minTemp: 26, maxTemp: 31, humidity: 82, windSpeed: 18, pop: '45%' },
      { day: 'Sun', condition: 'Partly Cloudy', icon: 'cloudy-sun', minTemp: 27, maxTemp: 32, humidity: 76, windSpeed: 15, pop: '20%' },
      { day: 'Mon', condition: 'Sunny & Warm', icon: 'sun', minTemp: 27, maxTemp: 33, humidity: 74, windSpeed: 14, pop: '10%' },
    ],
  },

  'Delhi': {
    name: 'Delhi',
    district: 'New Delhi',
    state: 'Delhi NCR',
    country: 'India',
    locationString: 'Delhi, National Capital Territory, India',
    temp: 35,
    feelsLike: 39,
    tempMin: 28,
    tempMax: 38,
    condition: 'Hazy Sunshine',
    iconType: 'sun',
    description: 'Hot with hazy sunshine and dry thermal winds',
    humidity: 48,
    windSpeed: 14,
    windDirection: 'NW',
    windGust: 22,
    pressure: 1004,
    uvIndex: 10,
    uvLevel: 'Very High',
    visibility: '6 km',
    dewPoint: 21,
    sunrise: '05:42 AM',
    sunset: '07:15 PM',
    sunProgress: 75,
    aqi: {
      value: 175,
      category: 'Unhealthy',
      status: 'Unhealthy',
      color: 'rose',
      colorCode: '#ef4444',
      pm25: 62.4,
      pm10: 118.0,
      co: 1.8,
      no2: 48.2,
      so2: 15.6,
      o3: 65.1,
    },
    hourly: [
      { time: 'NOW', temp: 35, icon: 'sun', pop: '5%' },
      { time: '3 PM', temp: 38, icon: 'sun', pop: '0%' },
      { time: '6 PM', temp: 34, icon: 'sun', pop: '5%' },
      { time: '9 PM', temp: 31, icon: 'moon', pop: '5%' },
      { time: '12 AM', temp: 29, icon: 'moon', pop: '0%' },
      { time: '3 AM', temp: 28, icon: 'moon', pop: '0%' },
      { time: '6 AM', temp: 30, icon: 'sun', pop: '5%' },
      { time: '9 AM', temp: 33, icon: 'sun', pop: '5%' },
      { time: '12 PM', temp: 37, icon: 'sun', pop: '0%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Hazy Sunshine', icon: 'sun', minTemp: 28, maxTemp: 38, humidity: 48, windSpeed: 14, pop: '5%' },
      { day: 'Wed', condition: 'Sunny & Hot', icon: 'sun', minTemp: 29, maxTemp: 39, humidity: 44, windSpeed: 12, pop: '0%' },
      { day: 'Thu', condition: 'Hot Breeze', icon: 'wind', minTemp: 30, maxTemp: 40, humidity: 42, windSpeed: 18, pop: '0%' },
      { day: 'Fri', condition: 'Dusty Skies', icon: 'cloud', minTemp: 28, maxTemp: 37, humidity: 55, windSpeed: 20, pop: '15%' },
      { day: 'Sat', condition: 'Light Rain Spells', icon: 'rain-light', minTemp: 27, maxTemp: 34, humidity: 68, windSpeed: 16, pop: '40%' },
      { day: 'Sun', condition: 'Partly Cloudy', icon: 'cloudy-sun', minTemp: 27, maxTemp: 35, humidity: 62, windSpeed: 15, pop: '20%' },
      { day: 'Mon', condition: 'Clear Sunshine', icon: 'sun', minTemp: 28, maxTemp: 37, humidity: 50, windSpeed: 13, pop: '5%' },
    ],
  },

  'Bengaluru': {
    name: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    country: 'India',
    locationString: 'Bengaluru, Karnataka, India',
    temp: 26,
    feelsLike: 26,
    tempMin: 19,
    tempMax: 28,
    condition: 'Pleasant & Breezy',
    iconType: 'cloudy-sun',
    description: 'Mild weather with pleasant plateau breezes',
    humidity: 64,
    windSpeed: 18,
    windDirection: 'WSW',
    windGust: 28,
    pressure: 1014,
    uvIndex: 7,
    uvLevel: 'High',
    visibility: '10 km',
    dewPoint: 18,
    sunrise: '06:08 AM',
    sunset: '06:48 PM',
    sunProgress: 65,
    aqi: {
      value: 32,
      category: 'Good',
      status: 'Good',
      color: 'emerald',
      colorCode: '#10b981',
      pm25: 7.2,
      pm10: 14.8,
      co: 0.3,
      no2: 10.5,
      so2: 3.2,
      o3: 22.0,
    },
    hourly: [
      { time: 'NOW', temp: 26, icon: 'cloudy-sun', pop: '10%' },
      { time: '3 PM', temp: 28, icon: 'cloudy-sun', pop: '15%' },
      { time: '6 PM', temp: 24, icon: 'rain-light', pop: '30%' },
      { time: '9 PM', temp: 22, icon: 'cloudy-night', pop: '20%' },
      { time: '12 AM', temp: 20, icon: 'moon', pop: '10%' },
      { time: '3 AM', temp: 19, icon: 'moon', pop: '5%' },
      { time: '6 AM', temp: 21, icon: 'cloudy-sun', pop: '10%' },
      { time: '9 AM', temp: 24, icon: 'sun', pop: '5%' },
      { time: '12 PM', temp: 27, icon: 'cloudy-sun', pop: '10%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Pleasant & Breezy', icon: 'cloudy-sun', minTemp: 19, maxTemp: 28, humidity: 64, windSpeed: 18, pop: '10%' },
      { day: 'Wed', condition: 'Scattered Showers', icon: 'rain-light', minTemp: 19, maxTemp: 27, humidity: 72, windSpeed: 20, pop: '50%' },
      { day: 'Thu', condition: 'Breezy & Cool', icon: 'wind', minTemp: 18, maxTemp: 26, humidity: 68, windSpeed: 22, pop: '25%' },
      { day: 'Fri', condition: 'Sunny Spells', icon: 'cloudy-sun', minTemp: 19, maxTemp: 28, humidity: 60, windSpeed: 16, pop: '15%' },
      { day: 'Sat', condition: 'Clear Skies', icon: 'sun', minTemp: 19, maxTemp: 29, humidity: 55, windSpeed: 14, pop: '5%' },
      { day: 'Sun', condition: 'Partly Cloudy', icon: 'cloudy-sun', minTemp: 20, maxTemp: 28, humidity: 62, windSpeed: 15, pop: '10%' },
      { day: 'Mon', condition: 'Mild Rain', icon: 'rain-light', minTemp: 19, maxTemp: 27, humidity: 70, windSpeed: 17, pop: '35%' },
    ],
  },

  'London': {
    name: 'London',
    district: 'Greater London',
    state: 'England',
    country: 'United Kingdom',
    locationString: 'London, England, United Kingdom',
    temp: 17,
    feelsLike: 16,
    tempMin: 12,
    tempMax: 19,
    condition: 'Light Rain',
    iconType: 'rain-light',
    description: 'Passing light rain with damp breeze',
    humidity: 78,
    windSpeed: 21,
    windDirection: 'WNW',
    windGust: 34,
    pressure: 1008,
    uvIndex: 3,
    uvLevel: 'Moderate',
    visibility: '8 km',
    dewPoint: 13,
    sunrise: '05:32 AM',
    sunset: '08:45 PM',
    sunProgress: 50,
    aqi: {
      value: 24,
      category: 'Good',
      status: 'Good',
      color: 'emerald',
      colorCode: '#10b981',
      pm25: 5.1,
      pm10: 11.4,
      co: 0.2,
      no2: 18.2,
      so2: 2.8,
      o3: 21.0,
    },
    hourly: [
      { time: 'NOW', temp: 17, icon: 'rain-light', pop: '70%' },
      { time: '3 PM', temp: 18, icon: 'rain-light', pop: '60%' },
      { time: '6 PM', temp: 17, icon: 'cloudy-sun', pop: '35%' },
      { time: '9 PM', temp: 15, icon: 'cloudy-night', pop: '20%' },
      { time: '12 AM', temp: 13, icon: 'moon', pop: '15%' },
      { time: '3 AM', temp: 12, icon: 'moon', pop: '10%' },
      { time: '6 AM', temp: 13, icon: 'cloudy-sun', pop: '15%' },
      { time: '9 AM', temp: 16, icon: 'sun', pop: '5%' },
      { time: '12 PM', temp: 18, icon: 'sun', pop: '0%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Light Rain', icon: 'rain-light', minTemp: 12, maxTemp: 19, humidity: 78, windSpeed: 21, pop: '70%' },
      { day: 'Wed', condition: 'Sunny Spells', icon: 'cloudy-sun', minTemp: 11, maxTemp: 20, humidity: 65, windSpeed: 16, pop: '20%' },
      { day: 'Thu', condition: 'Mostly Sunny', icon: 'sun', minTemp: 13, maxTemp: 22, humidity: 58, windSpeed: 14, pop: '10%' },
      { day: 'Fri', condition: 'Overcast', icon: 'cloud', minTemp: 14, maxTemp: 18, humidity: 72, windSpeed: 19, pop: '35%' },
      { day: 'Sat', condition: 'Moderate Rain', icon: 'rain-heavy', minTemp: 12, maxTemp: 16, humidity: 85, windSpeed: 26, pop: '80%' },
      { day: 'Sun', condition: 'Breezy & Cool', icon: 'wind', minTemp: 10, maxTemp: 17, humidity: 62, windSpeed: 28, pop: '30%' },
      { day: 'Mon', condition: 'Partly Cloudy', icon: 'cloudy-sun', minTemp: 11, maxTemp: 19, humidity: 64, windSpeed: 15, pop: '15%' },
    ],
  },

  'Tokyo': {
    name: 'Tokyo',
    district: 'Kanto',
    state: 'Tokyo Metropolis',
    country: 'Japan',
    locationString: 'Tokyo, Kanto, Japan',
    temp: 29,
    feelsLike: 32,
    tempMin: 23,
    tempMax: 31,
    condition: 'Sunny & Humid',
    iconType: 'sun',
    description: 'Bright sunshine with high humidity levels',
    humidity: 71,
    windSpeed: 10,
    windDirection: 'SE',
    windGust: 18,
    pressure: 1010,
    uvIndex: 8,
    uvLevel: 'Very High',
    visibility: '10 km',
    dewPoint: 22,
    sunrise: '04:48 AM',
    sunset: '06:58 PM',
    sunProgress: 80,
    aqi: {
      value: 54,
      category: 'Moderate',
      status: 'Moderate',
      color: 'amber',
      colorCode: '#f59e0b',
      pm25: 14.8,
      pm10: 28.1,
      co: 0.5,
      no2: 24.6,
      so2: 4.1,
      o3: 42.0,
    },
    hourly: [
      { time: 'NOW', temp: 29, icon: 'sun', pop: '0%' },
      { time: '3 PM', temp: 31, icon: 'sun', pop: '5%' },
      { time: '6 PM', temp: 28, icon: 'sun', pop: '10%' },
      { time: '9 PM', temp: 26, icon: 'moon', pop: '5%' },
      { time: '12 AM', temp: 24, icon: 'moon', pop: '0%' },
      { time: '3 AM', temp: 23, icon: 'moon', pop: '0%' },
      { time: '6 AM', temp: 25, icon: 'sun', pop: '5%' },
      { time: '9 AM', temp: 28, icon: 'sun', pop: '5%' },
      { time: '12 PM', temp: 30, icon: 'sun', pop: '10%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Sunny & Humid', icon: 'sun', minTemp: 23, maxTemp: 31, humidity: 71, windSpeed: 10, pop: '5%' },
      { day: 'Wed', condition: 'Hot & Clear', icon: 'sun', minTemp: 24, maxTemp: 33, humidity: 68, windSpeed: 12, pop: '0%' },
      { day: 'Thu', condition: 'Humid Heat', icon: 'sun', minTemp: 25, maxTemp: 34, humidity: 74, windSpeed: 11, pop: '10%' },
      { day: 'Fri', condition: 'Evening Storms', icon: 'thunderstorm', minTemp: 23, maxTemp: 30, humidity: 82, windSpeed: 22, pop: '70%' },
      { day: 'Sat', condition: 'Heavy Rain', icon: 'rain-heavy', minTemp: 21, maxTemp: 26, humidity: 90, windSpeed: 25, pop: '90%' },
      { day: 'Sun', condition: 'Clearing Up', icon: 'cloudy-sun', minTemp: 22, maxTemp: 28, humidity: 75, windSpeed: 16, pop: '30%' },
      { day: 'Mon', condition: 'Sunny', icon: 'sun', minTemp: 23, maxTemp: 30, humidity: 65, windSpeed: 13, pop: '5%' },
    ],
  },
};

export const defaultCityData = mockCitiesData['Mumbai'];

/**
 * Dynamic Geocoding lookup helper for any town, district, state, or country worldwide
 */
export const geocodeGlobalLocation = async (query) => {
  if (!query || !query.trim()) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query.trim())}&format=json&addressdetails=1&limit=1`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SkyCastWeatherApp/1.0' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const addr = item.address || {};
        const placeName =
          addr.city ||
          addr.town ||
          addr.village ||
          addr.hamlet ||
          addr.suburb ||
          addr.county ||
          item.name ||
          query;

        const district = addr.county || addr.district || addr.state_district || '';
        const state = addr.state || addr.region || '';
        const country = addr.country || addr.country_code?.toUpperCase() || '';

        let parts = [placeName];
        if (district && district.toLowerCase() !== placeName.toLowerCase()) {
          parts.push(district);
        }
        if (state && state.toLowerCase() !== placeName.toLowerCase() && state.toLowerCase() !== district.toLowerCase()) {
          parts.push(state);
        }
        if (country) {
          parts.push(country);
        }

        return {
          name: placeName,
          district,
          state,
          country: parts.slice(1).join(', '),
          locationString: parts.join(', '),
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        };
      }
    }
  } catch (err) {
    console.warn('Geocode lookup error:', err);
  }
  return null;
};

/**
 * Generate dynamic mock weather payload for any searched city/district/state
 */
export const getMockWeatherData = (cityName, geoInfo = null) => {
  if (!cityName) return defaultCityData;

  const normalizedKey = Object.keys(mockCitiesData).find(
    (key) => key.toLowerCase() === cityName.trim().toLowerCase()
  );

  if (normalizedKey && !geoInfo) {
    return mockCitiesData[normalizedKey];
  }

  const cleanName = geoInfo?.name || cityName.trim().charAt(0).toUpperCase() + cityName.trim().slice(1);
  const locationCountry = geoInfo?.country || 'India';

  return {
    name: cleanName,
    country: locationCountry,
    temp: 27,
    feelsLike: 29,
    tempMin: 22,
    tempMax: 30,
    condition: 'Partly Sunny',
    iconType: 'cloudy-sun',
    description: `Partly sunny conditions in ${cleanName}${geoInfo?.state ? ', ' + geoInfo.state : ''}`,
    humidity: 65,
    windSpeed: 15,
    windDirection: 'SW',
    windGust: 22,
    pressure: 1012,
    uvIndex: 7,
    uvLevel: 'High',
    visibility: '10 km',
    dewPoint: 19,
    sunrise: '06:00 AM',
    sunset: '07:10 PM',
    sunProgress: 65,
    aqi: {
      value: 45,
      category: 'Good',
      status: 'Good',
      color: 'emerald',
      colorCode: '#10b981',
      pm25: 10.2,
      pm10: 20.4,
      co: 0.4,
      no2: 14.1,
      so2: 4.5,
      o3: 30.0,
    },
    hourly: [
      { time: 'NOW', temp: 27, icon: 'cloudy-sun', pop: '10%' },
      { time: '3 PM', temp: 29, icon: 'sun', pop: '5%' },
      { time: '6 PM', temp: 28, icon: 'cloudy-sun', pop: '15%' },
      { time: '9 PM', temp: 25, icon: 'moon', pop: '10%' },
      { time: '12 AM', temp: 23, icon: 'moon', pop: '5%' },
      { time: '3 AM', temp: 22, icon: 'moon', pop: '0%' },
      { time: '6 AM', temp: 24, icon: 'cloudy-sun', pop: '5%' },
      { time: '9 AM', temp: 26, icon: 'sun', pop: '10%' },
      { time: '12 PM', temp: 28, icon: 'sun', pop: '5%' },
    ],
    weekly: [
      { day: 'Today', condition: 'Partly Sunny', icon: 'cloudy-sun', minTemp: 22, maxTemp: 30, humidity: 65, windSpeed: 15, pop: '10%' },
      { day: 'Wed', condition: 'Mostly Sunny', icon: 'sun', minTemp: 23, maxTemp: 31, humidity: 60, windSpeed: 14, pop: '5%' },
      { day: 'Thu', condition: 'Passing Clouds', icon: 'cloud', minTemp: 22, maxTemp: 29, humidity: 68, windSpeed: 16, pop: '20%' },
      { day: 'Fri', condition: 'Light Rain', icon: 'rain-light', minTemp: 21, maxTemp: 27, humidity: 78, windSpeed: 18, pop: '55%' },
      { day: 'Sat', condition: 'Clearing Up', icon: 'cloudy-sun', minTemp: 22, maxTemp: 28, humidity: 64, windSpeed: 15, pop: '25%' },
      { day: 'Sun', condition: 'Sunny', icon: 'sun', minTemp: 23, maxTemp: 30, humidity: 58, windSpeed: 12, pop: '5%' },
      { day: 'Mon', condition: 'Pleasant', icon: 'cloudy-sun', minTemp: 22, maxTemp: 29, humidity: 62, windSpeed: 14, pop: '10%' },
    ],
  };
};
