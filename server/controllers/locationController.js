const Location = require('../models/Location');

/**
 * @desc    Get all saved user locations
 * @route   GET /api/locations
 * @access  Public
 */
const getSavedLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Save a new location
 * @route   POST /api/locations
 * @access  Public
 */
const saveLocation = async (req, res, next) => {
  try {
    const { name, country, lat, lon } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Please provide location name');
    }

    const location = await Location.create({ name, country, lat, lon });
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a saved location
 * @route   DELETE /api/locations/:id
 * @access  Public
 */
const deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      res.status(404);
      throw new Error('Location not found');
    }

    await location.deleteOne();
    res.status(200).json({ success: true, message: 'Location deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSavedLocations,
  saveLocation,
  deleteLocation,
};
