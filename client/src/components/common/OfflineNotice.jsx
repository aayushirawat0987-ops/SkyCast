import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

/**
 * Offline Network Status Banner Component
 */
export const OfflineNotice = () => {
  const isOnline = useOnlineStatus();
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowRestoredNotice(true);
      const timer = setTimeout(() => {
        setShowRestoredNotice(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-rose-950/90 text-rose-200 border border-rose-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-bold"
        >
          <WifiOff className="w-4 h-4 text-rose-400 animate-pulse flex-shrink-0" />
          <span>You are currently offline. Showing cached local weather metrics.</span>
          <button
            onClick={() => window.location.reload()}
            className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors ml-1"
            title="Reload page"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {isOnline && showRestoredNotice && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-950/90 text-emerald-200 border border-emerald-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-bold"
        >
          <Wifi className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Internet connection restored. Live sync active!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
