const FavoriteCity = require('../models/FavoriteCity');

/**
 * @desc    Get all favorite cities from MongoDB Atlas
 * @route   GET /api/favorites
 * @access  Public
 */
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await FavoriteCity.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search / filter favorite cities in MongoDB Atlas
 * @route   GET /api/favorites/search?q=Mumbai
 * @access  Public
 */
const searchFavorites = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      const allFavorites = await FavoriteCity.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: allFavorites.length,
        data: allFavorites,
      });
    }

    const queryRegex = new RegExp(q.trim(), 'i');
    const filteredFavorites = await FavoriteCity.find({
      $or: [{ cityName: queryRegex }, { country: queryRegex }, { condition: queryRegex }],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: filteredFavorites.length,
      query: q.trim(),
      data: filteredFavorites,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new city to MongoDB Atlas favorites
 * @route   POST /api/favorites
 * @access  Public
 */
const addFavorite = async (req, res, next) => {
  try {
    const { cityName, name, country, latitude, lat, longitude, lon, temp, condition, iconType } = req.body;

    const targetCityName = (cityName || name || '').trim();

    if (!targetCityName) {
      return res.status(400).json({
        success: false,
        message: 'cityName parameter is required to save favorite',
      });
    }

    // Prevent duplicate entries
    const existing = await FavoriteCity.findOne({
      cityName: { $regex: new RegExp(`^${targetCityName}$`, 'i') },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `City '${targetCityName}' is already saved in your favorites.`,
        data: existing,
      });
    }

    const favorite = await FavoriteCity.create({
      cityName: targetCityName,
      country: country || '',
      latitude: latitude !== undefined ? latitude : lat !== undefined ? lat : null,
      longitude: longitude !== undefined ? longitude : lon !== undefined ? lon : null,
      temp: temp !== undefined ? temp : 25,
      condition: condition || 'Clear',
      iconType: iconType || 'sun',
      createdAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: `City '${targetCityName}' successfully added to MongoDB Atlas favorites!`,
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a favorite city by ID or City Name from MongoDB Atlas
 * @route   DELETE /api/favorites/:id
 * @access  Public
 */
const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    let favorite = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      favorite = await FavoriteCity.findById(id);
    } else {
      favorite = await FavoriteCity.findOne({
        cityName: { $regex: new RegExp(`^${id.trim()}$`, 'i') },
      });
    }

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: `Favorite city not found.`,
      });
    }

    await favorite.deleteOne();

    return res.status(200).json({
      success: true,
      message: `Favorite city '${favorite.cityName}' deleted successfully!`,
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavorites,
  searchFavorites,
  addFavorite,
  deleteFavorite,
};
