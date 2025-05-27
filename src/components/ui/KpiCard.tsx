import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

interface KpiCardProps {
  title: string;
  value?: number;
  trend?: number;
  unit?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
  className?: string;
  type?: 'sparkline' | 'speedometer' | 'modules';
  modules?: { name: string; value: number }[];
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  unit,
  icon,
  sparklineData,
  className = '',
  type = 'sparkline',
  modules,
}) => {
  // Format the value for display (only for non-modules types)
  const formattedValue = unit === '%' || unit === '/100'
    ? `${value}${unit}`
    : formatNumber(value ?? 0);

  // Determine color for speedometer based on value
  const getSpeedometerColor = (value: number) => {
    if (value >= 80) return '#22c55e'; // Green for 80-100
    if (value >= 60) return '#facc15'; // Yellow for 60-79
    return '#ef4444'; // Red for 0-59
  };

  // Speedometer data for Chart.js doughnut chart
  const speedometerData = {
    datasets: [
      {
        data: value != null ? [value, 100 - value] : [100],
        backgroundColor: value != null ? [getSpeedometerColor(value), '#e5e7eb'] : ['#e5e7eb'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const speedometerOptions = {
    cutout: '80%',
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  const renderTrend = () => {
    if (trend === undefined) return null;

    const trendClass = trend >= 0 ? 'text-sage' : 'text-burgundy';
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;

    return (
      <div className={`flex items-center gap-1 text-sm ${trendClass}`}>
        <TrendIcon size={14} />
        <span>{formatPercentage(Math.abs(trend))}</span>
      </div>
    );
  };

  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min;

    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="mt-2 h-8">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(10, 49, 97, 0.2)" />
              <stop offset="100%" stopColor="rgba(10, 49, 97, 0)" />
            </linearGradient>
          </defs>
          <path
            d={`M0,100 L0,${100 - ((sparklineData[0] - min) / range) * 100} ${points} L100,100 Z`}
            fill="url(#sparkline-gradient)"
          />
          <polyline
            points={points}
            stroke="#0A3161"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  const renderSpeedometer = () => {
    return (
      <div className="mt-2 flex items-center justify-center">
        <div className="relative h-20 w-40">
          <Doughnut data={speedometerData} options={speedometerOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {value}
              {unit && <span className="text-sm">{unit}</span>}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderModules = () => {
    if (!modules || modules.length === 0) return null;

    return (
      <div className="mt-2 flex flex-row gap-2 h-12 overflow-x-auto">
        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-white border border-silver rounded-lg p-1 text-center w-24 flex-shrink-0"
          >
            <div className="text-xs text-charcoal-light truncate">{module.name}</div>
            <div className="text-sm font-bold text-navy">{module.value}ms</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg border border-silver p-4 hover:shadow-card-hover transition-shadow h-56 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-charcoal-light mb-1">{title}</div>
          {type !== 'modules' && value != null && (
            <div className="text-2xl font-bold text-navy">
              {formattedValue}
              {unit && unit !== '%' && unit !== '/100' && <span className="text-sm ml-1">{unit}</span>}
            </div>
          )}
          {renderTrend()}
        </div>
        {icon && <div className="text-navy ml-3">{icon}</div>}
      </div>
      {type === 'speedometer' ? renderSpeedometer() : type === 'modules' ? renderModules() : renderSparkline()}
    </div>
  );
};

export default KpiCard;