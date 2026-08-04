const express = require('express');
const router = express.Router();
const {
  getFavorites,
  searchFavorites,
  addFavorite,
  deleteFavorite,
} = require('../controllers/favoriteController');

// Open Favorite City API Endpoints (No Login Required)
router.get('/search', searchFavorites);

router.route('/')
  .get(getFavorites)
  .post(addFavorite);

router.route('/:id')
  .delete(deleteFavorite);

module.exports = router;
