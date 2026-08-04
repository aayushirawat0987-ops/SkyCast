import api from './api';

/**
 * Service layer for interacting with MongoDB Favorite Cities CRUD API
 */
export const favoriteService = {
  /**
   * Fetch all favorite cities from MongoDB
   */
  getFavorites: async () => {
    return api.get('/favorites');
  },

  /**
   * Search / filter favorite cities in MongoDB
   * @param {string} query Search term matching city name or country
   */
  searchFavorites: async (query) => {
    return api.get(`/favorites/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Add a new city to MongoDB favorites
   * @param {Object} cityPayload City details (name, country, temp, condition, iconType, lat, lon)
   */
  addFavorite: async (cityPayload) => {
    return api.post('/favorites', cityPayload);
  },

  /**
   * Delete a city from MongoDB favorites by ID or Name
   * @param {string} id Mongo ObjectId or city name
   */
  deleteFavorite: async (id) => {
    return api.delete(`/favorites/${encodeURIComponent(id)}`);
  },
};
