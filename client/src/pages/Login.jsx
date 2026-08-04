import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, Sparkles, CloudSun } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

/**
 * Modern Glassmorphic Login Page Component
 */
export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authLoading, authError, setAuthError } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) {
      setLocalError('Please enter both email address and password.');
      return;
    }

    const res = await login(email.trim(), password);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden space-y-6"
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-2 relative">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 mb-1">
            <CloudSun className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            Welcome Back to <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">SkyCast</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Sign in to access your saved favorite cities and personal weather AI insights.
          </p>
        </div>

        {/* Error Notification Alert */}
        {(localError || authError) && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{localError || authError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 light:text-slate-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (localError) setLocalError(null);
                  if (authError) setAuthError(null);
                }}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/60 light:bg-white/80 border border-white/10 text-slate-100 light:text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                required
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 light:text-slate-700">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (localError) setLocalError(null);
                  if (authError) setAuthError(null);
                }}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/60 light:bg-white/80 border border-white/10 text-slate-100 light:text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                required
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-sky-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {authLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Navigation to Register */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Don't have a SkyCast account?{' '}
            <Link to="/register" className="font-bold text-sky-400 hover:text-sky-300 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
