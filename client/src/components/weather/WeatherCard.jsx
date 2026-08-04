import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Droplets, Gauge } from 'lucide-react';
import { formatTemp } from '../../utils/formatters';

/**
 * WeatherCard Component powered by Framer Motion animation
 */
export const WeatherCard = ({ data, unit = 'metric' }) => {
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const condition = weather?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-2">
            Current Weather
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{name}</h2>
          <p className="text-sm font-medium text-slate-400 capitalize mt-1">
            {condition?.description || 'Clear Sky'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {condition?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`}
              alt={condition.description}
              className="w-20 h-20 drop-shadow-md animate-float"
            />
          )}
          <div>
            <div className="text-5xl font-black text-white tracking-tighter">
              {formatTemp(main?.temp, unit)}
            </div>
            <p className="text-xs text-slate-400">
              Feels like {formatTemp(main?.feels_like, unit)}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
          <Thermometer className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Min / Max</p>
            <p className="text-sm font-bold text-slate-200">
              {formatTemp(main?.temp_min, unit)} / {formatTemp(main?.temp_max, unit)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
          <Droplets className="w-5 h-5 text-sky-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Humidity</p>
            <p className="text-sm font-bold text-slate-200">{main?.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
          <Wind className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Wind Speed</p>
            <p className="text-sm font-bold text-slate-200">{wind?.speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
          <Gauge className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-[11px] font-medium text-slate-400">Pressure</p>
            <p className="text-sm font-bold text-slate-200">{main?.pressure} hPa</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
