import React, { useState } from 'react';
import { FileText, Calendar, Settings } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const ReportsPage: React.FC = () => {
  const { isCompanyAdmin, selectedClient } = useAdmin();
  const [activeTab, setActiveTab] = useState('recent');
  
  const recentReports = [
    { name: 'Advisor Performance', date: 'June 15, 2025' },
    { name: 'Feature Usage', date: 'June 10, 2025' },
    { name: 'Business ROI', date: 'June 1, 2025' },
    { name: 'Q2 Summary', date: 'May 31, 2025' }
  ];
  
  const availableReports = [
    { 
      name: 'Advisor Performance Report',
      description: 'Individual and team metrics',
      frequency: 'Weekly',
      icon: '📊'
    },
    { 
      name: 'Feature Adoption Report',
      description: 'Usage trends by feature',
      frequency: 'Monthly',
      icon: '📈'
    },
    { 
      name: 'Business Impact Report',
      description: 'ROI and time savings',
      frequency: 'Quarterly',
      icon: '💰'
    },
    { 
      name: 'Client Engagement Report',
      description: 'Meeting and communication analytics',
      frequency: 'Monthly',
      icon: '🤝'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">
          {isCompanyAdmin ? 'Company Reports' : `Reports for ${selectedClient}`}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <div className="card">
            <h3 className="mb-4 flex items-center gap-2">
              <FileText size={18} className="text-navy" />
              Recent Reports
            </h3>
            <ul className="space-y-3">
              {recentReports.map((report, index) => (
                <li key={index} className="border-b border-silver last:border-b-0 pb-3 last:pb-0">
                  <button className="text-left w-full hover:text-navy">
                    <p className="font-medium">{report.name}</p>
                    <p className="text-xs text-charcoal-light">{report.date}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card">
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-navy" />
              Scheduled Reports
            </h3>
            <div className="bg-silver-light rounded p-4 text-center text-charcoal-light">
              Calendar view of scheduled reports
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableReports.map((report, index) => (
              <div key={index} className="card hover:shadow-card-hover transition-shadow">
                <div className="text-2xl mb-2">{report.icon}</div>
                <h4 className="font-bold mb-1">{report.name}</h4>
                <p className="text-sm text-charcoal-light mb-3">{report.description}</p>
                {report.frequency && (
                  <div className="text-xs bg-silver-light text-charcoal-light px-2 py-1 rounded inline-block">
                    {report.frequency}
                  </div>
                )}
                <button className="mt-3 text-navy hover:text-navy-light text-sm font-medium">
                  Generate Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;