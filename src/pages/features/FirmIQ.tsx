import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import HeatMap from '../../components/ui/HeatMap';
import Table from '../../components/ui/Table';

const firmKPIs = {
  totalInsights: { value: 3245, trend: 18 },
  actionsImplemented: { value: 76, trend: 8 },
  complianceScore: { value: 95, trend: 2 },
  riskAlerts: { value: 15, trend: -12 }
};

const insightCategories = [
  { category: 'Market Risk', count: 245 },
  { category: 'Client Behavior', count: 198 },
  { category: 'Portfolio Allocation', count: 176 },
  { category: 'Regulatory Changes', count: 154 },
  { category: 'Business Development', count: 132 }
];

const recentAlerts = [
  { type: 'Risk Alert', description: 'Portfolio concentration risk detected', priority: 'High' },
  { type: 'Compliance', description: 'New regulation impact analysis', priority: 'Medium' },
  { type: 'Market', description: 'Sector volatility warning', priority: 'Low' }
];

const FirmIQ: React.FC = () => {
  const alertColumns = [
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' },
    { 
      header: 'Priority', 
      accessor: 'priority',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'High' ? 'bg-burgundy-light text-white' :
          value === 'Medium' ? 'bg-gold-light text-gold-dark' :
          'bg-sage-light text-sage'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Firm IQ Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Insights" 
          value={firmKPIs.totalInsights.value} 
          trend={firmKPIs.totalInsights.trend}
        />
        <KpiCard 
          title="Actions Implemented" 
          value={firmKPIs.actionsImplemented.value} 
          unit="%"
          trend={firmKPIs.actionsImplemented.trend}
        />
        <KpiCard 
          title="Compliance Score" 
          value={firmKPIs.complianceScore.value} 
          unit="%"
          trend={firmKPIs.complianceScore.trend}
        />
        <KpiCard 
          title="Risk Alerts" 
          value={firmKPIs.riskAlerts.value} 
          trend={firmKPIs.riskAlerts.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Insight Categories</h3>
          <BarChart 
            data={insightCategories} 
            xDataKey="category" 
            barDataKey="count"
            horizontal={true}
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Recent Alerts</h3>
          <Table 
            columns={alertColumns}
            data={recentAlerts}
          />
        </div>
      </div>
    </div>
  );
};

export default FirmIQ;