import React from 'react';
import KpiCard from '../components/ui/KpiCard';
import BarChart from '../components/ui/BarChart';
import LineChart from '../components/ui/LineChart';
import { clientIqKPIs } from '../utils/mockData';

// Mock data for Client IQ view
const profileSectionData = [
  { section: 'Financial Summary', views: 2450 },
  { section: 'Goals', views: 1875 },
  { section: 'Family', views: 1250 },
  { section: 'Documents', views: 950 },
  { section: 'History', views: 725 }
];

const responseTimeData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i+1}`,
  time: 4.2 - (i * 0.03) + (Math.random() * 0.4 - 0.2)
}));

const actionImplementationData = [
  { action: 'Meetings Scheduled', rate: 72 },
  { action: 'Emails Sent', rate: 68 },
  { action: 'Documents Created', rate: 65 },
  { action: 'Tasks Assigned', rate: 58 }
];

const ClientIqView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Client Profiles Accessed" 
          value={clientIqKPIs.profilesAccessed.value} 
          trend={clientIqKPIs.profilesAccessed.trend}
        />
        <KpiCard 
          title="Queries Asked" 
          value={clientIqKPIs.queriesAsked.value} 
          trend={clientIqKPIs.queriesAsked.trend}
        />
        <KpiCard 
          title="Query Success Rate" 
          value={clientIqKPIs.querySuccessRate.value} 
          unit="%" 
          trend={clientIqKPIs.querySuccessRate.trend}
        />
        <KpiCard 
          title="Next Actions Generated" 
          value={clientIqKPIs.nextActionsGenerated.value} 
          trend={clientIqKPIs.nextActionsGenerated.trend}
        />
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Client Profile Section Views</h3>
          <BarChart 
            data={profileSectionData} 
            xDataKey="section" 
            barDataKey="views" 
            horizontal={true}
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Query Response Time Trend</h3>
          <LineChart 
            data={responseTimeData} 
            xDataKey="day" 
            lineDataKey="time" 
            targetValue={3.0}
          />
        </div>
      </div>
      
      {/* Additional Charts */}
      <div className="card">
        <h3 className="mb-4">Action Implementation Rate</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {actionImplementationData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7E9"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={item.rate < 50 ? '#722F37' : item.rate < 75 ? '#C4B17A' : '#58776C'}
                    strokeWidth="3"
                    strokeDasharray={`${item.rate}, 100`}
                    className="transition-all duration-1000 ease-in-out"
                  />
                  <text x="18" y="20" className="text-xl font-bold" textAnchor="middle" fill="#333F48">
                    {item.rate}%
                  </text>
                </svg>
              </div>
              <p className="text-sm text-charcoal mt-2 text-center">{item.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientIqView;