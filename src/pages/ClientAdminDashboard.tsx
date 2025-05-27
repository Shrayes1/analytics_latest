import React from 'react';
import KpiCard from '../components/ui/KpiCard';
import DonutChart from '../components/ui/DonutChart';
import LineChart from '../components/ui/LineChart';
import BarChart from '../components/ui/BarChart';
import FunnelChart from '../components/ui/FunnelChart';
import { Building2, Activity, Shield, Heart, Star } from 'lucide-react';
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
      className: 'text-right',
    },
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
        { name: 'ClientIQ', value: 50 },
        { name: 'AdvisorIQ', value: 40 },
        { name: 'ClientGuide', value: 30 },
      ],
    },
  };

  const advisorPerformance = [
    { name: 'Module A', clients: 45, satisfaction: 95, revenue: 280000 },
    { name: 'Module B', clients: 38, satisfaction: 92, revenue: 245000 },
    { name: 'Module C', clients: 42, satisfaction: 88, revenue: 260000 },
    { name: 'Module D', clients: 35, satisfaction: 90, revenue: 230000 },
    { name: 'Module E', clients: 77, satisfaction: 80, revenue: 290000 },
  ];

  const clientTrends = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    active: Math.floor(280 + i * 5 + Math.random() * 10),
    target: 350,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard
          title="Product Engagement Score"
          value={clientMetrics.productEngagement.value}
          unit="/100"
          trend={clientMetrics.productEngagement.trend}
          icon={<Star size={20} className="text-navy" />}
          type="speedometer"
        />
        <KpiCard
          title="Average Session Duration"
          value={clientMetrics.clientSatisfaction.value}
          unit="min"
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
        />
        <KpiCard
          title="Active Users"
          value={clientMetrics.activeClients.value}
          trend={clientMetrics.activeClients.trend}
          icon={<Building2 size={20} className="text-navy" />}
          sparklineData={clientMetrics.activeClients.sparkline}
        />
        <KpiCard
          title="Product Health Score"
          value={clientMetrics.productHealth.value}
          unit="/100"
          trend={clientMetrics.productHealth.trend}
          icon={<Heart size={20} className="text-navy" />}
          type="speedometer"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Row: Two Cards */}
        <div className="card h-90 flex flex-col">
          <h3 className="mb-4 text-sm font-semibold text-charcoal-light">Client Usage</h3>
          <div className="flex-1 min-h-0">
            <FunnelChart
              data={[
                { name: 'LPL Financial', value: 100 },
                { name: 'Ameriprise', value: 75 },
                { name: 'Plancorp', value: 50 },
                { name: 'Seqouia', value: 35 },
                { name: 'BlackRock', value: 25 },
              ]}
            />
          </div>
        </div>
        <div className="card h-90 flex flex-col">
          <h3 className="mb-4 text-sm font-semibold text-charcoal-light">Module Usage</h3>
          <div className="flex-1 min-h-0">
            <BarChart
              data={advisorPerformance}
              xDataKey="name"
              barDataKey="clients"
              horizontal={true}
            />
          </div>
        </div>
        
        {/* Third Row: One Card (Full Width) */}
        <div className="card h-100 lg:col-span-2 flex flex-col">
          <h3 className="mb-4 text-sm font-semibold text-charcoal-light">System Uptime</h3>
          <div className="flex-1 min-h-0">
            <LineChart
              data={clientTrends}
              xDataKey="month"
              lineDataKey="active"
              targetValue={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAdminDashboard;
