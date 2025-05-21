import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { timeRangeOptions } from '../../utils/mockData';

interface TimeRangeSelectorProps {
  onRangeChange?: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState('30d');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRange(value);
    if (onRangeChange) {
      onRangeChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar size={16} className="text-navy" />
      <select
        value={selectedRange}
        onChange={handleChange}
        className="border border-silver rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy"
      >
        {timeRangeOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeRangeSelector;