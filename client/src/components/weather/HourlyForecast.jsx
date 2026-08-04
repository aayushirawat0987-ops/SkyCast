import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Droplets } from 'lucide-react';
import { WeatherIcon } from '../common/WeatherIcon';
import { formatTemp } from '../../utils/formatters';

/**
 * 24-Hour Scrollable Hourly Weather Forecast Carousel Component
 */
export const HourlyForecast = ({ hourlyList = [], unit = 'metric' }) => {
  if (!hourlyList || hourlyList.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 25, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Hourly Forecast
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Next 24 Hours</p>
          </div>
        </div>
        <span className="text-xs text-sky-400 font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          24h Projections
        </span>
      </div>

      {/* Horizontally Scrollable Cards Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-sky-500/30 select-none"
      >
        {hourlyList.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-none w-28 p-4 rounded-2xl bg-slate-900/50 light:bg-white/80 border border-white/10 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/15 flex flex-col items-center gap-2.5 transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/0 via-sky-500/0 to-sky-500/5 group-hover:to-sky-500/15 transition-all pointer-events-none"></div>

            {/* Time */}
            <span className="text-xs font-bold text-slate-300 light:text-slate-700 group-hover:text-sky-400 transition-colors">
              {item.time}
            </span>

            {/* Animated Condition Icon */}
            <div className="my-1">
              <WeatherIcon iconType={item.icon} className="w-10 h-10" />
            </div>

            {/* Temperature */}
            <span className="text-base font-black text-slate-100 light:text-slate-900 tracking-tight">
              {formatTemp(item.temp, unit)}
            </span>

            {/* Rain Chance Badge */}
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-sky-400 bg-sky-500/15 dark:bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30">
              <Droplets className="w-3 h-3 text-sky-400" />
              <span>{item.pop}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
