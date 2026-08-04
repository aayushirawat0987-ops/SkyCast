import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home, CloudOff } from 'lucide-react';

/**
 * Global Error Page Component with Retry mechanics
 */
export const ErrorPage = ({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred while loading weather services.',
  onRetry = null,
}) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl border border-rose-500/30 space-y-6 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex p-4 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg">
          <CloudOff className="w-12 h-12 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Retry Request
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl glass-card text-slate-300 hover:text-white border border-white/10 font-bold text-xs transition-all"
          >
            <Home className="w-4 h-4" /> Return to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};
