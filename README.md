# SkyCast - Modern Full-Stack Weather Application 🌤️

SkyCast is a high-performance, full-stack weather application built with React (Vite), Node.js, Express.js, MongoDB (Mongoose), Tailwind CSS, Chart.js, and Framer Motion.

---

## 🏗️ Architecture & Project Structure

```text
SKYCAST/
├── client/                     # Frontend Application (React 18 + Vite)
│   ├── public/                 # Favicons & static assets
│   ├── src/
│   │   ├── assets/             # Weather illustrations & icons
│   │   ├── components/         # Reusable React components
│   │   │   ├── common/         # LoadingSpinner, Buttons, Cards
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── weather/        # WeatherCard, ForecastChart
│   │   │   └── search/         # SearchBar
│   │   ├── pages/              # Home, Forecast, SavedLocations, NotFound
│   │   ├── services/           # Axios HTTP Client & API wrappers
│   │   ├── context/            # React Context (Weather state, °C/°F units)
│   │   ├── hooks/              # Custom hooks (useWeather)
│   │   ├── utils/              # Temperature & date formatters
│   │   ├── App.jsx             # React Router setup
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind CSS baseline & glassmorphism
│   ├── index.html              # HTML shell & Google Fonts
│   ├── vite.config.js          # Vite config & dev API proxy
│   ├── tailwind.config.js      # Tailwind custom theme & animations
│   ├── postcss.config.js       # PostCSS config
│   └── package.json            # Frontend dependencies
│
├── server/                     # Backend Application (Node.js + Express)
│   ├── config/                 # MongoDB database connection (db.js)
│   ├── controllers/            # Request handlers (weatherController, locationController)
│   ├── models/                 # Mongoose schema (Location.js)
│   ├── routes/                 # Express API routes (/api/weather, /api/locations)
│   ├── middleware/             # Error handling middleware
│   ├── utils/                  # OpenWeatherMap API service wrapper
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Entry point Express server
│   └── package.json            # Backend dependencies
│
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 📦 Installed Tech Stack & Dependencies

### Frontend (`client/`)
- **Core Framework**: `react`, `react-dom`, `react-router-dom`
- **Build Tool**: `vite`, `@vitejs/plugin-react`
- **Styling**: `tailwindcss`, `postcss`, `autoprefixer`
- **Data Visualization**: `chart.js`, `react-chartjs-2`
- **Animations**: `framer-motion`
- **Icons**: `lucide-react`
- **HTTP Client**: `axios`

### Backend (`server/`)
- **Core Framework**: `express`, `node`
- **Database**: `mongoose` (MongoDB)
- **Utilities**: `dotenv`, `cors`, `axios`
- **Development Tool**: `nodemon`

---

## ⚡ Quick Start & Installation Guide

### 1. Install Client Dependencies
```bash
cd client
npm install
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env` in the `server/` directory and configure your OpenWeatherMap API key and MongoDB URI:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/skycast
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 4. Run Development Servers
- **Backend Server** (Port 5000):
  ```bash
  cd server
  npm run dev
  ```
- **Frontend App** (Port 3000):
  ```bash
  cd client
  npm run dev
  ```
