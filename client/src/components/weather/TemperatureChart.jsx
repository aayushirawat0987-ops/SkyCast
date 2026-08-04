import React from 'react';
import { TemperatureTrendChart } from './TemperatureTrendChart';

/**
 * Backward compatible TemperatureChart export mapping to TemperatureTrendChart
 */
export const TemperatureChart = (props) => {
  return <TemperatureTrendChart {...props} />;
};

export { TemperatureTrendChart };
