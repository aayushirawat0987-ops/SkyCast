import { useState, useCallback } from 'react';

/**
 * Custom hook for interacting with the browser Geolocation API
 */
export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const requestLocation = useCallback((onSuccess, onError) => {
    if (!navigator.geolocation) {
      const errMsg = 'Geolocation is not supported by your browser.';
      setGeoError(errMsg);
      if (onError) onError(errMsg);
      return;
    }

    setGeoLoading(true);
    setGeoError(null);
    setPermissionDenied(false);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes cache
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoords({ lat: latitude, lon: longitude });
        setGeoLoading(false);
        if (onSuccess) onSuccess({ lat: latitude, lon: longitude });
      },
      (error) => {
        setGeoLoading(false);
        let errorMsg = 'Failed to retrieve location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Location permission was denied. You can search for any city manually above.';
            setPermissionDenied(true);
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'Location information is currently unavailable.';
            break;
          case error.TIMEOUT:
            errorMsg = 'The request to detect location timed out.';
            break;
          default:
            errorMsg = 'An unknown geolocation error occurred.';
            break;
        }

        setGeoError(errorMsg);
        if (onError) onError(errorMsg);
      },
      options
    );
  }, []);

  return { coords, geoLoading, geoError, permissionDenied, requestLocation };
};
