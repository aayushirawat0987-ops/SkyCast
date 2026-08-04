import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';

/**
 * Sunrise & Sunset Card Component with Sun Arc Trajectory Visualizer
 */
export const SunCard = ({ sunrise = '06:00 AM', sunset = '08:00 PM', progress = 50 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card glass-card-hover rounded-3xl p-5 shadow-lg border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Sunrise className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-200 light:text-slate-800">Sun Trajectory</h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Daylight</span>
      </div>

      {/* Sun Arc Trajectory Container */}
      <div className="relative w-full h-16 my-2 flex items-center justify-center overflow-hidden">
        {/* Arc Background Line */}
        <div className="w-44 h-44 rounded-full border-2 border-dashed border-amber-400/30 absolute top-2"></div>

        {/* Animated Sun Position Marker */}
        <div
          className="absolute w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/80 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${progress}%`,
            top: `${Math.max(10, 50 - Math.sin((progress * Math.PI) / 100) * 35)}%`,
          }}
        ></div>
      </div>

      {/* Sunrise & Sunset Timestamps */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/50 light:border-slate-300">
        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4 text-amber-400" />
          <div>
            <p className="text-[10px] text-slate-400">Sunrise</p>
            <p className="text-xs font-bold text-slate-200 light:text-slate-800">{sunrise}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <div>
            <p className="text-[10px] text-slate-400 text-right">Sunset</p>
            <p className="text-xs font-bold text-slate-200 light:text-slate-800">{sunset}</p>
          </div>
          <Sunset className="w-4 h-4 text-indigo-400" />
        </div>
      </div>
    </motion.div>
  );
};
