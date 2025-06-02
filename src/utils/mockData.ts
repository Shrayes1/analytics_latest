// Mock data for the dashboard

export const timeRangeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '180d', label: 'Last 180 Days' },
  { value: '1y', label: 'Last 1 Year' }
];

export const clientAdminKPIs = {
  activeUsers: {
    value: 148,
    trend: 8,
    sparkline: [110, 115, 125, 130, 135, 140, 148]
  },
  adoptionRate: {
    value: 72,
    trend: 4,
    progress: 72
  },
  totalQueries: {
    value: 32567,
    trend: 15,
    barChart: [2500, 2800, 3100, 2900, 3200, 3400, 3700]
  },
  taskCompletionRate: {
    value: 84,
    trend: 3,
    progress: 84
  },
  timeSaved: {
    value: 12.5,
    trend: 10,
    unit: 'hrs/week'
  }
};

export const featureUsageData = [
  { name: 'Client Meet', value: 35, color: '#0A3161' },
  { name: 'Client IQ', value: 25, color: '#7D98B3' },
  { name: 'Advisor IQ', value: 20, color: '#C4B17A' },
  { name: 'Client Write', value: 15, color: '#58776C' },
  { name: 'Client Guide', value: 15, color: '#58776C' },
  { name: 'Firm IQ', value: 5, color: '#722F37' }
];

export const userAdoptionTrend = Array.from({ length: 12 }, (_, i) => ({
  week: `Week ${i + 1}`,
  users: Math.floor(92 + (i * 5) + (Math.random() * 3)),
  target: 160
}));

export const activityHeatmapData = [
  { day: 'Monday', hour: '6am', value: 3 },
  { day: 'Monday', hour: '7am', value: 5 },
  { day: 'Monday', hour: '8am', value: 12 },
  { day: 'Monday', hour: '9am', value: 25 },
  { day: 'Monday', hour: '10am', value: 30 },
  { day: 'Monday', hour: '11am', value: 28 },
  { day: 'Monday', hour: '12pm', value: 15 },
  { day: 'Monday', hour: '1pm', value: 10 },
  { day: 'Monday', hour: '2pm', value: 22 },
  { day: 'Monday', hour: '3pm', value: 28 },
  { day: 'Monday', hour: '4pm', value: 20 },
  { day: 'Monday', hour: '5pm', value: 12 }
];

export const topAdvisors = [
  { name: 'Sarah Johnson', score: 92 },
  { name: 'Michael Chen', score: 90 },
  { name: 'David Rodriguez', score: 88 },
  { name: 'Emily Williams', score: 86 },
  { name: 'James Thompson', score: 85 }
];

export const taskCompletionData = [
  { name: 'Task Creation', value: 100 },
  { name: 'Task Assignment', value: 85 },
  { name: 'In Progress', value: 65 },
  { name: 'Review', value: 45 },
  { name: 'Completed', value: 35 }
];

export const clientEngagementData = [
  { metric: 'Client Meetings', value: 842, change: 12 },
  { metric: 'Client Emails', value: 3256, change: 8 },
  { metric: 'Documents Created', value: 421, change: 15 },
  { metric: 'Client Portal Visits', value: 1872, change: -3 }
];

export const clientMeetKPIs = {
  totalMeetings: {
    value: 842,
    trend: 9
  },
  avgDuration: {
    value: 38,
    unit: 'min',
    trend: -2
  },
  notesGenerated: {
    value: 761,
    trend: 12
  },
  clientSatisfaction: {
    value: 4.7,
    maxValue: 5,
    trend: 0.2
  }
};

export const clientIqKPIs = {
  profilesAccessed: {
    value: 1248,
    trend: 15
  },
  queriesAsked: {
    value: 7865,
    trend: 22
  },
  querySuccessRate: {
    value: 92,
    trend: 3
  },
  nextActionsGenerated: {
    value: 3428,
    trend: 18
  }
};

export const companyAdminKPIs = {
  clientOrgs: {
    value: 42
  },
  activeUsers: {
    value: 1248,
    trend: 15
  },
  platformAdoption: {
    value: 78
  },
  healthScore: {
    value: 85,
    trend: 5
  },
  licenseUtilization: {
    value: 92,
    trend: 3
  }
};

export const clientHealthMatrixData = [
  { client: 'Client A', adoptionRate: 85, satisfactionScore: 90, users: 150, age: 24 },
  { client: 'Client B', adoptionRate: 65, satisfactionScore: 75, users: 80, age: 12 },
  { client: 'Client C', adoptionRate: 92, satisfactionScore: 95, users: 200, age: 36 },
  { client: 'Client D', adoptionRate: 45, satisfactionScore: 60, users: 50, age: 6 },
  { client: 'Client E', adoptionRate: 78, satisfactionScore: 85, users: 120, age: 18 }
];

export const featureAdoptionHeatmapData = [
  { client: 'Client A', feature: 'Feature 1', value: 85 },
  { client: 'Client A', feature: 'Feature 2', value: 92 },
  { client: 'Client A', feature: 'Feature 3', value: 78 },
  { client: 'Client B', feature: 'Feature 1', value: 65 },
  { client: 'Client B', feature: 'Feature 2', value: 70 },
  { client: 'Client B', feature: 'Feature 3', value: 55 },
  { client: 'Client C', feature: 'Feature 1', value: 95 },
  { client: 'Client C', feature: 'Feature 2', value: 88 },
  { client: 'Client C', feature: 'Feature 3', value: 90 }
];

export const clientAlerts = [
  { client: 'Client A', metric: 'User Activity', change: '-25%', status: 'Investigating' },
  { client: 'Client B', metric: 'Feature Adoption', change: '-15%', status: 'Requires Attention' },
  { client: 'Client C', metric: 'Response Time', change: '+50ms', status: 'Monitoring' }
];