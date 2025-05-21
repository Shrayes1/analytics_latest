import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface HeatMapProps {
  data: any[];
  xAxisDataKey: string;
  yAxisDataKey: string;
  valueDataKey: string;
  className?: string;
}

const HeatMap: React.FC<HeatMapProps> = ({
  data,
  xAxisDataKey,
  yAxisDataKey,
  valueDataKey,
  className = '',
}) => {
  // Get unique x and y values for the axes
  const xValues = [...new Set(data.map(item => item[xAxisDataKey]))];
  const yValues = [...new Set(data.map(item => item[yAxisDataKey]))];

  // Create formatted data for the ScatterChart
  const formattedData = data.map(item => ({
    x: xValues.indexOf(item[xAxisDataKey]),
    y: yValues.indexOf(item[yAxisDataKey]),
    value: item[valueDataKey],
    name: `${item[yAxisDataKey]}, ${item[xAxisDataKey]}`,
  }));

  // Color scale for the heatmap
  const getColor = (value: number) => {
    const maxValue = Math.max(...data.map(item => item[valueDataKey]));
    const minValue = Math.min(...data.map(item => item[valueDataKey]));
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    
    // Navy blue color scale
    return `rgba(10, 49, 97, ${0.2 + normalizedValue * 0.8})`;
  };

  return (
    <div className={`h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
            bottom: 30,
            left: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name={xAxisDataKey}
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => xValues[value]}
            domain={[0, xValues.length - 1]}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name={yAxisDataKey}
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => yValues[value]}
            domain={[0, yValues.length - 1]}
          />
          <Tooltip 
            formatter={(value, name, props) => [props.payload.value, `${props.payload.name}`]}
            itemStyle={{ padding: '2px 5px' }}
          />
          <Scatter data={formattedData} shape="square">
            {formattedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.value)} 
                stroke="none"
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeatMap;