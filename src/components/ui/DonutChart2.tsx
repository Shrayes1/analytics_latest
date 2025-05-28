
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartEvent, ActiveElement, Chart } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Module {
  name: string;
  value: number;
}

interface DonutChartProps {
  modules: Module[];
  totalUsers: number;
  plan: string;
}

const DonutChart2: React.FC<DonutChartProps> = ({ modules, totalUsers, plan }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colors = ['#0A3161', '#6A7BA2', '#95B2DB', '#D0D9E8', '#F2F4F8', '#B0C4DE'];

  const chartData = {
    labels: modules.map((m) => m.name),
    datasets: [
      {
        data: modules.map((m) => m.value),
        backgroundColor: colors,
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    cutout: '70%', // Makes the chart a hollow doughnut
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Disables tooltips
      },
    },
    interaction: {
      mode: 'nearest' as const, // Explicitly type as 'nearest'
      intersect: true,
    },
    onHover: (event: ChartEvent, elements: ActiveElement[], chart: Chart<'doughnut'>) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        setHoveredIndex(index);
      } else {
        setHoveredIndex(null);
      }
    },
    maintainAspectRatio: false, // Ensures the chart fits the container's dimensions
  };

  const centerLabel = hoveredIndex !== null
    ? {
        top: modules[hoveredIndex].name,
        bottom: `${modules[hoveredIndex].value} users`,
      }
    : {
        top: plan,
        bottom: `${totalUsers} users`,
      };

  return (
    <div className="relative w-full h-full">
      <Doughnut data={chartData} options={chartOptions} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-semibold text-navy text-center px-2 pointer-events-none">
        <div className="leading-tight">{centerLabel.top}</div>
        <div className="leading-tight">{centerLabel.bottom}</div>
      </div>
    </div>
  );
};

export default DonutChart2;
