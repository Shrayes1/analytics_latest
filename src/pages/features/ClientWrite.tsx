import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import DonutChart from '../../components/ui/DonutChart';

const writeKPIs = {
  moduleAccessRate: { value: 1248, trend: 15 },
  emailSendRate: { value: 8.5, trend: -12 },
  wealthProfileActionRate: { value: 4.8, trend: 0.3 },
  emailSearchBarUsageRate: { value: 12, trend: -25 },
  manualVsGeneratedEmails: { value: 60, trend: 10 } // example: 60% manual, 40% generated
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="Module Access Rate" 
          value={writeKPIs.moduleAccessRate.value} 
          trend={writeKPIs.moduleAccessRate.trend}
        />
        <KpiCard 
          title="Email Send Rate" 
          value={writeKPIs.emailSendRate.value} 
          unit="min"
          trend={writeKPIs.emailSendRate.trend}
        />
        <KpiCard 
          title="Wealth Profile Action Rate" 
          value={writeKPIs.wealthProfileActionRate.value} 
          trend={writeKPIs.wealthProfileActionRate.trend}
        />
        <KpiCard 
          title="Email Generate Search Bar Usage Rate" 
          value={writeKPIs.emailSearchBarUsageRate.value} 
          unit="%"
          trend={writeKPIs.emailSearchBarUsageRate.trend}
        />
        <KpiCard 
          title="Manually Edited vs Generated Emails" 
          value={writeKPIs.manualVsGeneratedEmails.value} 
          trend={writeKPIs.manualVsGeneratedEmails.trend}
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
