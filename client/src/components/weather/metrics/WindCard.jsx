import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Compass } from 'lucide-react';

/**
 * Wind Conditions Card Component
 */
export const WindCard = ({ windSpeed = 0, windDirection = 'N', windGust = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card glass-card-hover rounded-3xl p-5 shadow-lg border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Wind className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-sm font-bold text-slate-200 light:text-slate-800">Wind Status</h3>
        </div>
        <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-slate-800 light:bg-slate-200 text-sky-400">
          <Compass className="w-3 h-3" /> {windDirection}
        </span>
      </div>

      <div className="flex items-baseline gap-2 my-2">
        <span className="text-3xl font-black text-slate-100 light:text-slate-900 tracking-tight">{windSpeed}</span>
        <span className="text-xs text-slate-400">km/h</span>
      </div>

      <div className="space-y-2 pt-3 border-t border-slate-700/50 light:border-slate-300 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Wind Gusts:</span>
          <span className="font-semibold text-slate-200 light:text-slate-800">{windGust} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Breeze Level:</span>
          <span className="font-semibold text-emerald-400">Moderate Breeze</span>
        </div>
      </div>
    </motion.div>
  );
};
