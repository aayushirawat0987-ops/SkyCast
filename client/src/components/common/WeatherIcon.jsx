import React from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  Cloud,
  Snowflake,
  Wind,
  Moon,
  CloudDrizzle,
} from 'lucide-react';

/**
 * Animated Weather Condition Icon Component using Framer Motion
 */
export const WeatherIcon = ({ iconType = 'sun', className = 'w-12 h-12' }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'sun':
        return {
          Component: Sun,
          color: 'text-amber-400',
          animate: { rotate: 360 },
          transition: { repeat: Infinity, duration: 20, ease: 'linear' },
        };
      case 'cloudy-sun':
        return {
          Component: CloudSun,
          color: 'text-sky-400',
          animate: { y: [0, -4, 0] },
          transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
        };
      case 'rain-light':
      case 'drizzle':
        return {
          Component: CloudDrizzle,
          color: 'text-blue-400',
          animate: { y: [0, 3, 0] },
          transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        };
      case 'rain-heavy':
        return {
          Component: CloudRain,
          color: 'text-blue-500',
          animate: { y: [0, 5, 0] },
          transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
        };
      case 'thunderstorm':
        return {
          Component: CloudLightning,
          color: 'text-amber-300',
          animate: { scale: [1, 1.1, 1] },
          transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
        };
      case 'cloud':
        return {
          Component: Cloud,
          color: 'text-slate-400',
          animate: { x: [-2, 2, -2] },
          transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
        };
      case 'snow':
        return {
          Component: Snowflake,
          color: 'text-cyan-300',
          animate: { rotate: [-10, 10, -10] },
          transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        };
      case 'wind':
        return {
          Component: Wind,
          color: 'text-emerald-400',
          animate: { x: [0, 6, 0] },
          transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
        };
      case 'moon':
      case 'cloudy-night':
        return {
          Component: Moon,
          color: 'text-indigo-300',
          animate: { rotate: [-5, 5, -5] },
          transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
        };
      default:
        return {
          Component: Sun,
          color: 'text-amber-400',
          animate: { rotate: 360 },
          transition: { repeat: Infinity, duration: 20, ease: 'linear' },
        };
    }
  };

  const { Component, color, animate, transition } = getIcon();

  return (
    <motion.div animate={animate} transition={transition} className="inline-block">
      <Component className={`${className} ${color} drop-shadow-lg`} />
    </motion.div>
  );
};
