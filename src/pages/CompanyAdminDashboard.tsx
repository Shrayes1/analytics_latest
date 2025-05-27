import React from 'react';
import KpiCard from '../components/ui/KpiCard';
import QuadrantPlot from '../components/ui/QuadrantPlot';
import Table from '../components/ui/Table';
import SystemStatusCard from '../components/ui/SystemStatusCard';
import ResourceGauge from '../components/ui/ResourceGauge';
import LineChart from '../components/ui/LineChart';
import { Building2, Users, TrendingUp, Activity, Shield, AlertTriangle, Heart, Star } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const CompanyAdminDashboard: React.FC = () => {
  const { selectedClient } = useAdmin();

  // Active users trend data
  const activeUsersTrend = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    users: Math.floor(980 + (i * 25) + (Math.random() * 15)),
    target: 1500
  }));

  // Client performance data for the quadrant plot
  const clientPerformanceData = [
    { client: 'Alpha Wealth', adoptionRate: 85, effectiveness: 92, users: 150, age: 24 },
    { client: 'Beta Advisors', adoptionRate: 65, effectiveness: 75, users: 80, age: 12 },
    { client: 'Gamma Financial', adoptionRate: 92, effectiveness: 88, users: 200, age: 36 },
    { client: 'Delta Partners', adoptionRate: 45, effectiveness: 60, users: 50, age: 6 },
    { client: 'Epsilon Wealth', adoptionRate: 78, effectiveness: 85, users: 120, age: 18 }
  ];

  // System health data
  const systemHealth = {
    components: [
      { name: 'API Gateway', status: 'operational' as const, uptime: 100.0 },
      { name: 'Database Cluster', status: 'operational' as const, uptime: 99.99 },
      { name: 'Authentication', status: 'operational' as const, uptime: 100.0 },
      { name: 'Analytics Engine', status: 'degraded' as const, uptime: 99.85 },
      { name: 'Storage Service', status: 'operational' as const, uptime: 100.0 }
    ],
    resources: {
      cpu: { current: 62, max: 100, warning: 80 },
      memory: { current: 75, max: 100, warning: 85 },
      storage: { current: 68, max: 100, warning: 85 },
      network: { current: 45, max: 100, warning: 90 }
    }
  };

  // Recent activities
  const recentActivities = [
    { client: 'Meridian Wealth', action: 'New Feature Enabled', date: '2025-03-15', status: 'Completed' },
    { client: 'Alpha Advisors', action: 'License Upgrade', date: '2025-03-14', status: 'In Progress' },
    { client: 'Beta Financial', action: 'User Training', date: '2025-03-13', status: 'Scheduled' }
  ];

  const activityColumns = [
    { header: 'Client', accessor: 'client' },
    { header: 'Action', accessor: 'action' },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Completed' ? 'bg-sage-light text-sage' :
          value === 'In Progress' ? 'bg-gold-light text-gold-dark' :
          'bg-navy-light text-white'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
  {/* KPI Summary Row */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <KpiCard 
      title="Total Clients"
      value={42}
      trend={5}
      icon={<Building2 size={20} className="text-navy" />}
      sparklineData={[35, 37, 39, 41, 40, 42]}
    />
    <KpiCard 
      title="Active Users"
      value={1248}
      trend={15}
      icon={<Users size={20} className="text-navy" />}
      sparklineData={[980, 1050, 1120, 1180, 1220, 1248]}
    />
    <KpiCard 
      title="Platform Adoption"
      value={78}
      unit="%"
      trend={8}
      icon={<TrendingUp size={20} className="text-navy" />}
      sparklineData={[65, 68, 71, 73, 75, 78]}
    />
    <KpiCard 
      title="Health Score"
      value={85}
      
      trend={5}
      icon={<Activity size={20} className="text-navy" />}
      sparklineData={[78, 80, 82, 83, 84, 85]}
    />
    <KpiCard 
      title="License Utilization"
      value={92}
      unit="%"
      trend={3}
      icon={<Shield size={20} className="text-navy" />}
      sparklineData={[86, 88, 89, 90, 91, 92]}
    />
    <KpiCard 
      title="Active Alerts"
      value={5}
      trend={-2}
      icon={<AlertTriangle size={20} className="text-burgundy" />}
      sparklineData={[8, 7, 6, 6, 5, 5]}
    />
    <KpiCard 
      title="Product Engagement Score"
      value={90/100}
      
      trend={6}
      icon={<Star size={20} className="text-navy" />}
      sparklineData={[82, 84, 86, 87, 88, 40]}
    />
    <KpiCard 
      title="Product Health Score"
      value={88}
      unit="%"
      trend={4}
      icon={<Heart size={20} className="text-navy" />}
      sparklineData={[80, 82, 34, 55, 86, 88]}
    />
  </div>

      {/* Active Users Analysis */}
      <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(systemHealth.resources).map(([key, data]) => (
          <div key={key} className="card">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-navy" size={20} />
              <h3>{key.toUpperCase()} Usage</h3>
            </div>
            <ResourceGauge
              label={key.toUpperCase()}
              value={data.current}
              max={data.max}
              warning={data.warning}
            />
          </div>
        ))}
      </div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Total Active Users Analysis</h3>
          <div className="flex gap-2">
            <select className="border border-silver rounded px-2 py-1 text-sm">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly" selected>Monthly</option>
            </select>
          </div>
        </div>
        <LineChart 
          data={activeUsersTrend}
          xDataKey="month"
          lineDataKey="users"
          targetValue={1500}
        />
      </div>

      {/* Client Health Matrix */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Client Health Matrix</h3>
          <div className="flex gap-2">
            <select className="border border-silver rounded px-2 py-1 text-sm">
              <option value="adoption">Adoption Rate</option>
              <option value="engagement">Engagement</option>
              <option value="satisfaction">Satisfaction</option>
            </select>
            <select className="border border-silver rounded px-2 py-1 text-sm">
              <option value="effectiveness">Effectiveness</option>
              <option value="roi">ROI</option>
              <option value="growth">Growth</option>
            </select>
          </div>
        </div>
        <div className="h-[400px]">
          <QuadrantPlot
            width={800}
            height={400}
            data={clientPerformanceData}
          />
        </div>
      </div>

      {/* System Health and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="mb-4">Recent Activities</h3>
          <Table 
            columns={activityColumns}
            data={recentActivities}
          />
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-navy" size={20} />
            <h3>System Health</h3>
          </div>
          <SystemStatusCard statuses={systemHealth.components} />
        </div>
      </div>

      {/* Resource Monitoring */}
      
    </div>
  );
};

export default CompanyAdminDashboard;