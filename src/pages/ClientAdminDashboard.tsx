import React from 'react';
import KpiCard from '../components/ui/KpiCard';
import DonutChart from '../components/ui/DonutChart';
import LineChart from '../components/ui/LineChart';
import BarChart from '../components/ui/BarChart';
import FunnelChart from '../components/ui/FunnelChart';
import Table from '../components/ui/Table';
import { Building2, Users, TrendingUp, Activity, Shield, AlertTriangle, Heart, Star } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { formatPercentage } from '../utils/formatters';

const ClientAdminDashboard: React.FC = () => {
  const { selectedClient } = useAdmin();

  const clientEngagementColumns = [
    { header: 'Metric', accessor: 'metric' },
    { header: 'Value', accessor: 'value' },
    { 
      header: 'Change', 
      accessor: 'change',
      render: (value: number) => (
        <span className={value >= 0 ? 'text-sage' : 'text-burgundy'}>
          {formatPercentage(value, true)} vs prev period
        </span>
      ),
      className: 'text-right'
    }
  ];

  // Mock data for client-specific metrics
  const clientMetrics = {
    totalAdvisors: { value: 48, trend: 4, sparkline: [42, 43, 45, 46, 47, 48] },
    activeClients: { value: 325, trend: 12, sparkline: [280, 290, 300, 310, 318, 325] },
    meetingsScheduled: { value: 156, trend: 8, sparkline: [130, 135, 142, 148, 152, 156] },
    clientSatisfaction: { value: 92, trend: 3, sparkline: [87, 88, 89, 90, 91, 92] },
    revenueGrowth: { value: 18, trend: 5, sparkline: [12, 13, 15, 16, 17, 18] },
    riskScore: { value: 15, trend: -2, sparkline: [19, 18, 17, 16, 15, 15] },
    productEngagement: { value: 85, trend: 6, sparkline: [78, 80, 82, 83, 84, 85] },
    productHealth: { value: 90, trend: 5, sparkline: [85, 86, 87, 88, 89, 90] },
    moduleResponseTime: {  
      trend: -3, 
      sparkline: [130, 128, 125, 123, 121, 120],
      modules: [
        { name: 'Module A', value: 50 },
        { name: 'Module B', value: 40 },
        { name: 'Module C', value: 30 }
      ]
    }
  };

  const advisorPerformance = [
    { name: 'Sarah Johnson', clients: 45, satisfaction: 95, revenue: 280000 },
    { name: 'Michael Chen', clients: 38, satisfaction: 92, revenue: 245000 },
    { name: 'Emily Davis', clients: 42, satisfaction: 88, revenue: 260000 },
    { name: 'James Wilson', clients: 35, satisfaction: 90, revenue: 230000 }
  ];

  const clientTrends = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    active: Math.floor(280 + (i * 5) + (Math.random() * 10)),
    target: 350
  }));

  return (
    <div className="space-y-6">
      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
      
      <KpiCard 
        title="Product Engagement"
        value={clientMetrics.productEngagement.value}
        unit='/100'
        trend={clientMetrics.productEngagement.trend}
        icon={<Star size={20} className="text-navy" />}
        type="speedometer"
      />
      
      <KpiCard 
    title="Avg Session Duration" 
    value={clientMetrics.clientSatisfaction.value}
    unit='min'
    trend={clientMetrics.clientSatisfaction.trend}
    icon={<Activity size={20} className="text-navy" />}
    sparklineData={clientMetrics.clientSatisfaction.sparkline}
  />

<KpiCard 
          title="Module Response Time" 
          trend={clientMetrics.moduleResponseTime.trend}
          icon={<Shield size={20} className="text-navy" />}
          sparklineData={clientMetrics.moduleResponseTime.sparkline}
          type="modules"
          modules={clientMetrics.moduleResponseTime.modules}
          className="lg:col-span-2 xl:col-span-4"
        />
  
  <KpiCard 
    title="Active Users" 
    value={clientMetrics.activeClients.value}
    trend={clientMetrics.activeClients.trend}
    icon={<Building2 size={20} className="text-navy" />}
    sparklineData={clientMetrics.activeClients.sparkline}
  />
     
 

  <KpiCard 
        title="Product Health"
        value={clientMetrics.productHealth.value}
        unit="/100"
        trend={clientMetrics.productHealth.trend}
        icon={<Heart size={20} className="text-navy" />}
        type="speedometer"
      />
  
  
    
</div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Client Growth Trend</h3>
          <LineChart 
            data={clientTrends} 
            xDataKey="month" 
            lineDataKey="active"
            targetValue={350}
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Top Performing Advisors</h3>
          <BarChart 
            data={advisorPerformance} 
            xDataKey="name" 
            barDataKey="clients"
            horizontal={true}
          />
        </div>
      </div>
      
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Revenue Distribution</h3>
          <DonutChart 
            data={[
              { name: 'Advisory Services', value: 45, color: '#0A3161' },
              { name: 'Investment Management', value: 30, color: '#7D98B3' },
              { name: 'Financial Planning', value: 15, color: '#C4B17A' },
              { name: 'Other Services', value: 10, color: '#58776C' }
            ]}
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Client Acquisition Funnel</h3>
          <FunnelChart 
            data={[
              { name: 'Leads', value: 100 },
              { name: 'Qualified', value: 75 },
              { name: 'Meetings', value: 50 },
              { name: 'Proposals', value: 35 },
              { name: 'Closed', value: 25 }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientAdminDashboard;