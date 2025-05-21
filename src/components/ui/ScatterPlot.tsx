import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';

interface ScatterPlotProps {
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  sizeDataKey?: string;
  colorDataKey?: string;
  className?: string;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xAxisDataKey,
  yAxisDataKey,
  sizeDataKey,
  colorDataKey,
  className = '',
}) => {
  const getColor = (entry: any) => {
    if (!colorDataKey) return '#0A3161';
    
    // Color scale based on the value of colorDataKey
    const value = entry[colorDataKey];
    const maxValue = Math.max(...data.map(item => item[colorDataKey]));
    const minValue = Math.min(...data.map(item => item[colorDataKey]));
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    
    // From navy to light blue color scale
    const r = Math.round(10 + normalizedValue * (125 - 10));
    const g = Math.round(49 + normalizedValue * (152 - 49));
    const b = Math.round(97 + normalizedValue * (179 - 97));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className={`h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey={xAxisDataKey} 
            name={xAxisDataKey} 
            domain={['dataMin', 'dataMax']}
            label={{ value: xAxisDataKey, position: 'bottom', style: { textAnchor: 'middle' } }}
          />
          <YAxis 
            type="number" 
            dataKey={yAxisDataKey} 
            name={yAxisDataKey} 
            domain={['dataMin', 'dataMax']}
            label={{ value: yAxisDataKey, angle: -90, position: 'left', style: { textAnchor: 'middle' } }}
          />
          {sizeDataKey && (
            <ZAxis
              type="number"
              dataKey={sizeDataKey}
              range={[60, 400]}
              name={sizeDataKey}
            />
          )}
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => [value, name]}
          />
          <Scatter
            name="Clients"
            data={data}
            fill="#0A3161"
            shape="circle"
          >
            {data.map((entry, index) => (
              <cell
                key={`cell-${index}`}
                fill={getColor(entry)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;