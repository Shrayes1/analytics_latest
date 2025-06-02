import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import LineChart from '../../components/ui/LineChart';
import BarChart from '../../components/ui/BarChart';
import DonutChart from '../../components/ui/DonutChart';

const guideKPIs = {
  numberOfUsers: { value: 1248, trend: 15 },
  kbResponses: { value: 850, trend: -12 },
  docResponses: { value: 480, trend: 3 },
  positiveFeedback: { value: 112, trend: 5 },
  negativeFeedback: { value: 28, trend: -10 },
  noIssuesQueries: { value: 920, trend: 7 },
  identificationIssues: { value: 45, trend: -2 },
  contentGapQueries: { value: 33, trend: 4 },
  moduleResponseTime: { value: 1.8, trend: -0.1 }, // in seconds
  fallbacksDetected: { value: 18, trend: 2 }
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

const ClientGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Client Guide Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="Number of Users" 
          value={guideKPIs.numberOfUsers.value} 
          trend={guideKPIs.numberOfUsers.trend}
        />
        <KpiCard 
          title="Number of Responses from KB" 
          value={guideKPIs.kbResponses.value} 
          trend={guideKPIs.kbResponses.trend}
        />
        <KpiCard 
          title="Number of Responses from Doc" 
          value={guideKPIs.docResponses.value} 
          trend={guideKPIs.docResponses.trend}
        />
        <KpiCard 
          title="Number of Positive Feedback" 
          value={guideKPIs.positiveFeedback.value} 
          trend={guideKPIs.positiveFeedback.trend}
        />
        <KpiCard 
          title="Number of Negative Feedback" 
          value={guideKPIs.negativeFeedback.value} 
          trend={guideKPIs.negativeFeedback.trend}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="Number of Queries in No Issues Category" 
          value={guideKPIs.noIssuesQueries.value} 
          trend={guideKPIs.noIssuesQueries.trend}
        />
        <KpiCard 
          title="Number of Queries in Identification Issue Category" 
          value={guideKPIs.identificationIssues.value} 
          trend={guideKPIs.identificationIssues.trend}
        />
        <KpiCard 
          title="Number of Queries in Content Gap Category" 
          value={guideKPIs.contentGapQueries.value} 
          trend={guideKPIs.contentGapQueries.trend}
        />
        <KpiCard 
          title="Response Time of the Module" 
          value={guideKPIs.moduleResponseTime.value} 
          unit="sec"
          trend={guideKPIs.moduleResponseTime.trend}
        />
        <KpiCard 
          title="Number of Fallbacks Detected" 
          value={guideKPIs.fallbacksDetected.value} 
          trend={guideKPIs.fallbacksDetected.trend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="mb-4">Document Type Distribution</h3>
          <DonutChart data={documentTypes} />
        </div>
        
        <div className="card">
          <h3 className="mb-4">Guidance Completion Time Trend</h3>
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

export default ClientGuide;
