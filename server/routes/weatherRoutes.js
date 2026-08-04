const express = require('express');
const router = express.Router();
const {
  getWeatherByCity,
  getForecast,
  getWeatherByCoords,
} = require('../controllers/weatherController');

// Weather Endpoints
router.get('/', getWeatherByCity);
router.get('/forecast', getForecast);
router.get('/coords', getWeatherByCoords);

module.exports = router;
