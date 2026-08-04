import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Wind } from 'lucide-react';

/**
 * Air Quality Index (AQI) Metric Card Component
 * Displays AQI Index, Category, Color-coded badge, and 6 pollutants (PM2.5, PM10, CO, NO2, SO2, O3)
 */
export const AQICard = ({ aqiData }) => {
  if (!aqiData) return null;

  const {
    value = 35,
    category = 'Good',
    status,
    pm25 = 8.4,
    pm10 = 16.2,
    co = 0.4,
    no2 = 12.1,
    so2 = 4.2,
    o3 = 28.5,
  } = aqiData;

  const aqiCategory = category || status || 'Good';

  // Compute color badge & theme based on AQI value / Category
  const getAQITheme = (val) => {
    if (val <= 50) {
      return {
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        bar: 'bg-emerald-500',
        text: 'text-emerald-400',
        label: 'Good',
      };
    }
    if (val <= 100) {
      return {
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        bar: 'bg-amber-500',
        text: 'text-amber-400',
        label: 'Moderate',
      };
    }
    if (val <= 150) {
      return {
        badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
        bar: 'bg-orange-500',
        text: 'text-orange-400',
        label: 'Unhealthy for Sensitive',
      };
    }
    if (val <= 200) {
      return {
        badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
        bar: 'bg-rose-500',
        text: 'text-rose-400',
        label: 'Unhealthy',
      };
    }
    if (val <= 300) {
      return {
        badge: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
        bar: 'bg-purple-500',
        text: 'text-purple-400',
        label: 'Very Unhealthy',
      };
    }
    return {
      badge: 'bg-red-950/80 text-rose-300 border-rose-600/50',
      bar: 'bg-red-800',
      text: 'text-rose-400',
      label: 'Hazardous',
    };
  };

  const theme = getAQITheme(value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-card glass-card-hover rounded-3xl p-5 shadow-xl border border-white/10 flex flex-col justify-between"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 light:text-slate-800">Air Quality Index</h3>
          </div>
          <span className={`px-2.5 py-0.5 text-[11px] font-black rounded-full border ${theme.badge}`}>
            {aqiCategory}
          </span>
        </div>

        {/* AQI Index Value */}
        <div className="flex items-baseline gap-2.5 my-2">
          <span className="text-3xl sm:text-4xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            {value}
          </span>
          <span className={`text-xs font-bold ${theme.text}`}>AQI Index</span>
        </div>

        {/* Multi-segmented Color Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden my-3 relative">
          <div
            className={`h-full ${theme.bar} rounded-full transition-all duration-700`}
            style={{ width: `${Math.min(100, Math.max(5, (value / 300) * 100))}%` }}
          ></div>
        </div>
      </div>

      {/* 6 Pollutants Breakdown Grid */}
      <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] border-t border-slate-700/50 light:border-slate-300">
        <div className="bg-slate-900/40 p-1.5 rounded-xl text-center border border-white/5">
          <span className="text-slate-400 block text-[10px] font-semibold">PM2.5</span>
          <span className="font-extrabold text-slate-200 light:text-slate-800">{pm25}</span>
          <span className="text-[9px] text-slate-500 block">µg/m³</span>
        </div>

        <div className="bg-slate-900/40 p-1.5 rounded-xl text-center border border-white/5">
          <span className="text-slate-400 block text-[10px] font-semibold">PM10</span>
          <span className="font-extrabold text-slate-200 light:text-slate-800">{pm10}</span>
          <span className="text-[9px] text-slate-500 block">µg/m³</span>
        </div>

        <div className="bg-slate-900/40 p-1.5 rounded-xl text-center border border-white/5">
          <span className="text-slate-400 block text-[10px] font-semibold">CO</span>
          <span className="font-extrabold text-slate-200 light:text-slate-800">{co}</span>
          <span className="text-[9px] text-slate-500 block">mg/m³</span>
        </div>

        <div className="bg-slate-900/40 p-1.5 rounded-xl text-center border border-white/5">
          <span className="text-slate-400 block text-[10px] font-semibold">NO2</span>
          <span className="font-extrabold text-slate-200 light:text-slate-800">{no2}</span>
          <span className="text-[9px] text-slate-500 block">µg/m³</span>
        </div>

        <div className="bg-slate-900/40 p-1.5 rounded-xl text-center border border-white/5">
          <span className="text-slate-400 block text-[10px] font-semibold">SO2</span>
          <span className="font-extrabold text-slate-200 light:text-slate-800">{so2}</span>
          <span className="text-[9px] text-slate-500 block">µg/m³</span>
        </div>

        <div className="bg-slate-900/40 p-1.5 rounded-xl text-center border border-white/5">
          <span className="text-slate-400 block text-[10px] font-semibold">O3</span>
          <span className="font-extrabold text-slate-200 light:text-slate-800">{o3}</span>
          <span className="text-[9px] text-slate-500 block">µg/m³</span>
        </div>
      </div>
    </motion.div>
  );
};
