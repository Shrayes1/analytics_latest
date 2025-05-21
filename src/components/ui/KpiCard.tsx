import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../utils/formatters';

interface KpiCardProps {
  title: string;
  value: number;
  trend?: number;
  unit?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  unit,
  icon,
  sparklineData,
  className = '',
}) => {
  const formattedValue = unit === '%' 
    ? `${value}${unit}`
    : formatNumber(value);
    
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

  return (
    <div className={`bg-white rounded-lg border border-silver p-4 hover:shadow-card-hover transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-charcoal-light mb-1">{title}</div>
          <div className="text-2xl font-bold text-navy">
            {formattedValue}
            {unit && unit !== '%' && <span className="text-sm ml-1">{unit}</span>}
          </div>
          {renderTrend()}
        </div>
        {icon && <div className="text-navy ml-3">{icon}</div>}
      </div>
      {renderSparkline()}
    </div>
  );
};

export default KpiCard;