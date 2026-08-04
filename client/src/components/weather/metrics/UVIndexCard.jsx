import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

/**
 * UV Index Card Component
 */
export const UVIndexCard = ({ uvIndex = 0, uvLevel = 'Low' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="glass-card glass-card-hover rounded-3xl p-5 shadow-lg border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-200 light:text-slate-800">UV Index</h3>
        </div>
        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {uvLevel}
        </span>
      </div>

      <div className="flex items-baseline gap-2 my-2">
        <span className="text-3xl font-black text-slate-100 light:text-slate-900 tracking-tight">{uvIndex}</span>
        <span className="text-xs text-slate-400">of 12 Max</span>
      </div>

      <div className="w-full h-2 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden my-3">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${(uvIndex / 12) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-2 text-xs border-t border-slate-700/50 light:border-slate-300">
        <span className="text-slate-400">Advice:</span>
        <span className="font-semibold text-slate-200 light:text-slate-800">Use SPF 30+ Sunscreen</span>
      </div>
    </motion.div>
  );
};
