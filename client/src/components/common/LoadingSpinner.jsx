import React from 'react';

/**
 * Reusable animated loading spinner component
 */
export const LoadingSpinner = ({ label = 'Fetching weather data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-400 rounded-full animate-spin"></div>
      {label && <p className="text-sm font-medium text-slate-400 animate-pulse">{label}</p>}
    </div>
  );
};
