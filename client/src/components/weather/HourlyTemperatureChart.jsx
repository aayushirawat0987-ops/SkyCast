import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Hourly Temperature Chart Component built with Chart.js
 * Renders 24-hour temperature breakdown & precipitation chance overlay.
 */
export const HourlyTemperatureChart = ({ hourlyData = [], unit = 'metric' }) => {
  const { theme } = useTheme();

  if (!hourlyData || hourlyData.length === 0) return null;

  const isDark = theme === 'dark';
  const unitSymbol = unit === 'imperial' ? '°F' : '°C';

  const labels = hourlyData.map((d) => d.time || '');
  const temps = hourlyData.map((d) => d.temp);
  const precipData = hourlyData.map((d) => {
    if (typeof d.pop === 'string') {
      return parseInt(d.pop.replace('%', ''), 10) || 0;
    }
    return typeof d.pop === 'number' ? Math.round(d.pop * 100) : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: `Temperature (${unitSymbol})`,
        data: temps,
        borderColor: isDark ? '#38bdf8' : '#0284c7',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          if (isDark) {
            gradient.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
            gradient.addColorStop(1, 'rgba(56, 189, 248, 0.01)');
          } else {
            gradient.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
            gradient.addColorStop(1, 'rgba(2, 132, 199, 0.01)');
          }
          return gradient;
        },
        fill: true,
        tension: 0.4,
        yAxisID: 'yTemp',
        pointBackgroundColor: isDark ? '#38bdf8' : '#0284c7',
        pointBorderColor: '#ffffff',
        pointRadius: 4,
        pointHoverRadius: 7,
      },
      {
        type: 'bar',
        label: 'Rain Chance (%)',
        data: precipData,
        backgroundColor: isDark ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.2)',
        borderColor: isDark ? 'rgba(56, 189, 248, 0.5)' : 'rgba(2, 132, 199, 0.4)',
        borderWidth: 1.5,
        borderRadius: 6,
        yAxisID: 'yPrecip',
        barThickness: 16,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: isDark ? '#cbd5e1' : '#475569',
          font: { size: 11, weight: '600', family: 'Inter, sans-serif' },
          boxWidth: 12,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#e2e8f0' : '#1e293b',
        borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.3)',
        borderWidth: 1.5,
        padding: 10,
        callbacks: {
          label: (context) => {
            if (context.dataset.yAxisID === 'yTemp') {
              return ` Temperature: ${context.parsed.y}${unitSymbol}`;
            }
            return ` Rain Chance: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 11, weight: '600' },
        },
      },
      yTemp: {
        type: 'linear',
        position: 'left',
        grid: {
          color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(203, 213, 225, 0.6)',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
          font: { size: 11, weight: '600' },
          callback: (val) => `${val}${unitSymbol}`,
        },
      },
      yPrecip: {
        type: 'linear',
        position: 'right',
        min: 0,
        max: 100,
        grid: { display: false },
        ticks: {
          color: isDark ? '#38bdf8' : '#0284c7',
          font: { size: 10, weight: '600' },
          callback: (val) => `${val}%`,
        },
      },
    },
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Hourly Temperature Chart
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">24-hour temperature & rain probability breakdown</p>
          </div>
        </div>
        <span className="text-xs text-sky-400 font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          Hourly Combo
        </span>
      </div>

      <div className="w-full h-64 sm:h-72">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};
