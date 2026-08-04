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
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
 * Temperature Trend Chart Component built with Chart.js
 * Shows smooth continuous temperature curve with responsive styling & animations.
 */
export const TemperatureTrendChart = ({ hourlyData = [], unit = 'metric' }) => {
  const { theme } = useTheme();

  if (!hourlyData || hourlyData.length === 0) return null;

  const isDark = theme === 'dark';
  const unitSymbol = unit === 'imperial' ? '°F' : '°C';

  const labels = hourlyData.map((d) => d.time || '');
  const temps = hourlyData.map((d) => d.temp);

  const data = {
    labels,
    datasets: [
      {
        label: `Temperature (${unitSymbol})`,
        data: temps,
        borderColor: isDark ? '#38bdf8' : '#0284c7',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          if (isDark) {
            gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
            gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
            gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
          } else {
            gradient.addColorStop(0, 'rgba(2, 132, 199, 0.35)');
            gradient.addColorStop(0.7, 'rgba(2, 132, 199, 0.05)');
            gradient.addColorStop(1, 'rgba(2, 132, 199, 0.0)');
          }
          return gradient;
        },
        fill: true,
        tension: 0.45,
        pointBackgroundColor: isDark ? '#0284c7' : '#0369a1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#38bdf8',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#38bdf8' : '#0284c7',
        borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.3)',
        borderWidth: 1.5,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        displayColors: false,
        callbacks: {
          label: (context) => ` Temp: ${context.parsed.y}${unitSymbol}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 11, weight: '600', family: 'Inter, sans-serif' },
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(203, 213, 225, 0.6)',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 11, weight: '600', family: 'Inter, sans-serif' },
          callback: (val) => `${val}${unitSymbol}`,
        },
      },
    },
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Temperature Trend
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Smooth continuous temperature progression</p>
          </div>
        </div>
        <span className="text-xs text-sky-400 font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          Animated Line Chart
        </span>
      </div>

      <div className="w-full h-64 sm:h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
