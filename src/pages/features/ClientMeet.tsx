import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import DonutChart from '../../components/ui/DonutChart';
import Table from '../../components/ui/Table';
import { clientMeetKPIs } from '../../utils/mockData';

const meetingTrendData = Array.from({ length: 12 }, (_, i) => ({
  month: `Month ${i + 1}`,
  meetings: Math.floor(80 + Math.random() * 40)
}));

const meetingTypeData = [
  { name: 'Review', value: 35, color: '#0A3161' },
  { name: 'Planning', value: 25, color: '#7D98B3' },
  { name: 'Education', value: 20, color: '#C4B17A' },
  { name: 'Ad-hoc', value: 20, color: '#58776C' }
];

const recentMeetings = [
  { client: 'John Smith', type: 'Review', duration: '45 min', date: '2025-03-15', status: 'Completed' },
  { client: 'Sarah Johnson', type: 'Planning', duration: '60 min', date: '2025-03-14', status: 'Scheduled' },
  { client: 'Michael Brown', type: 'Education', duration: '30 min', date: '2025-03-13', status: 'In Progress' }
];

const ClientMeet: React.FC = () => {
  const meetingColumns = [
    { header: 'Client', accessor: 'client' },
    { header: 'Type', accessor: 'type' },
    { header: 'Duration', accessor: 'duration' },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Completed' ? 'bg-sage-light text-sage' :
          value === 'Scheduled' ? 'bg-navy-light text-white' :
          'bg-gold-light text-gold-dark'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Client Meet Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Module Access Rate" 
          value={clientMeetKPIs.totalMeetings.value} 
          trend={clientMeetKPIs.totalMeetings.trend}
        />
        <KpiCard 
          title="Number of Meetings Scheduled" 
          value={clientMeetKPIs.avgDuration.value} 
          unit="min"
          trend={clientMeetKPIs.avgDuration.trend}
        />
        <KpiCard 
          title="Agenda Creation Rate" 
          value={clientMeetKPIs.notesGenerated.value} 
          trend={clientMeetKPIs.notesGenerated.trend}
        />
        <KpiCard 
          title="Action Item Completion Rate" 
          value={clientMeetKPIs.clientSatisfaction.value} 
          trend={clientMeetKPIs.clientSatisfaction.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Meeting Trend</h3>
          <LineChart 
            data={meetingTrendData} 
            xDataKey="month" 
            lineDataKey="meetings"
          />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Meeting Type Distribution</h3>
          <DonutChart data={meetingTypeData} />
        </div>
      </div>

      <div className="card">
        <h3 className="mb-4">Recent Meetings</h3>
        <Table 
          columns={meetingColumns}
          data={recentMeetings}
        />
      </div>
    </div>
  );
};

export default ClientMeet;
