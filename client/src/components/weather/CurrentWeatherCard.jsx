import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Droplets, Gauge, MapPin, Calendar, Eye, Edit3, Check, X, Bookmark } from 'lucide-react';
import { WeatherIcon } from '../common/WeatherIcon';
import { formatTemp } from '../../utils/formatters';
import { useWeatherContext } from '../../context/WeatherContext';
import { favoriteService } from '../../services/favoriteService';

/**
 * Modern Hero Glassmorphic Current Weather Card Component
 */
export const CurrentWeatherCard = ({
  weatherData,
  unit = 'metric',
  badgeLabel = null,
  isCurrentLocation = false,
}) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [customCity, setCustomCity] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const { setCurrentLocationManually, detectLocation } = useWeatherContext();

  if (!weatherData) return null;

  const {
    name,
    country,
    temp,
    feelsLike,
    tempMin,
    tempMax,
    condition,
    iconType,
    description,
    humidity,
    windSpeed,
    pressure,
    visibility,
  } = weatherData;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (customCity.trim()) {
      setCurrentLocationManually(customCity.trim());
      setIsEditingLocation(false);
      setCustomCity('');
    }
  };

  const handleToggleFavorite = async () => {
    setSaveLoading(true);
    try {
      if (isSaved) {
        await favoriteService.deleteFavorite(name);
        setIsSaved(false);
      } else {
        await favoriteService.addFavorite({
          name,
          country,
          temp,
          condition,
          iconType,
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.warn('Favorite toggle warning:', err);
      setIsSaved((prev) => !prev);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/50 light:border-slate-300">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {badgeLabel && (
              <span className="px-3 py-1 text-xs font-black rounded-full bg-sky-500 text-white shadow-md shadow-sky-500/30">
                {badgeLabel}
              </span>
            )}
            
            {!isEditingLocation ? (
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <MapPin className="w-3.5 h-3.5" /> {name}{country ? `, ${country}` : ''}
                </span>

                <button
                  onClick={handleToggleFavorite}
                  disabled={saveLoading}
                  className={`p-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 ${
                    isSaved
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                  title={isSaved ? 'Remove from MongoDB Favorites' : 'Save to MongoDB Favorites'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span className="text-[11px] hidden sm:inline">{isSaved ? 'Saved' : 'Save City'}</span>
                </button>

                {isCurrentLocation && (
                  <button
                    onClick={() => setIsEditingLocation(true)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 text-xs transition-all flex items-center gap-1"
                    title="Correct your current location name"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span className="text-[11px] font-semibold">Correct Location</span>
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleLocationSubmit} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="Enter your exact city (e.g. Pune, Mumbai)..."
                  className="px-3 py-1 text-xs rounded-xl bg-slate-900 text-white border border-sky-400 focus:outline-none placeholder-slate-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  title="Save Location"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingLocation(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    detectLocation();
                    setIsEditingLocation(false);
                  }}
                  className="px-2 py-1 text-[11px] rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 font-semibold"
                  title="Re-detect automatically"
                >
                  Auto GPS
                </button>
              </form>
            )}

            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {currentDate}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100 light:text-slate-900 mt-1">
            {condition}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 capitalize mt-0.5">
            {description || 'Current weather metrics'}
          </p>
        </div>

        {/* Animated Weather Icon & Temperature Display */}
        <div className="flex items-center gap-4 bg-slate-900/40 light:bg-white/60 p-4 rounded-2xl border border-white/10">
          <WeatherIcon iconType={iconType} className="w-16 h-16 sm:w-20 sm:h-20" />
          <div>
            <div className="text-4xl sm:text-5xl font-black text-slate-100 light:text-slate-900 tracking-tighter">
              {formatTemp(temp, unit)}
            </div>
            <p className="text-xs font-semibold text-sky-400">
              Feels like {formatTemp(feelsLike, unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mt-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/5 shadow-sm">
          <Thermometer className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">High / Low</p>
            <p className="text-xs sm:text-sm font-bold text-slate-200 light:text-slate-800">
              {formatTemp(tempMax, unit)} / {formatTemp(tempMin, unit)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/5 shadow-sm">
          <Droplets className="w-5 h-5 text-sky-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Humidity</p>
            <p className="text-xs sm:text-sm font-bold text-slate-200 light:text-slate-800">{humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/5 shadow-sm">
          <Wind className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Wind Speed</p>
            <p className="text-xs sm:text-sm font-bold text-slate-200 light:text-slate-800">{windSpeed} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/5 shadow-sm">
          <Gauge className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Pressure</p>
            <p className="text-xs sm:text-sm font-bold text-slate-200 light:text-slate-800">{pressure} hPa</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/5 shadow-sm col-span-2 md:col-span-1">
          <Eye className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Visibility</p>
            <p className="text-xs sm:text-sm font-bold text-slate-200 light:text-slate-800">{visibility || '10 km'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
