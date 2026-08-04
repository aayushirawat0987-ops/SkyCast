import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Info,
  RefreshCw,
  NavigationOff,
  BarChart3,
  TrendingUp,
  Clock,
  Calendar,
  MapPin,
  Building2,
  X,
  Layers,
} from 'lucide-react';
import { useWeatherContext } from '../context/WeatherContext';
import { SearchBar } from '../components/search/SearchBar';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { WeeklyForecast } from '../components/weather/WeeklyForecast';
import { TemperatureTrendChart } from '../components/weather/TemperatureTrendChart';
import { HourlyTemperatureChart } from '../components/weather/HourlyTemperatureChart';
import { WeeklyTemperatureChart } from '../components/weather/WeeklyTemperatureChart';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { SevereWeatherAlertCard } from '../components/weather/SevereWeatherAlertCard';
import { AQICard } from '../components/weather/metrics/AQICard';
import { WindCard } from '../components/weather/metrics/WindCard';
import { HumidityCard } from '../components/weather/metrics/HumidityCard';
import { SunCard } from '../components/weather/metrics/SunCard';
import { UVIndexCard } from '../components/weather/metrics/UVIndexCard';

/**
 * Main Weather Dashboard View supporting:
 * - Active view selector: "My Current Location", "Searched City", "Show Both"
 * - Automatic Geolocation & Search functionality
 */
