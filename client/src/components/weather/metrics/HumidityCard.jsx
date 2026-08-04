import React from 'react';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

/**
 * Humidity & Dew Point Card Component
 */
export const HumidityCard = ({ humidity = 0, dewPoint = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card glass-card-hover rounded-3xl p-5 shadow-lg border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-200 light:text-slate-800">Humidity</h3>
        </div>
        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          {humidity > 70 ? 'High' : humidity > 40 ? 'Normal' : 'Low'}
        </span>
      </div>

      <div className="flex items-baseline gap-2 my-2">
        <span className="text-3xl font-black text-slate-100 light:text-slate-900 tracking-tight">{humidity}%</span>
        <span className="text-xs text-slate-400">Relative</span>
      </div>

      <div className="w-full h-2 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden my-3">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${humidity}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-2 text-xs border-t border-slate-700/50 light:border-slate-300">
        <span className="text-slate-400">Dew Point:</span>
        <span className="font-semibold text-slate-200 light:text-slate-800">{dewPoint}°C</span>
      </div>
    </motion.div>
  );
};
