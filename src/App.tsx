import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ClientAdminDashboard from './pages/ClientAdminDashboard';
import CompanyAdminDashboard from './pages/CompanyAdminDashboard';
import ClientMeet from './pages/features/ClientMeet';
import ClientIQ from './pages/features/ClientIQ';
import AdvisorIQ from './pages/features/AdvisorIQ';
import ClientWrite from './pages/features/ClientWrite';
import FirmIQ from './pages/features/FirmIQ';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<ClientAdminDashboard />} />
        <Route path="company-admin" element={<CompanyAdminDashboard />} />
        <Route path="client-meet" element={<ClientMeet />} />
        <Route path="client-iq" element={<ClientIQ />} />
        <Route path="advisor-iq" element={<AdvisorIQ />} />
        <Route path="client-write" element={<ClientWrite />} />
        <Route path="firm-iq" element={<FirmIQ />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  );
}

export default App;