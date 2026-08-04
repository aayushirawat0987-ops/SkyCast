import React from 'react';
import { Link } from 'react-router-dom';
import { CloudOff } from 'lucide-react';

/**
 * 404 Not Found Page Component
 */
export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-sky-400 mb-4">
        <CloudOff className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-sm mb-6">
        The page or weather route you are searching for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-colors shadow-lg shadow-sky-500/20"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};
