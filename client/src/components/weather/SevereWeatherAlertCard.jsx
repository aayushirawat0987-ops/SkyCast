import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, CloudRain, Flame, Snowflake, Wind, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { getSevereWeatherAlerts } from '../../utils/alertGenerator';

/**
 * Severe Weather Notification Alert Component featuring dismissible hazard cards
 */
export const SevereWeatherAlertCard = ({ weatherData }) => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [dismissedIds, setDismissedIds] = useState([]);

  useEffect(() => {
    if (weatherData) {
      const generatedAlerts = getSevereWeatherAlerts(weatherData);
      setActiveAlerts(generatedAlerts);
      setDismissedIds([]); // Reset dismissals on new city load
    }
  }, [weatherData]);

  const handleDismiss = (id) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  const handleDismissAll = () => {
    const allIds = activeAlerts.map((a) => a.id);
    setDismissedIds(allIds);
  };

  const visibleAlerts = activeAlerts.filter((alert) => !dismissedIds.includes(alert.id));

  if (!weatherData || visibleAlerts.length === 0) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'thunderstorm':
        return <Zap className="w-6 h-6 text-rose-400 animate-bounce" />;
      case 'storm':
        return <Wind className="w-6 h-6 text-purple-400 animate-pulse" />;
      case 'heavy_rain':
        return <CloudRain className="w-6 h-6 text-amber-400" />;
      case 'heatwave':
        return <Flame className="w-6 h-6 text-orange-400 animate-pulse" />;
      case 'snow':
        return <Snowflake className="w-6 h-6 text-cyan-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-3 my-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 animate-pulse text-rose-500" />
          <span>Active Severe Weather Warnings ({visibleAlerts.length})</span>
        </div>
        {visibleAlerts.length > 1 && (
          <button
            onClick={handleDismissAll}
            className="text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Dismiss All Alerts
          </button>
        )}
      </div>

      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-5 rounded-3xl ${alert.bgColor} border ${alert.borderColor} shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start justify-between gap-4`}
          >
            {/* Ambient Alert Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${alert.badgeColor} shadow-sm`}>
                    {alert.severity}
                  </span>
                  <h4 className={`text-sm sm:text-base font-black ${alert.textColor} tracking-tight`}>
                    {alert.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {alert.description}
                </p>

                <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-200/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span>Advice: {alert.advice}</span>
                </div>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => handleDismiss(alert.id)}
              className="p-2 rounded-xl bg-black/30 hover:bg-white/20 text-slate-400 hover:text-white transition-all flex-shrink-0 self-end sm:self-start border border-white/10"
              title="Dismiss Alert Notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
