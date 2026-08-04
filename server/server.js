const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'SkyCast Backend Service Active' });
});

// API Routes
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SkyCast Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
