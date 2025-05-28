
import React from 'react';
import KpiCard from '../components/ui/KpiCard';
import LineChart from '../components/ui/LineChart';
import FunnelChart from '../components/ui/FunnelChart';
import ScatterPlot2 from '../components/ScatterPlot2';
import { Building2, Activity, Users, Package, Star, Heart } from 'lucide-react';
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

  // Mock data for KPI cards
  const clientMetrics = {
    activeClients: { value: 428, trend: 12, sparkline: [380, 390, 400, 410, 420, 428] },
    clientSatisfaction: { value: 92, trend: 3, sparkline: [87, 88, 89, 90, 91, 92] },
    clientUsage: { value: 28, trend: 2, sparkline: [24, 25, 26, 27, 27, 28] },
    moduleUsage: { value: 90, trend: 5, sparkline: [85, 86, 87, 88, 89, 90] },
    productEngagement: { value: 76, trend: 8, sparkline: [70, 71, 72, 73, 75, 76] },
    productHealth: { value: 82, trend: 3, sparkline: [77, 78, 79, 80, 81, 82] },
  };

  // Mock data for System Uptime LineChart
  const clientTrends = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    active: Math.floor(280 + i * 5 + Math.random() * 10),
    target: 350,
  }));

  // Mock data for Product Health Matrix ScatterPlot
  const scatterData = [
    { name: 'Org 1', engagementScore: 40, healthScore: 45, users: 87, quadrant: 'Underutilised', color: '#FFFF00' },
    { name: 'Org 2', engagementScore: 45, healthScore: 50, users: 96, quadrant: 'Underutilised', color: '#FFFF00' },
    { name: 'Org 3', engagementScore: 50, healthScore: 55, users: 103, quadrant: 'Underutilised', color: '#FFFF00' },
    { name: 'Org 4', engagementScore: 55, healthScore: 60, users: 84, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 5', engagementScore: 60, healthScore: 65, users: 121, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 6', engagementScore: 65, healthScore: 70, users: 134, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 7', engagementScore: 70, healthScore: 75, users: 97, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 8', engagementScore: 75, healthScore: 80, users: 144, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 9', engagementScore: 80, healthScore: 85, users: 77, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 10', engagementScore: 85, healthScore: 90, users: 129, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 11', engagementScore: 90, healthScore: 95, users: 112, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 12', engagementScore: 95, healthScore: 90, users: 142, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 13', engagementScore: 90, healthScore: 85, users: 75, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 14', engagementScore: 85, healthScore: 80, users: 133, quadrant: 'High Performers', color: '#0A3161' },
    { name: 'Org 15', engagementScore: 80, healthScore: 75, users: 68, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 16', engagementScore: 75, healthScore: 70, users: 58, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 17', engagementScore: 70, healthScore: 65, users: 91, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 18', engagementScore: 65, healthScore: 60, users: 111, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 19', engagementScore: 60, healthScore: 55, users: 123, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 20', engagementScore: 55, healthScore: 50, users: 74, quadrant: 'Adoption Focus', color: '#999999' },
    { name: 'Org 21', engagementScore: 50, healthScore: 45, users: 61, quadrant: 'Underutilised', color: '#FFFF00' },
    { name: 'Org 22', engagementScore: 45, healthScore: 40, users: 99, quadrant: 'Underutilised', color: '#FFFF00' },
    { name: 'Org 23', engagementScore: 40, healthScore: 35, users: 88, quadrant: 'At Risk', color: '#800020' },
    { name: 'Org 24', engagementScore: 35, healthScore: 30, users: 54, quadrant: 'At Risk', color: '#800020' },
    { name: 'Org 25', engagementScore: 30, healthScore: 25, users: 43, quadrant: 'At Risk', color: '#800020' },
    { name: 'Org 26', engagementScore: 25, healthScore: 20, users: 76, quadrant: 'At Risk', color: '#800020' },
    { name: 'Org 27', engagementScore: 20, healthScore: 15, users: 69, quadrant: 'At Risk', color: '#800020' },
    { name: 'Org 28', engagementScore: 15, healthScore: 10, users: 39, quadrant: 'At Risk', color: '#800020' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Summary Row - All cards in the top row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="Active Users"
          value={clientMetrics.activeClients.value}
          trend={clientMetrics.activeClients.trend}
          icon={<Building2 size={20} className="text-navy" />}
          sparklineData={clientMetrics.activeClients.sparkline}
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
          title="Client Usage"
          icon={<Users size={20} className="text-navy" />}
          type="doughnut"
        />
        <KpiCard
          title="Module Usage"
          icon={<Package size={20} className="text-navy" />}
          type="doughnut-modules"
        />
        <KpiCard
          title="Product Engagement Score"
          value={clientMetrics.productEngagement.value}
          unit="/100"
          trend={clientMetrics.productEngagement.trend}
          icon={<Star size={20} className="text-navy" />}
          type="speedometer"
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
        <div className="card h-[600px] min-h-[600px] lg:col-span-2 flex flex-col">
          <h3 className="mb-4 text-sm font-semibold text-charcoal-light">
            Product Health Matrix
          </h3>
          <div className="flex-1 min-h-[500px] relative">
            <div className="absolute inset-0">
              <ScatterPlot2 data={scatterData} />
            </div>
          </div>
        </div>
        <div className="card h-90 flex flex-col">
          <h3 className="mb-4 text-sm font-semibold text-charcoal-light">Module Response Time Analysis</h3>
          <div className="flex-1 min-h-0">
            <FunnelChart
              data={[
                { name: 'ClientMeet', value: 50 },
                { name: 'ClientIQ', value: 34 },
                { name: 'AdvisorIQ', value: 47 },
                { name: 'ClientWrite', value: 60 },
                { name: 'FirmIQ', value: 16 },
                { name: 'ClientCare', value: 20 },
              ]}
            />
          </div>
        </div>
        <div className="card h-90 flex flex-col">
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
