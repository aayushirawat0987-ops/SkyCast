import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ForecastPage } from './pages/ForecastPage';
import { SavedLocations } from './pages/SavedLocations';
import { NotFound } from './pages/NotFound';
import { OfflineNotice } from './components/common/OfflineNotice';
import { AnimatedPage } from './components/common/AnimatedPage';

/**
 * Animated Routes switcher for smooth page transitions
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/forecast"
          element={
            <AnimatedPage>
              <ForecastPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/saved"
          element={
            <AnimatedPage>
              <SavedLocations />
            </AnimatedPage>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedPage>
              <NotFound />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * Root SkyCast Application Component
 */
export function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Router>
          <div className="flex flex-col min-h-screen transition-colors duration-300 relative">
            <OfflineNotice />
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
