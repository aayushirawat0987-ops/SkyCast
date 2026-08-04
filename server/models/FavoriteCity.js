const mongoose = require('mongoose');

/**
 * FavoriteCity Model for SkyCast MongoDB Atlas Database
 * Fields: cityName, country, latitude, longitude, createdAt
 */
const FavoriteCitySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: [true, 'cityName is required'],
      trim: true,
    },
    country: {
      type: String,
      default: '',
      trim: true,
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    temp: {
      type: Number,
      default: 25,
    },
    condition: {
      type: String,
      default: 'Clear',
    },
    iconType: {
      type: String,
      default: 'sun',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual alias for backward compatibility with frontend
FavoriteCitySchema.virtual('name').get(function () {
  return this.cityName;
});

FavoriteCitySchema.virtual('lat').get(function () {
  return this.latitude;
});

FavoriteCitySchema.virtual('lon').get(function () {
  return this.longitude;
});

module.exports = mongoose.model('FavoriteCity', FavoriteCitySchema);
