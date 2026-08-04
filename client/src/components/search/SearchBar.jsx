import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, X, AlertCircle } from 'lucide-react';
import { useWeatherContext } from '../../context/WeatherContext';

/**
 * Modern Glassmorphic Search Bar supporting Indian and global cities
 */
export const SearchBar = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState('');
  const [inputError, setInputError] = useState(false);

  const {
    searchedCity,
    searchCity,
    clearSearchedCity,
    detectLocation,
    searchLoading,
    setActiveDashboardTab,
  } = useWeatherContext();

  const popularCities = ['Mumbai', 'Delhi', 'Bengaluru', 'London', 'Tokyo', 'New York'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setInputError(true);
      setTimeout(() => setInputError(false), 2500);
      return;
    }
    setInputError(false);
    searchCity(inputVal.trim());
    setInputVal('');
    navigate('/');
  };

  const handleCityClick = (city) => {
    searchCity(city);
    navigate('/');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (inputError) setInputError(false);
            }}
            placeholder="Search any city worldwide (e.g. Mumbai, Delhi, London, Tokyo)..."
            className={`w-full pl-12 pr-32 py-4 rounded-2xl glass-card text-slate-100 light:text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium shadow-2xl ${
              inputError
                ? 'ring-2 ring-rose-500 border-rose-500'
                : 'focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400'
            }`}
          />
          <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-sky-400 transition-colors" />

          <div className="absolute right-2 flex items-center gap-1.5">
            {searchedCity && (
              <button
                type="button"
                onClick={clearSearchedCity}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors text-xs font-semibold flex items-center gap-1"
                title="Clear Searched City Dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                detectLocation();
                setActiveDashboardTab('location');
                navigate('/');
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-colors"
              title="Detect Current Location (Browser Geolocation)"
            >
              <MapPin className="w-4 h-4 text-sky-400 animate-bounce" />
            </button>
            <button
              type="submit"
              disabled={searchLoading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-sky-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {/* Empty input validation message */}
      {inputError && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-semibold animate-pulse">
          <AlertCircle className="w-3.5 h-3.5" /> Please enter a city name to search.
        </div>
      )}

      {/* Quick Select City Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="flex items-center gap-1 text-slate-400 font-semibold">
          <Sparkles className="w-3 h-3 text-amber-400" /> Quick Search:
        </span>
        {popularCities.map((city) => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className={`px-3 py-1 rounded-xl font-medium transition-all ${
              searchedCity.toLowerCase() === city.toLowerCase()
                ? 'bg-sky-500 text-white shadow-sm ring-1 ring-sky-300'
                : 'glass-card text-slate-400 hover:text-sky-400 hover:border-sky-500/40'
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};
