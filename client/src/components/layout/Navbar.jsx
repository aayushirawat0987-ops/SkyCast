import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudSun, Sun, Moon, Home, BarChart2, Bookmark } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useWeatherContext } from '../../context/WeatherContext';

/**
 * Enhanced Navbar with Dark/Light theme toggle & Unit switcher
 */
export const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { unit, toggleUnit, searchedCity, searchCity } = useWeatherContext();

  const cities = ['Mumbai', 'Delhi', 'London', 'Tokyo'];

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/forecast', label: 'Forecast', icon: BarChart2 },
    { path: '/saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 group-hover:scale-110 transition-transform duration-300">
            <CloudSun className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-black bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              SkyCast
            </span>
            <span className="text-[10px] block font-bold text-sky-400 dark:text-sky-400 light:text-sky-600 tracking-wider uppercase">
              Weather AI
            </span>
          </div>
        </Link>

        {/* Quick City Selector Pill Buttons */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/40 light:bg-white/50 border border-white/10">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => searchCity(city)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                searchedCity.toLowerCase() === city.toLowerCase()
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Action Controls: Theme Switch, Unit Switch, Nav Links */}
        <div className="flex items-center gap-2">
          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-700/60 mx-1 hidden sm:block"></div>

          {/* Unit Toggle Button */}
          <button
            onClick={toggleUnit}
            className="px-2.5 py-1.5 text-xs font-extrabold rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-all shadow-sm"
            title="Toggle Temperature Unit (°C / °F)"
          >
            {unit === 'metric' ? '°C' : '°F'}
          </button>

          {/* Dark / Light Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-700/60 bg-slate-900/50 light:bg-white/80 text-amber-400 dark:text-amber-400 light:text-indigo-600 hover:scale-105 transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
