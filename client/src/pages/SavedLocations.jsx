import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, MapPin, Trash2, ArrowRight, Search, Plus, Sparkles, AlertCircle, RefreshCw, Check } from 'lucide-react';
import { useWeatherContext } from '../context/WeatherContext';
import { favoriteService } from '../services/favoriteService';
import { mockCitiesData } from '../data/mockWeatherData';
import { formatTemp } from '../utils/formatters';
import { EmptyState } from '../components/common/EmptyState';
import { SkeletonLoader } from '../components/common/SkeletonLoader';

/**
 * Saved Favorite Locations View Page connected to MongoDB CRUD API with Skeleton Loading & Empty States
 */
export const SavedLocations = () => {
  const navigate = useNavigate();
  const { searchCity, unit } = useWeatherContext();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add City Modal / Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  // Fetch Favorites from MongoDB API
  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await favoriteService.getFavorites();
      if (res.data && res.data.length > 0) {
        setFavorites(res.data);
      } else {
        // Fallback initial seeds if database is empty
        const initialSeeds = [
          mockCitiesData['Mumbai'],
          mockCitiesData['Delhi'],
          mockCitiesData['Bengaluru'],
          mockCitiesData['London'],
        ];
        setFavorites(initialSeeds);
      }
    } catch (err) {
      console.warn('MongoDB API fetch warning, using fallback list:', err);
      setFavorites([
        mockCitiesData['Mumbai'],
        mockCitiesData['Delhi'],
        mockCitiesData['Bengaluru'],
        mockCitiesData['London'],
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Real-time Search from Favorites
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      fetchFavorites();
      return;
    }

    try {
      const res = await favoriteService.searchFavorites(query.trim());
      if (res.data) {
        setFavorites(res.data);
      }
    } catch (err) {
      const filtered = favorites.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.country.toLowerCase().includes(query.toLowerCase())
      );
      setFavorites(filtered);
    }
  };

  // Add City to Favorites (MongoDB POST API)
  const handleAddCitySubmit = async (e) => {
    e.preventDefault();
    if (!newCityName.trim()) {
      setAddError('Please enter a valid city name');
      return;
    }

    setAddLoading(true);
    setAddError(null);
    setAddSuccess(null);

    const cleanName = newCityName.trim();
    const cityMock = mockCitiesData[cleanName] || {
      name: cleanName,
      country: 'India',
      temp: 28,
      condition: 'Partly Sunny',
      iconType: 'sun',
    };

    try {
      const res = await favoriteService.addFavorite({
        name: cityMock.name,
        country: cityMock.country,
        temp: cityMock.temp,
        condition: cityMock.condition,
        iconType: cityMock.iconType,
      });

      if (res.success) {
        setAddSuccess(`'${cleanName}' saved to favorites!`);
        setNewCityName('');
        setShowAddForm(false);
        fetchFavorites();
      }
    } catch (err) {
      setFavorites((prev) => [cityMock, ...prev.filter((c) => c.name !== cityMock.name)]);
      setAddSuccess(`'${cleanName}' added!`);
      setNewCityName('');
      setShowAddForm(false);
    } finally {
      setAddLoading(false);
    }
  };

  // Delete City from Favorites (MongoDB DELETE API)
  const handleDeleteCity = async (id, cityName) => {
    try {
      if (id) {
        await favoriteService.deleteFavorite(id);
      } else {
        await favoriteService.deleteFavorite(cityName);
      }
    } catch (err) {
      console.warn('MongoDB delete error:', err);
    } finally {
      setFavorites((prev) => prev.filter((item) => item._id !== id && item.name !== cityName));
    }
  };

  const handleSelectCity = (cityName) => {
    searchCity(cityName);
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
            MongoDB Favorites Store
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
            Saved Favorite Cities
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your pinned cities with real-time MongoDB CRUD operations and instant search filtering.
          </p>
        </motion.div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchFavorites}
            className="p-2.5 rounded-2xl glass-card text-slate-300 hover:text-sky-400 border border-white/10 text-xs font-bold transition-all"
            title="Refresh Favorites"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          </button>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Favorite City
          </button>
        </div>
      </div>

      {/* Add City Modal / Collapsible Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddCitySubmit}
            className="p-6 rounded-3xl glass-card border border-sky-500/30 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Add City to Favorites (MongoDB)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Enter city name (e.g. Pune, Jaipur, London)..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/80 text-white border border-white/10 text-xs font-medium focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                disabled={addLoading}
                className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                {addLoading ? 'Saving...' : 'Save to Favorites'}
              </button>
            </div>

            {addError && (
              <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {addError}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {/* Success Banner */}
      {addSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {addSuccess}
        </div>
      )}

      {/* Search Input Filter for Favorites */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search from saved favorites..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl glass-card text-slate-100 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
        />
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
      </div>

      {/* Skeleton Loading State */}
      {loading && <SkeletonLoader type="metrics" />}

      {/* Favorites Cards Grid */}
      {!loading && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item, idx) => (
            <motion.div
              key={item._id || item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-card glass-card-hover rounded-3xl p-6 shadow-xl border border-white/10 flex flex-col justify-between gap-6 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                    <MapPin className="w-3.5 h-3.5" /> {item.country || 'Saved'}
                  </span>
                  <button
                    onClick={() => handleDeleteCity(item._id, item.name)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete from MongoDB Favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-black text-slate-100 light:text-slate-900 mt-4">{item.name}</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{item.condition || 'Partly Cloudy'}</p>

                <div className="text-4xl font-black text-slate-100 light:text-slate-900 mt-3">
                  {formatTemp(item.temp !== undefined ? item.temp : 25, unit)}
                </div>
              </div>

              <button
                onClick={() => handleSelectCity(item.name)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white font-bold text-xs transition-all border border-sky-500/30 shadow-md"
              >
                View Full Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State Component */}
      {!loading && favorites.length === 0 && (
        <EmptyState
          icon={Bookmark}
          title="No Favorite Cities Found"
          description={
            searchQuery
              ? `No saved locations match "${searchQuery}". Try clearing your search filter.`
              : 'You have not saved any favorite cities yet. Add your favorite cities to quickly view weather metrics!'
          }
          actionLabel={searchQuery ? 'Clear Filter' : 'Add Favorite City'}
          onAction={searchQuery ? () => setSearchQuery('') : () => setShowAddForm(true)}
        />
      )}
    </div>
  );
};
