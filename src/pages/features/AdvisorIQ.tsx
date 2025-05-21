import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import DonutChart from '../../components/ui/DonutChart';
import Table from '../../components/ui/Table';

const advisorKPIs = {
  activeAdvisors: { value: 125, trend: 10 },
  queriesPerDay: { value: 450, trend: 15 },
  successRate: { value: 88, trend: 5 },
  timeSaved: { value: 24.5, trend: 12 }
};

const queryDistribution = [
  { name: 'Client Research', value: 40, color: '#0A3161' },
  { name: 'Market Analysis', value: 25, color: '#7D98B3' },
  { name: 'Portfolio Review', value: 20, color: '#C4B17A' },
  { name: 'Compliance Check', value: 15, color: '#58776C' }
];

const topPerformers = [
  { advisor: 'Sarah Johnson', queries: 245, accuracy: 92 },
  { advisor: 'Michael Chen', queries: 198, accuracy: 89 },
  { advisor: 'David Wilson', queries: 176, accuracy: 87 }
];

const AdvisorIQ: React.FC = () => {
  const performerColumns = [
    { header: 'Advisor', accessor: 'advisor' },
    { header: 'Queries', accessor: 'queries' },
    { 
      header: 'Accuracy', 
      accessor: 'accuracy',
      render: (value: number) => `${value}%`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Advisor IQ Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Active Advisors" 
          value={advisorKPIs.activeAdvisors.value} 
          trend={advisorKPIs.activeAdvisors.trend}
        />
        <KpiCard 
          title="Queries Per Day" 
          value={advisorKPIs.queriesPerDay.value} 
          trend={advisorKPIs.queriesPerDay.trend}
        />
        <KpiCard 
          title="Success Rate" 
          value={advisorKPIs.successRate.value} 
          unit="%"
          trend={advisorKPIs.successRate.trend}
        />
        <KpiCard 
          title="Time Saved" 
          value={advisorKPIs.timeSaved.value} 
          unit="hrs/week"
          trend={advisorKPIs.timeSaved.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Query Distribution</h3>
          <DonutChart data={queryDistribution} />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Top Performing Advisors</h3>
          <Table 
            columns={performerColumns}
            data={topPerformers}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvisorIQ;