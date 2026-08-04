const express = require('express');
const cors = require('cors');
const path = require('path');
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

// Serve Client Static Assets in Production / Cloud Deployments
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexFile = path.join(clientDistPath, 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      res.status(404).send('SkyCast Frontend Bundle Not Found. Please run "npm run build" in client.');
    }
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SkyCast Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
