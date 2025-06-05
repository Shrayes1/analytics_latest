import React, { useState } from 'react';
import { FileText, Calendar, Settings, RefreshCw, AlertTriangle, Download } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const ReportsPage: React.FC = () => {
  const { isCompanyAdmin, selectedClient } = useAdmin();
  const [activeTab, setActiveTab] = useState<'recent' | 'analytics'>('recent');

  const [selectedModule, setSelectedModule] = useState<string>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({ month: '', clientName: '', dateRange: '', specificFilter: '' });
  const [reportData, setReportData] = useState<any[]>([]);

  const overviewCategories = [
    { id: 'performance', name: 'Advisor Performance', description: 'Team activity and outcomes' },
    { id: 'feature-usage', name: 'Feature Usage', description: 'Adoption of platform features' }
  ];

  const moduleCategories: Record<string, { id: string; name: string; description: string }[]> = {
    adoption: [
      { id: 'feature', name: 'Feature Adoption', description: 'Trends of product features' },
      { id: 'login', name: 'Login Activity', description: 'Sign-in data and usage' }
    ]
  };

  const handleResetFilters = () => setFilters({ month: '', clientName: '', dateRange: '', specificFilter: '' });
  const handleRunReport = () => {
    if (filters.month) {
      setReportData([
        {
          id: '001',
          clientName: 'Johnson Wealth Management',
          date: '2025-06-01',
          action: 'Email Sent',
          status: 'Success',
          module: 'Advisor',
          details: 'Email regarding Q2 review sent'
        }
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">
          {isCompanyAdmin ? 'Company Reports' : `Reports for ${selectedClient}`}
        </h2>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('recent')} className={`text-sm font-medium ${activeTab === 'recent' ? 'text-navy underline' : 'text-charcoal-light'}`}>Recent</button>
          <button onClick={() => setActiveTab('analytics')} className={`text-sm font-medium ${activeTab === 'analytics' ? 'text-navy underline' : 'text-charcoal-light'}`}>Analytics Dashboard</button>
        </div>
      </div>

      {activeTab === 'recent' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="card">
              <h3 className="mb-4 flex items-center gap-2">
                <FileText size={18} className="text-navy" />
                Recent Reports
              </h3>
              <ul className="space-y-3">
                {['Advisor Performance', 'Feature Usage'].map((name, i) => (
                  <li key={i} className="border-b border-silver last:border-b-0 pb-3 last:pb-0">
                    <button className="text-left w-full hover:text-navy">
                      <p className="font-medium">{name}</p>
                      <p className="text-xs text-charcoal-light">June {15 - i * 5}, 2025</p>
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
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <select value={filters.month} onChange={(e) => setFilters({...filters, month: e.target.value})} className="form-select">{['Select Month', '2025-06', '2025-05'].map((m, i) => <option key={i} value={i ? m : ''}>{m}</option>)}</select>
                <select value={filters.clientName} onChange={(e) => setFilters({...filters, clientName: e.target.value})} className="form-select">
                  <option value="">All Clients</option>
                  <option value="johnson">Johnson Wealth</option>
                </select>
                <select value={filters.dateRange} onChange={(e) => setFilters({...filters, dateRange: e.target.value})} className="form-select">
                  <option value="">Date Range</option>
                  <option value="last30days">Last 30 Days</option>
                </select>
                <select value={filters.specificFilter} onChange={(e) => setFilters({...filters, specificFilter: e.target.value})} className="form-select">
                  <option value="">All Actions</option>
                  <option value="email">Email</option>
                </select>
                <select className="form-select">
                  <option value="">All Status</option>
                  <option value="success">Success</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleResetFilters} className="text-charcoal-light text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
                <button onClick={handleRunReport} className="text-sm bg-navy text-white px-4 py-2 rounded hover:bg-navy-light">
                  Run Report
                </button>
              </div>
            </div>

            {!filters.month && (
              <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded flex items-center gap-2 mb-6">
                <AlertTriangle size={16} /> Select Month to view the report
              </div>
            )}

            {reportData.length > 0 && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Report Results</h4>
                  <div className="flex gap-2">
                    <button className="text-sm flex items-center gap-1 border px-2 py-1 rounded"><Download size={14} /> CSV</button>
                    <button className="text-sm flex items-center gap-1 border px-2 py-1 rounded"><Download size={14} /> PDF</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-silver-light text-left">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Client</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Action</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Module</th>
                        <th className="px-4 py-2">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {reportData.map((row) => (
                        <tr key={row.id}>
                          <td className="px-4 py-2">{row.id}</td>
                          <td className="px-4 py-2">{row.clientName}</td>
                          <td className="px-4 py-2">{row.date}</td>
                          <td className="px-4 py-2">{row.action}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${row.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{row.module}</td>
                          <td className="px-4 py-2">{row.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
