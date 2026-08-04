import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weatherService';
import { getMockWeatherData, defaultCityData, geocodeGlobalLocation } from '../data/mockWeatherData';
import { useGeolocation } from '../hooks/useGeolocation';

const WeatherContext = createContext();

/**
 * Free Reverse Geocode helper to resolve City, State, Country from lat/lon
 */
const reverseGeocode = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || 'Your Location';
      const country = data.countryName || data.countryCode || 'India';
      const state = data.principalSubdivision || '';
      return { city, country, state };
    }
  } catch (err) {
    console.warn('Reverse geocoding error:', err);
  }
  return null;
};

/**
 * Weather Context Provider managing Dual Dashboards:
 * - Current Location Dashboard (auto-detected via Browser Geolocation + Reverse Geocoding)
 * - Searched City Dashboard (populated on search with full District, State, Country metadata)
 */
export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState('metric'); // 'metric' (°C) or 'imperial' (°F)

  // Current Location Dashboard State
  const [userLocationWeather, setUserLocationWeather] = useState(null);
  const [userLocationLoading, setUserLocationLoading] = useState(false);
  const [userLocationError, setUserLocationError] = useState(null);
  const [userCoords, setUserCoords] = useState(null);

  // Searched City Dashboard State
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedCityWeather, setSearchedCityWeather] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchWarning, setSearchWarning] = useState(null);

  // Active Dashboard View ('searched' or 'location' or 'both')
  const [activeDashboardTab, setActiveDashboardTab] = useState('location');

  const { requestLocation, permissionDenied } = useGeolocation();

  // Fetch weather by Coordinates for Current Location Dashboard
  const fetchCurrentLocationWeather = useCallback(async (lat, lon, selectedUnit) => {
    setUserLocationLoading(true);
    setUserLocationError(null);

    // Resolve exact location name using reverse geocoding
    const geoInfo = await reverseGeocode(lat, lon);

    try {
      const res = await weatherService.getWeatherByCoords(lat, lon, selectedUnit);
      if (res.data) {
        const updatedPayload = {
          ...res.data,
          name: geoInfo?.city || res.data.name || 'Your Location',
          country: geoInfo?.state ? `${geoInfo.state}, ${geoInfo.country}` : res.data.country || 'India',
        };
        setUserLocationWeather(updatedPayload);
      } else {
        const detectedName = geoInfo?.city || 'Mumbai';
        const baseMock = getMockWeatherData(detectedName);
        const updatedMock = {
          ...baseMock,
          name: detectedName,
          country: geoInfo?.state ? `${geoInfo.state}, ${geoInfo.country}` : baseMock.country,
        };
        setUserLocationWeather(updatedMock);
      }
    } catch (err) {
      console.error('Coords weather fetch error:', err);
      const detectedName = geoInfo?.city || 'Mumbai';
      const baseMock = getMockWeatherData(detectedName);
      setUserLocationWeather({
        ...baseMock,
        name: detectedName,
        country: geoInfo?.state ? `${geoInfo.state}, ${geoInfo.country}` : baseMock.country,
      });
    } finally {
      setUserLocationLoading(false);
    }
  }, []);

  // Allow user to manually correct/set their Current Location
  const setCurrentLocationManually = useCallback(async (cityName, selectedUnit = unit) => {
    if (!cityName || !cityName.trim()) return;
    const cleanName = cityName.trim();
    setUserLocationLoading(true);
    setUserLocationError(null);

    const geoInfo = await geocodeGlobalLocation(cleanName);

    try {
      const res = await weatherService.getWeatherByCity(cleanName, selectedUnit);
      if (res.data) {
        const enriched = {
          ...res.data,
          name: geoInfo?.name || res.data.name || cleanName,
          country: geoInfo?.country || res.data.country || 'India',
        };
        setUserLocationWeather(enriched);
      } else {
        setUserLocationWeather(getMockWeatherData(cleanName, geoInfo));
      }
    } catch (err) {
      console.error('Manual location update error:', err);
      setUserLocationWeather(getMockWeatherData(cleanName, geoInfo));
    } finally {
      setUserLocationLoading(false);
    }
  }, [unit]);

  // Fetch weather for Searched City Dashboard with District, State, Country resolution
  const searchCity = useCallback(async (cityName, selectedUnit = unit) => {
    if (!cityName || !cityName.trim()) {
      setSearchError('Please enter a valid city name.');
      return;
    }

    const cleanCity = cityName.trim();
    setSearchLoading(true);
    setSearchError(null);
    setSearchWarning(null);
    setSearchedCity(cleanCity);
    setActiveDashboardTab('searched');

    // Perform global geocoding lookup for District, State, Country
    const geoInfo = await geocodeGlobalLocation(cleanCity);

    try {
      const res = await weatherService.getWeatherByCity(cleanCity, selectedUnit);
      if (res.data) {
        const enriched = {
          ...res.data,
          name: geoInfo?.name || res.data.name || cleanCity,
          country: geoInfo?.country || res.data.country || 'India',
          district: geoInfo?.district || '',
          state: geoInfo?.state || '',
        };
        setSearchedCityWeather(enriched);
      } else {
        if (res.warning) setSearchWarning(res.warning);
        const fallback = getMockWeatherData(cleanCity, geoInfo);
        setSearchedCityWeather(fallback);
      }
    } catch (err) {
      console.warn('City weather fetch using geocoded mock dataset:', err.message);
      const fallback = getMockWeatherData(cleanCity, geoInfo);
      setSearchedCityWeather(fallback);
    } finally {
      setSearchLoading(false);
    }
  }, [unit]);

  // Automatically request browser Geolocation API on application load
  const detectLocation = useCallback(() => {
    setUserLocationLoading(true);
    requestLocation(
      (coords) => {
        setUserCoords(coords);
        fetchCurrentLocationWeather(coords.lat, coords.lon, unit);
      },
      (geoErr) => {
        setUserLocationLoading(false);
        setUserLocationError(geoErr);
        setUserLocationWeather(defaultCityData);
      }
    );
  }, [requestLocation, fetchCurrentLocationWeather, unit]);

  // Trigger auto-location detection on initial mount
  useEffect(() => {
    detectLocation();
  }, []);

  // Re-fetch weather when unit toggles (°C <-> °F)
  useEffect(() => {
    if (userCoords) {
      fetchCurrentLocationWeather(userCoords.lat, userCoords.lon, unit);
    }
    if (searchedCity) {
      searchCity(searchedCity, unit);
    }
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const clearSearchedCity = () => {
    setSearchedCity('');
    setSearchedCityWeather(null);
    setSearchError(null);
    setActiveDashboardTab('location');
  };

  return (
    <WeatherContext.Provider
      value={{
        unit,
        toggleUnit,

        // Dashboard Tabs
        activeDashboardTab,
        setActiveDashboardTab,

        // Current Location Dashboard
        userLocationWeather,
        userLocationLoading,
        userLocationError,
        permissionDenied,
        detectLocation,
        setCurrentLocationManually,

        // Searched City Dashboard
        searchedCity,
        searchedCityWeather,
        searchLoading,
        searchError,
        setSearchError,
        searchWarning,
        searchCity,
        clearSearchedCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);
