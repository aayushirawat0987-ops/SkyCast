import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Droplets, Wind } from 'lucide-react';
import { WeatherIcon } from '../common/WeatherIcon';
import { formatTemp } from '../../utils/formatters';

/**
 * 7-Day Weather Forecast Component with Attractive Cards, Humidity, Wind Speed, and Temperature Range Bars
 */
export const WeeklyForecast = ({ weeklyList = [], unit = 'metric' }) => {
  if (!weeklyList || weeklyList.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              7-Day Forecast
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Extended Outlook</p>
          </div>
        </div>
        <span className="text-xs text-sky-400 font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          Daily Trends
        </span>
      </div>

      {/* 7 Cards Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {weeklyList.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ x: 4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/10 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/10 transition-all cursor-pointer gap-3 sm:gap-4 group relative overflow-hidden"
          >
            {/* Ambient Card Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/0 to-sky-500/5 group-hover:to-sky-500/10 transition-all pointer-events-none"></div>

            {/* Day & Condition Icon */}
            <div className="flex items-center gap-3.5 sm:w-44">
              <div className="p-1.5 rounded-xl bg-slate-800/60 light:bg-slate-100 group-hover:scale-110 transition-transform">
                <WeatherIcon iconType={item.icon} className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors">
                  {item.day}
                </p>
                <p className="text-[11px] font-medium text-slate-400 truncate max-w-[110px]">
                  {item.condition}
                </p>
              </div>
            </div>

            {/* Humidity & Wind Speed Badges */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                <Droplets className="w-3 h-3 text-sky-400" />
                {item.humidity !== undefined ? `${item.humidity}%` : '60%'}
              </span>

              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Wind className="w-3 h-3 text-emerald-400" />
                {item.windSpeed !== undefined ? `${item.windSpeed} km/h` : '14 km/h'}
              </span>
            </div>

            {/* Min / Max Temp Bar & Values */}
            <div className="flex items-center gap-3 flex-1 max-w-xs justify-end">
              <span className="text-xs font-bold text-slate-400 w-10 text-right">
                {formatTemp(item.minTemp, unit)}
              </span>

              {/* Temp Range Progress Bar */}
              <div className="flex-1 h-2 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-amber-400 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(25, (item.maxTemp - item.minTemp) * 8))}%`,
                    marginLeft: '10%',
                  }}
                ></div>
              </div>

              <span className="text-xs font-black text-slate-100 light:text-slate-900 w-10 text-left">
                {formatTemp(item.maxTemp, unit)}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
