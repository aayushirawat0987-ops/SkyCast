import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * ForecastChart Component using Chart.js & react-chartjs-2
 */
export const ForecastChart = ({ forecastList = [] }) => {
  if (!forecastList || forecastList.length === 0) return null;

  // Filter 5 data points (e.g. daily forecasts at 12:00)
  const filtered = forecastList.filter((_, idx) => idx % 8 === 0).slice(0, 5);

  const labels = filtered.map((item) => formatDate(item.dt));
  const temps = filtered.map((item) => Math.round(item.main.temp));

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0284c7',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#38bdf8',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' },
      },
      y: {
        grid: { color: 'rgba(51, 65, 85, 0.4)' },
        ticks: { color: '#94a3b8' },
      },
    },
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl">
      <h3 className="text-lg font-bold text-slate-200 mb-4">5-Day Temperature Trend</h3>
      <div className="w-full h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
