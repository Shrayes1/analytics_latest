import React from 'react';

interface ResourceGaugeProps {
  value: number;
  max: number;
  warning: number;
  label: string;
}

const ResourceGauge: React.FC<ResourceGaugeProps> = ({ value, max, warning, label }) => {
  const percentage = (value / max) * 100;
  const warningPercentage = (warning / max) * 100;

  const getColor = () => {
    if (percentage >= warningPercentage) return 'bg-burgundy';
    if (percentage >= warningPercentage * 0.8) return 'bg-gold';
    return 'bg-sage';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-silver rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ResourceGauge;