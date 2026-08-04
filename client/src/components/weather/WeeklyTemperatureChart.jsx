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
import { Bar } from 'react-chartjs-2';
import { Calendar } from 'lucide-react';
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
 * Weekly Temperature Chart Component built with Chart.js
 * Visualizes 7-Day daily high & low temperatures with responsive animations.
 */
export const WeeklyTemperatureChart = ({ weeklyData = [], unit = 'metric' }) => {
  const { theme } = useTheme();

  if (!weeklyData || weeklyData.length === 0) return null;

  const isDark = theme === 'dark';
  const unitSymbol = unit === 'imperial' ? '°F' : '°C';

  const labels = weeklyData.map((d) => d.day || '');
  const maxTemps = weeklyData.map((d) => d.maxTemp);
  const minTemps = weeklyData.map((d) => d.minTemp);

  const data = {
    labels,
    datasets: [
      {
        label: `High Temp (${unitSymbol})`,
        data: maxTemps,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 240);
          gradient.addColorStop(0, '#f97316');
          gradient.addColorStop(1, '#fbbf24');
          return gradient;
        },
        borderColor: '#f97316',
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: `Low Temp (${unitSymbol})`,
        data: minTemps,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 240);
          gradient.addColorStop(0, '#0284c7');
          gradient.addColorStop(1, '#38bdf8');
          return gradient;
        },
        borderColor: '#0284c7',
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeInOutCubic',
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
        padding: 12,
        callbacks: {
          beforeBody: (tooltipItems) => {
            const dataIndex = tooltipItems[0]?.dataIndex;
            if (dataIndex !== undefined && weeklyData[dataIndex]) {
              const item = weeklyData[dataIndex];
              return `Condition: ${item.condition || 'N/A'}\nRain: ${item.pop || '0%'}`;
            }
            return '';
          },
          label: (context) => ` ${context.dataset.label}: ${context.parsed.y}${unitSymbol}`,
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
      y: {
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
    },
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Weekly Temperature Chart
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">7-Day high and low temperature breakdown</p>
          </div>
        </div>
        <span className="text-xs text-sky-400 font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          7-Day Range
        </span>
      </div>

      <div className="w-full h-64 sm:h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
