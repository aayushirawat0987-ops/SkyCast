const express = require('express');
const router = express.Router();
const {
  getSavedLocations,
  saveLocation,
  deleteLocation,
} = require('../controllers/locationController');

// Location Endpoints
router.route('/').get(getSavedLocations).post(saveLocation);
router.route('/:id').delete(deleteLocation);

module.exports = router;
