import React from 'react';
import { motion } from 'framer-motion';
import { useWeatherContext } from '../context/WeatherContext';
import { defaultCityData } from '../data/mockWeatherData';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { WeeklyForecast } from '../components/weather/WeeklyForecast';
import { TemperatureTrendChart } from '../components/weather/TemperatureTrendChart';
import { HourlyTemperatureChart } from '../components/weather/HourlyTemperatureChart';
import { WeeklyTemperatureChart } from '../components/weather/WeeklyTemperatureChart';
import { SevereWeatherAlertCard } from '../components/weather/SevereWeatherAlertCard';

/**
 * Extended Weather Forecast Page View featuring Severe Weather Alerts & Chart.js Visualizations
 */
export const ForecastPage = () => {
  const { unit, userLocationWeather, searchedCityWeather, searchedCity } = useWeatherContext();

  const activeWeatherData = searchedCityWeather || userLocationWeather || defaultCityData;
  const activeCityName = searchedCity || activeWeatherData?.name || 'Local Area';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
          Extended Projections
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
          Weather Forecast for <span className="text-sky-400">{activeCityName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Detailed hourly breakdown and 7-day extended meteorological outlook with Chart.js analytics.
        </p>
      </motion.div>

      {/* Severe Weather Warnings & Dismissible Notifications */}
      <SevereWeatherAlertCard weatherData={activeWeatherData} />

      {/* Hourly Forecast Carousel */}
      <HourlyForecast hourlyList={activeWeatherData.hourly} unit={unit} />

      {/* Chart.js Visualizations */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-200">Interactive Weather Charts</h2>
        
        <TemperatureTrendChart hourlyData={activeWeatherData.hourly} unit={unit} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HourlyTemperatureChart hourlyData={activeWeatherData.hourly} unit={unit} />
          <WeeklyTemperatureChart weeklyData={activeWeatherData.weekly} unit={unit} />
        </div>
      </div>

      {/* 7-Day Forecast Cards */}
      <WeeklyForecast weeklyList={activeWeatherData.weekly} unit={unit} />
    </div>
  );
};
