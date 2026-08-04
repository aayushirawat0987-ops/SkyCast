import React from 'react';
import { motion } from 'framer-motion';

/**
 * Glassmorphic Skeleton Loading Components
 */
export const HeroWeatherSkeleton = () => (
  <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-pulse border border-white/10">
    <div className="flex flex-col sm:flex-row justify-between gap-4 pb-6 border-b border-white/10">
      <div className="space-y-3 flex-1">
        <div className="h-6 w-36 bg-slate-800/80 rounded-full"></div>
        <div className="h-10 w-56 bg-slate-800/80 rounded-2xl"></div>
        <div className="h-4 w-40 bg-slate-800/60 rounded-xl"></div>
      </div>
      <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl w-48 h-24">
        <div className="w-16 h-16 bg-slate-800/80 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-8 w-20 bg-slate-800/80 rounded-xl"></div>
          <div className="h-3 w-16 bg-slate-800/60 rounded-lg"></div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-900/50 rounded-2xl"></div>
      ))}
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="glass-card rounded-3xl p-6 space-y-4 animate-pulse border border-white/10">
    <div className="flex items-center justify-between">
      <div className="h-6 w-48 bg-slate-800/80 rounded-xl"></div>
      <div className="h-8 w-36 bg-slate-800/60 rounded-xl"></div>
    </div>
    <div className="h-64 w-full bg-slate-900/60 rounded-2xl flex items-end p-4 gap-3">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-slate-800/50 rounded-t-xl"
          style={{ height: `${30 + (i % 5) * 15}%` }}
        ></div>
      ))}
    </div>
  </div>
);

export const MetricGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-44 glass-card rounded-3xl p-5 bg-slate-900/60 border border-white/10"></div>
    ))}
  </div>
);

export const SkeletonLoader = ({ type = 'all' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 py-4"
    >
      {(type === 'hero' || type === 'all') && <HeroWeatherSkeleton />}
      {(type === 'charts' || type === 'all') && <ChartSkeleton />}
      {(type === 'metrics' || type === 'all') && <MetricGridSkeleton />}
    </motion.div>
  );
};
