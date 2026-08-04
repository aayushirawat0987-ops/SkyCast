import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Reusable Empty State Component
 */
export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No Data Found',
  description = 'There are no items matching your request at this time.',
  actionLabel = null,
  onAction = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-10 text-center space-y-4 max-w-lg mx-auto border border-white/10 shadow-2xl relative overflow-hidden my-8"
    >
      <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="inline-flex p-4 rounded-3xl bg-slate-900/80 text-sky-400 border border-sky-500/30 shadow-lg">
        <Icon className="w-10 h-10 animate-pulse" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-black text-slate-100 light:text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <button
            onClick={onAction}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
};
