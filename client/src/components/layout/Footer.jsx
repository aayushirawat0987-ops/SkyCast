import React from 'react';
import { CloudSun, Heart, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * Modern Glassmorphic Footer Component
 */
export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 light:border-slate-300 bg-slate-950/60 light:bg-white/60 backdrop-blur-xl py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-200 light:text-slate-900 tracking-tight">
                SkyCast Weather Intelligence
              </span>
              <p className="text-xs text-slate-400">
                Precision forecasts, real-time AQI tracking, and interactive temperature graphics.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/60 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-sky-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> React 18 + Vite
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/60 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> OpenWeather API
            </span>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-6 border-t border-slate-800/60 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} SkyCast Weather App. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Crafted with  weather enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};
