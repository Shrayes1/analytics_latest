import React, { useState } from 'react';
import { BarChart3, Users, Calendar, Brain, PenTool, HelpCircle, Search, Star, Clock, AlertTriangle, Download, RefreshCw } from 'lucide-react';

const WealthAnalyticsDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  // Removed unused state variable 'showFilters'
  const [filters, setFilters] = useState({
    month: '',
    clientName: '',
    dateRange: '',
    specificFilter: ''
  });
  const [reportData, setReportData] = useState<{ id: number; clientName: string; date: string; action: string; status: string; module: string; details: string; }[]>([]);

  const modules = [
    { id: 'clientmeet', name: 'ClientMeet', icon: Calendar, color: 'bg-blue-100 text-blue-700' },
    { id: 'clientiq', name: 'ClientIQ', icon: Brain, color: 'bg-purple-100 text-purple-700' },
    { id: 'advisoriq', name: 'AdvisorIQ', icon: Users, color: 'bg-green-100 text-green-700' },
    { id: 'clientwrite', name: 'ClientWrite', icon: PenTool, color: 'bg-orange-100 text-orange-700' },
    { id: 'firmiq', name: 'FirmIQ', icon: BarChart3, color: 'bg-red-100 text-red-700' },
    { id: 'clientguide', name: 'ClientGuide', icon: HelpCircle, color: 'bg-indigo-100 text-indigo-700' }
  ];

  const moduleCategories = {
    clientiq: [
      { id: 'tab-usage', name: 'Tab Usage Report', description: 'Track usage patterns across different tabs and subtabs' },
      { id: 'opportunity-actions', name: 'Areas of Opportunity Actions', description: 'Monitor actions taken on opportunity recommendations' },
      { id: 'profile-actions', name: 'Client Profile Actions', description: 'Analyze client profile interactions and updates' },
      { id: 'search-usage', name: 'Search Tab Usage', description: 'Search functionality usage and fallback analysis' }
    ],
    clientwrite: [
      { id: 'email', name: 'Email Analytics', description: 'Track email generation, regeneration, and template usage' },
      { id: 'wealth-profile', name: 'Wealth Profile Report', description: 'Monitor wealth profile creation and distribution' },
      { id: 'query-bar', name: 'Query Bar Usage', description: 'Analyze query bar interactions and success rates' }
    ],
    clientmeet: [
      { id: 'transcriber', name: 'Transcriber Analytics', description: 'Track transcription success rates and failures' },
      { id: 'scheduler-actions', name: 'Scheduler Actions', description: 'Monitor meeting scheduling and related actions' },
      { id: 'past-meeting', name: 'Past Meeting Actions', description: 'Analyze post-meeting activities and follow-ups' },
      { id: 'upcoming-meeting', name: 'Upcoming Meeting Actions', description: 'Track pre-meeting preparations and activities' }
    ],
    advisoriq: [
      { id: 'insights', name: 'Insights Analytics', description: 'Monitor insights tab usage and engagement' },
      { id: 'trending-clients', name: 'Trending Clients Report', description: 'Track trending client analysis and actions' },
      { id: 'word-cloud', name: 'Word Cloud Usage', description: 'Analyze word cloud feature utilization' }
    ],
    clientguide: [
      { id: 'user-feedback', name: 'User Feedback Analysis', description: 'Track positive/negative feedback patterns' },
      { id: 'response-analysis', name: 'Response Analysis', description: 'Monitor KB vs Doc responses and quality' },
      { id: 'usage-traffic', name: 'Usage Traffic Report', description: 'Analyze overall usage patterns and user activity' }
    ],
    firmiq: [
      { id: 'firm-analytics', name: 'Firm Analytics', description: 'Comprehensive firm-level analytics and insights' },
      { id: 'performance', name: 'Performance Metrics', description: 'Track firm performance indicators and trends' }
    ]
  };

  const overviewCategories = [
    { id: 'system-health', name: 'System Health Overview', description: 'Monitor system uptime, response times, and overall platform health' },
    { id: 'user-engagement', name: 'User Engagement Analytics', description: 'Track active users, session duration, and engagement patterns' },
    { id: 'module-performance', name: 'Module Performance Report', description: 'Compare performance metrics across all platform modules' },
    { id: 'client-usage', name: 'Client Usage Analytics', description: 'Analyze usage patterns and trends by client organizations' },
    { id: 'product-health', name: 'Product Health Score', description: 'Overall product health indicators and quality metrics' },
    { id: 'error-analysis', name: 'Error & Fallback Analysis', description: 'Track system errors, fallbacks, and resolution patterns' }
  ];

  const recentlyUsed = [
    { name: 'ClientIQ Tab Usage', description: 'See usage patterns across different ClientIQ tabs for the selected period.', module: 'clientiq', category: 'tab-usage' },
    { name: 'Email Analytics', description: 'Track email generation and template usage statistics.', module: 'clientwrite', category: 'email' },
    { name: 'Meeting Transcriber Report', description: 'Analyze transcription success rates and performance.', module: 'clientmeet', category: 'transcriber' }
  ];

  const sampleReportData = [
    { id: 1, clientName: 'Johnson Wealth Management', date: '2024-06-01', action: 'Email Sent', status: 'Success', module: 'ClientWrite', details: 'Welcome email template used' },
    { id: 2, clientName: 'Smith Financial Group', date: '2024-06-01', action: 'Meeting Scheduled', status: 'Success', module: 'ClientMeet', details: 'Q2 review meeting' },
    { id: 3, clientName: 'Brown Advisory LLC', date: '2024-06-02', action: 'Wealth Profile Created', status: 'Success', module: 'ClientWrite', details: 'Comprehensive profile generated' },
    { id: 4, clientName: 'Davis Investment Co', date: '2024-06-02', action: 'Search Query', status: 'Success', module: 'ClientIQ', details: 'Tax optimization search' },
    { id: 5, clientName: 'Wilson Capital', date: '2024-06-03', action: 'Transcription', status: 'Failed', module: 'ClientMeet', details: 'Audio quality issues' }
  ];

  const handleRunReport = () => {
    if (!filters.month) {
      return;
    }
    setReportData(sampleReportData);
  };

  const handleResetFilters = () => {
    setFilters({
      month: '',
      clientName: '',
      dateRange: '',
      specificFilter: ''
    });
    setReportData([]);
  };

  const openReport = (module: string, category: string) => {
    setSelectedModule(module);
    setSelectedCategory(category);
    setCurrentPage('report');
    // Removed unused 'setShowFilters' call
  };

  const renderSidebar = () => (
    <div className="w-80 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Categories</h1>
      </div>
      
      <nav className="p-4">
        <div 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer mb-2 ${
            currentPage === 'home' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setCurrentPage('home')}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Reports Home</span>
        </div>

        <div 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer mb-4 ${
            selectedModule === 'overview' && currentPage === 'report' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => {
            setSelectedModule('overview');
            setCurrentPage('report');
            setSelectedCategory('');
          }}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Overview</span>
        </div>
        
        <div className="space-y-2">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                selectedModule === module.id && currentPage === 'report' 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                setSelectedModule(module.id);
                setCurrentPage('report');
                setSelectedCategory('');
              }}
            >
              <module.icon className="w-5 h-5" />
              <span className="font-medium">{module.name}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );

  const renderReportsHome = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reports Home</h1>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search in all reports"
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Favourites Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">Favourites</h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500">No favourites yet. Explore reports to add some to your favourites.</p>
            </div>
          </div>

          {/* Recently Used Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Recently Used</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyUsed.map((report, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => openReport(report.module, report.category)}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              ))}
              
              {/* Add Overview quick access */}
              <div 
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openReport('overview', 'system-health')}
              >
                <h3 className="font-semibold text-gray-900 mb-2">System Health Overview</h3>
                <p className="text-sm text-gray-600">Monitor overall system performance and health metrics.</p>
              </div>
            </div>
          </div>

          {/* All Modules Grid */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">All Reports</h2>
            
            {/* Overview Section */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-700 mb-4">Overview Reports</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Overview Analytics</h3>
                <div className="space-y-2">
                  {overviewCategories.slice(0, 3).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => openReport('overview', category.id)}
                      className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {category.name}
                    </button>
                  ))}
                  <p className="text-sm text-gray-500">+{overviewCategories.length - 3} more reports</p>
                </div>
              </div>
            </div>

            {/* Module Reports */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-4">Module Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <div key={module.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-4`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{module.name}</h3>
                    <div className="space-y-2">
                      {moduleCategories[module.id as keyof typeof moduleCategories]?.slice(0, 3).map((category: { id: string; name: string; description: string }) => (
                        <button
                          key={category.id}
                          onClick={() => openReport(module.id, category.id)}
                          className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {category.name}
                        </button>
                      ))}
                      {moduleCategories[module.id as keyof typeof moduleCategories]?.length > 3 && (
                        <p className="text-sm text-gray-500">+{moduleCategories[module.id as keyof typeof moduleCategories].length - 3} more reports</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportPage = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {selectedModule === 'overview' 
                  ? selectedCategory 
                    ? overviewCategories.find(cat => cat.id === selectedCategory)?.name || 'Overview Report'
                    : 'Overview Reports'
                  : selectedCategory
                    ? moduleCategories[selectedModule as keyof typeof moduleCategories]?.find((cat: { id: string; name: string; description: string }) => cat.id === selectedCategory)?.name || 'Report'
                    : `${modules.find(m => m.id === selectedModule)?.name || 'Module'} Reports`
                }
              </h1>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Show category selection if no specific category is selected */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedModule === 'overview' 
                ? overviewCategories.map((category) => (
                    <div 
                      key={category.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  ))
                : moduleCategories[selectedModule as keyof typeof moduleCategories]?.map((category: { id: string; name: string; description: string }) => (
                    <div 
                      key={category.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  ))
              }
            </div>
          )}

          {/* Show filters and report when category is selected */}
          {selectedCategory && (
            <>
              {/* Filters Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                    <select 
                      value={filters.month}
                      onChange={(e) => setFilters({...filters, month: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Month</option>
                      <option value="2024-06">June 2024</option>
                      <option value="2024-05">May 2024</option>
                      <option value="2024-04">April 2024</option>
                      <option value="2024-03">March 2024</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <select 
                      value={filters.clientName}
                      onChange={(e) => setFilters({...filters, clientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Clients</option>
                      <option value="johnson">Johnson Wealth Management</option>
                      <option value="smith">Smith Financial Group</option>
                      <option value="brown">Brown Advisory LLC</option>
                      <option value="davis">Davis Investment Co</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select 
                      value={filters.dateRange}
                      onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Range</option>
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="last90days">Last 90 Days</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                    <select 
                      value={filters.specificFilter}
                      onChange={(e) => setFilters({...filters, specificFilter: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Actions</option>
                      <option value="email">Email Actions</option>
                      <option value="meeting">Meeting Actions</option>
                      <option value="search">Search Actions</option>
                      <option value="transcription">Transcription</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">All Status</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={handleResetFilters} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                  <button 
                    onClick={handleRunReport}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Run
                  </button>
                </div>
              </div>

              {/* Warning Message */}
              {!filters.month && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800">Please select Month and click run to view the report</span>
                </div>
              )}

              {/* Report Table */}
              {reportData.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Report Results</h3>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        Export CSV
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.clientName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.action}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                row.status === 'Success' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.module}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (currentPage === 'home') {
    return renderReportsHome();
  } else {
    return renderReportPage();
  }
};

export default WealthAnalyticsDashboard;