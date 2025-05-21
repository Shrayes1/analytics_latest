import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import DonutChart from '../../components/ui/DonutChart';

const writeKPIs = {
  documentsGenerated: { value: 1248, trend: 15 },
  avgCompletionTime: { value: 8.5, trend: -12 },
  satisfactionScore: { value: 4.8, trend: 0.3 },
  revisionsNeeded: { value: 12, trend: -25 }
};

const documentTypes = [
  { name: 'Financial Plans', value: 35, color: '#0A3161' },
  { name: 'Investment Proposals', value: 25, color: '#7D98B3' },
  { name: 'Client Reports', value: 20, color: '#C4B17A' },
  { name: 'Meeting Summaries', value: 20, color: '#58776C' }
];

const completionTrend = Array.from({ length: 12 }, (_, i) => ({
  month: `Month ${i + 1}`,
  time: 12 - (i * 0.3) + (Math.random() * 2 - 1)
}));

const ClientWrite: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Client Write Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Documents Generated" 
          value={writeKPIs.documentsGenerated.value} 
          trend={writeKPIs.documentsGenerated.trend}
        />
        <KpiCard 
          title="Avg Completion Time" 
          value={writeKPIs.avgCompletionTime.value} 
          unit="min"
          trend={writeKPIs.avgCompletionTime.trend}
        />
        <KpiCard 
          title="Satisfaction Score" 
          value={writeKPIs.satisfactionScore.value} 
          trend={writeKPIs.satisfactionScore.trend}
        />
        <KpiCard 
          title="Revisions Needed" 
          value={writeKPIs.revisionsNeeded.value} 
          unit="%"
          trend={writeKPIs.revisionsNeeded.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Document Type Distribution</h3>
          <DonutChart data={documentTypes} />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Completion Time Trend</h3>
          <LineChart 
            data={completionTrend} 
            xDataKey="month" 
            lineDataKey="time"
            targetValue={10}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientWrite;