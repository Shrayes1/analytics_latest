import React from 'react';
import KpiCard from '../components/ui/KpiCard';
import LineChart from '../components/ui/LineChart';
import BarChart from '../components/ui/BarChart';
import { clientMeetKPIs } from '../utils/mockData';

// Mock data for Client Meet view
const meetingVolumeData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i+1}`,
  meetings: Math.floor(25 + Math.random() * 20 + (i % 7 < 5 ? 10 : 0))
}));

const meetingDurationData = [
  { duration: '0-15', count: 45 },
  { duration: '15-30', count: 210 },
  { duration: '30-45', count: 315 },
  { duration: '45-60', count: 180 },
  { duration: '60-75', count: 72 },
  { duration: '75+', count: 20 }
];

const meetingTypeData = [
  { type: 'Review', wealthManagement: 135, retirement: 95, investment: 70 },
  { type: 'Planning', wealthManagement: 110, retirement: 85, investment: 65 },
  { type: 'Education', wealthManagement: 70, retirement: 90, investment: 45 },
  { type: 'Ad-hoc', wealthManagement: 45, retirement: 22, investment: 10 }
];

const ClientMeetView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Meetings" 
          value={clientMeetKPIs.totalMeetings.value} 
          trend={clientMeetKPIs.totalMeetings.trend}
        />
        <KpiCard 
          title="Avg Meeting Duration" 
          value={clientMeetKPIs.avgDuration.value} 
          unit="min" 
          trend={clientMeetKPIs.avgDuration.trend}
        />
        <KpiCard 
          title="Meeting Notes Generated" 
          value={clientMeetKPIs.notesGenerated.value} 
          trend={clientMeetKPIs.notesGenerated.trend}
        />
        <KpiCard 
          title="Client Satisfaction" 
          value={clientMeetKPIs.clientSatisfaction.value} 
          trend={clientMeetKPIs.clientSatisfaction.trend}
        />
      </div>
      
      {/* Main Charts - Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Meeting Volume Trend</h3>
          <LineChart 
            data={meetingVolumeData} 
            xDataKey="date" 
            lineDataKey="meetings" 
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Meeting Duration Distribution</h3>
          <BarChart 
            data={meetingDurationData} 
            xDataKey="duration" 
            barDataKey="count" 
          />
        </div>
      </div>
      
      {/* Additional Charts */}
      <div className="card">
        <h3 className="mb-4">Meeting Type Breakdown</h3>
        <div className="h-64">
          {/* This would be a stacked bar chart showing meeting types by team */}
          <p className="text-center text-charcoal-light mt-12">
            Grouped bar chart showing meeting types by advisor team would be displayed here
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientMeetView;