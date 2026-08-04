import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, AlertCircle, CloudSun } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

/**
 * Modern Glassmorphic Registration Page Component
 */
export const Register = () => {
  const navigate = useNavigate();
  const { register, authLoading, authError, setAuthError } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!name.trim() || !email.trim() || !password) {
      setLocalError('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match. Please verify your password.');
      return;
    }

    const res = await register(name.trim(), email.trim(), password);
    if (res.success) {
      navigate('/saved', { replace: true });
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
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-2 relative">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 mb-1">
            <CloudSun className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            Create Your <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">SkyCast</span> Account
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Register to save your favorite cities in MongoDB and sync your personal weather dashboard.
          </p>
        </div>

        {/* Error Notification Alert */}
        {(localError || authError) && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{localError || authError}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 light:text-slate-700">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (localError) setLocalError(null);
                  if (authError) setAuthError(null);
                }}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/60 light:bg-white/80 border border-white/10 text-slate-100 light:text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                required
              />
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

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
                placeholder="At least 6 characters"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/60 light:bg-white/80 border border-white/10 text-slate-100 light:text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                required
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 light:text-slate-700">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (localError) setLocalError(null);
                  if (authError) setAuthError(null);
                }}
                placeholder="Re-enter password"
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
            <UserPlus className="w-4 h-4" />
            {authLoading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        {/* Navigation to Login */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-sky-400 hover:text-sky-300 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