export const Home = () => {
  const {
    unit,
    // Active View
    activeDashboardTab,
    setActiveDashboardTab,
    // Current Location Dashboard
    userLocationWeather,
    userLocationLoading,
    userLocationError,
    permissionDenied,
    detectLocation,
    // Searched City Dashboard
    searchedCity,
    searchedCityWeather,
    searchLoading,
    searchError,
    searchWarning,
    clearSearchedCity,
  } = useWeatherContext();

  const [locationChartTab, setLocationChartTab] = useState('trend');
  const [searchedChartTab, setSearchedChartTab] = useState('trend');

  const showLocationDashboard =
    activeDashboardTab === 'location' || activeDashboardTab === 'both';
  const showSearchedDashboard =
    (activeDashboardTab === 'searched' || activeDashboardTab === 'both') &&
    (searchedCity || searchLoading || searchedCityWeather || searchError);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome & Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 light:text-slate-900">
          Live Weather <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Intelligence</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
          Automatically detects your current location or lets you search any city worldwide.
        </p>

        <div className="pt-3">
          <SearchBar />
        </div>
      </motion.div>

      {/* Permission Denied Banner */}
      {permissionDenied && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto shadow-lg"
        >
          <div className="flex items-center gap-2">
            <NavigationOff className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>
              Location permission access was denied by your browser. Automatic local weather is unavailable. You can search any city worldwide above.
            </span>
          </div>
          <button
            onClick={detectLocation}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-bold transition-all flex-shrink-0"
          >
            Retry Location
          </button>
        </motion.div>
      )}

      {/* Dashboard Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          onClick={() => setActiveDashboardTab('location')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border ${
            activeDashboardTab === 'location'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 border-sky-400'
              : 'glass-card text-slate-300 hover:text-sky-400 border-white/10'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>My Current Location ({userLocationWeather?.name || 'Local'})</span>
        </button>

        {searchedCity && (
          <button
            onClick={() => setActiveDashboardTab('searched')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border ${
              activeDashboardTab === 'searched'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 border-purple-400'
                : 'glass-card text-slate-300 hover:text-purple-400 border-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Searched City ({searchedCity})</span>
          </button>
        )}

        {searchedCity && (
          <button
            onClick={() => setActiveDashboardTab('both')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border ${
              activeDashboardTab === 'both'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-400'
                : 'glass-card text-slate-300 hover:text-indigo-400 border-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>View Both Stacked</span>
          </button>
        )}
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: SEARCHED CITY DASHBOARD (If Active)                      */}
      {/* ==================================================================== */}
      {showSearchedDashboard && (
        <motion.section
          id="searched-city-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-2"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
                  Searched Location Weather:{' '}
                  <span className="text-sky-400 capitalize">
                    {searchedCityWeather?.name || searchedCity}
                    {searchedCityWeather?.country ? `, ${searchedCityWeather.country}` : ''}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Live meteorological conditions & Chart.js analytics for searched destination
                </p>
              </div>
            </div>

            <button
              onClick={clearSearchedCity}
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Close Searched City View"
            >
              <X className="w-4 h-4" /> Close Searched View
            </button>
          </div>

          {/* Searched City Warning */}
          {searchWarning && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 max-w-3xl mx-auto">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{searchWarning}</span>
            </div>
          )}

          {/* Searched City Loading State */}
          {searchLoading && (
            <div className="space-y-4">
              <LoadingSpinner label={`Fetching weather data for ${searchedCity}...`} />
              <SkeletonLoader type="all" />
            </div>
          )}

          {/* Searched City Error Alert */}
          {searchError && !searchLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto shadow-xl"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-rose-300">City Request Notice</p>
                  <p className="text-xs text-rose-200/80">{searchError}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Searched City Dashboard Main Content */}
          {!searchLoading && searchedCityWeather && (
            <div className="space-y-8">
              <CurrentWeatherCard
                weatherData={searchedCityWeather}
                unit={unit}
                badgeLabel={`🌆 ${searchedCityWeather.name}${searchedCityWeather.country ? ', ' + searchedCityWeather.country : ''}`}
              />

              {/* Severe Weather Hazard Notifications */}
              <SevereWeatherAlertCard weatherData={searchedCityWeather} />

              {/* Searched City Chart.js Visualizations */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="flex items-center gap-2 px-3">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-bold text-slate-200">
                      {searchedCityWeather.name} Chart.js Weather Analytics
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950/60 rounded-xl border border-white/5">
                    <button
                      onClick={() => setSearchedChartTab('trend')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        searchedChartTab === 'trend'
                          ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" /> Trend
                    </button>
                    <button
                      onClick={() => setSearchedChartTab('hourly')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        searchedChartTab === 'hourly'
                          ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Hourly
                    </button>
                    <button
                      onClick={() => setSearchedChartTab('weekly')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        searchedChartTab === 'weekly'
                          ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" /> Weekly
                    </button>
                    <button
                      onClick={() => setSearchedChartTab('all')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        searchedChartTab === 'all'
                          ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      View All
                    </button>
                  </div>
                </div>

                {(searchedChartTab === 'trend' || searchedChartTab === 'all') && (
                  <TemperatureTrendChart hourlyData={searchedCityWeather.hourly} unit={unit} />
                )}
                {(searchedChartTab === 'hourly' || searchedChartTab === 'all') && (
                  <HourlyTemperatureChart hourlyData={searchedCityWeather.hourly} unit={unit} />
                )}
                {(searchedChartTab === 'weekly' || searchedChartTab === 'all') && (
                  <WeeklyTemperatureChart weeklyData={searchedCityWeather.weekly} unit={unit} />
                )}
              </div>

              {/* Searched City Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <AQICard aqiData={searchedCityWeather.aqi} />
                <WindCard
                  windSpeed={searchedCityWeather.windSpeed}
                  windDirection={searchedCityWeather.windDirection}
                  windGust={searchedCityWeather.windGust}
                />
                <HumidityCard
                  humidity={searchedCityWeather.humidity}
                  dewPoint={searchedCityWeather.dewPoint}
                />
                <SunCard
                  sunrise={searchedCityWeather.sunrise}
                  sunset={searchedCityWeather.sunset}
                  progress={searchedCityWeather.sunProgress}
                />
                <UVIndexCard
                  uvIndex={searchedCityWeather.uvIndex}
                  uvLevel={searchedCityWeather.uvLevel}
                />
              </div>

              {/* Searched City Forecast Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HourlyForecast hourlyList={searchedCityWeather.hourly} unit={unit} />
                <WeeklyForecast weeklyList={searchedCityWeather.weekly} unit={unit} />
              </div>
            </div>
          )}
        </motion.section>
      )}

      {/* ==================================================================== */}
      {/* SECTION 2: MY CURRENT LOCATION DASHBOARD (If Active)                 */}
      {/* ==================================================================== */}
      {showLocationDashboard && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-2"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-100 light:text-slate-900 tracking-tight">
                  My Current Location
                </h2>
                <p className="text-xs text-slate-400 font-medium">Auto-detected local weather conditions</p>
              </div>
            </div>

            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
              Primary Location
            </span>
          </div>

          {/* Current Location Loading State */}
          {userLocationLoading && (
            <div className="space-y-4">
              <LoadingSpinner label="Detecting location & fetching local weather data..." />
              <SkeletonLoader type="all" />
            </div>
          )}

          {/* Current Location Error State */}
          {userLocationError && !userLocationLoading && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{userLocationError} Showing default city weather metrics.</span>
              </div>
              <button
                onClick={detectLocation}
                className="px-3 py-1 rounded-lg bg-sky-500 text-white font-semibold text-xs hover:bg-sky-600 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {/* Current Location Main Content */}
          {!userLocationLoading && userLocationWeather && (
            <div className="space-y-8">
              <CurrentWeatherCard
                weatherData={userLocationWeather}
                unit={unit}
                badgeLabel="📍 My Current Location"
                isCurrentLocation={true}
              />

              {/* Severe Weather Hazard Notifications */}
              <SevereWeatherAlertCard weatherData={userLocationWeather} />

              {/* Current Location Chart.js Visualizations */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="flex items-center gap-2 px-3">
                    <BarChart3 className="w-5 h-5 text-sky-400" />
                    <span className="text-sm font-bold text-slate-200">Local Chart.js Weather Analytics</span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950/60 rounded-xl border border-white/5">
                    <button
                      onClick={() => setLocationChartTab('trend')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        locationChartTab === 'trend'
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" /> Trend
                    </button>
                    <button
                      onClick={() => setLocationChartTab('hourly')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        locationChartTab === 'hourly'
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Hourly
                    </button>
                    <button
                      onClick={() => setLocationChartTab('weekly')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        locationChartTab === 'weekly'
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" /> Weekly
                    </button>
                    <button
                      onClick={() => setLocationChartTab('all')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        locationChartTab === 'all'
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      View All
                    </button>
                  </div>
                </div>

                {(locationChartTab === 'trend' || locationChartTab === 'all') && (
                  <TemperatureTrendChart hourlyData={userLocationWeather.hourly} unit={unit} />
                )}
                {(locationChartTab === 'hourly' || locationChartTab === 'all') && (
                  <HourlyTemperatureChart hourlyData={userLocationWeather.hourly} unit={unit} />
                )}
                {(locationChartTab === 'weekly' || locationChartTab === 'all') && (
                  <WeeklyTemperatureChart weeklyData={userLocationWeather.weekly} unit={unit} />
                )}
              </div>

              {/* Metrics Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <AQICard aqiData={userLocationWeather.aqi} />
                <WindCard
                  windSpeed={userLocationWeather.windSpeed}
                  windDirection={userLocationWeather.windDirection}
                  windGust={userLocationWeather.windGust}
                />
                <HumidityCard
                  humidity={userLocationWeather.humidity}
                  dewPoint={userLocationWeather.dewPoint}
                />
                <SunCard
                  sunrise={userLocationWeather.sunrise}
                  sunset={userLocationWeather.sunset}
                  progress={userLocationWeather.sunProgress}
                />
                <UVIndexCard
                  uvIndex={userLocationWeather.uvIndex}
                  uvLevel={userLocationWeather.uvLevel}
                />
              </div>

              {/* Forecast Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HourlyForecast hourlyList={userLocationWeather.hourly} unit={unit} />
                <WeeklyForecast weeklyList={userLocationWeather.weekly} unit={unit} />
              </div>
            </div>
          )}
        </motion.section>
      )}
    </div>
  );
};
