import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  innerRadius = 60,
  outerRadius = 80,
  className = '',
}) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-semibold"
        style={{ 
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          fontSize: '12px',
          fontWeight: 600
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-silver">
          <p className="font-medium text-navy mb-1">{data.name}</p>
          <p className="text-sm text-charcoal">
            Value: {data.value}
          </p>
          <p className="text-sm text-charcoal-light">
            {((data.value / total) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegendText = (value: string, entry: any) => {
    const percentage = ((entry.payload.value / total) * 100).toFixed(1);
    return (
      <span className="text-sm text-charcoal">
        {value} ({percentage}%)
      </span>
    );
  };

  return (
    <div className={`h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            animationBegin={0}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={renderLegendText}
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;