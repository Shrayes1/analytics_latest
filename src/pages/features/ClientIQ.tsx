import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import HeatMap from '../../components/ui/HeatMap';
import { clientIqKPIs } from '../../utils/mockData';

const queryTrendData = Array.from({ length: 12 }, (_, i) => ({
  month: `Month ${i + 1}`,
  queries: Math.floor(500 + Math.random() * 300)
}));

const topQueriesData = [
  { query: 'Portfolio Performance', count: 245 },
  { query: 'Risk Analysis', count: 198 },
  { query: 'Investment Strategy', count: 176 },
  { query: 'Market Trends', count: 154 },
  { query: 'Client History', count: 132 }
];

const querySuccessData = Array.from({ length: 7 }, (_, i) => ({
  day: `Day ${i + 1}`,
  rate: 85 + Math.random() * 10
}));

const ClientIQ: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Client IQ Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <KpiCard 
          title="Module Access Rate" 
          value={clientIqKPIs.profilesAccessed.value} 
          trend={clientIqKPIs.profilesAccessed.trend}
        />
        <KpiCard 
          title="Total Number of Queries Asked" 
          value={clientIqKPIs.queriesAsked.value} 
          trend={clientIqKPIs.queriesAsked.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Query Volume Trend</h3>
          <LineChart 
            data={queryTrendData} 
            xDataKey="month" 
            lineDataKey="queries"
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Top Queries</h3>
          <BarChart 
            data={topQueriesData} 
            xDataKey="query" 
            barDataKey="count"
            horizontal={true}
          />
        </div>
      </div>

      <div className="card">
        <h3 className="mb-4">Query Success Rate Trend</h3>
        <LineChart 
          data={querySuccessData} 
          xDataKey="day" 
          lineDataKey="rate"
          targetValue={90}
        />
      </div>
    </div>
  );
};

export default ClientIQ;
