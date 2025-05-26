import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileBarChart, Settings, HelpCircle } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const Sidebar: React.FC = () => {
  const { isCompanyAdmin, selectedClient } = useAdmin();
  const location = useLocation();

  const getLinkClass = (isActive: boolean, isDashboard: boolean) => {
    // For Dashboard only, check for partially active state (header routes)
    if (isDashboard) {
      const isDashboardPartiallyActive =
        !isActive &&
        !['/reports', '/settings', '/help'].includes(location.pathname) &&
        location.pathname !== '/';

      if (isActive && location.pathname === '/') {
        // Fully active state for exact Dashboard route
        return 'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors bg-navy text-white';
      } else if (isDashboardPartiallyActive) {
        // Lighter active state for header routes (e.g., /client-meet, /client-iq)
        return 'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors bg-navy/50 text-white';
      }
    }

    // Default for all links (Dashboard when not active, or other links)
    return `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
      isActive ? 'bg-navy text-white' : 'text-charcoal hover:bg-navy/10'
    }`;
  };

  return (
    <div className="w-56 bg-white border-r border-silver flex flex-col">
      <div className="p-4 border-b border-silver">
        <h1 className="text-xl font-heading font-bold text-navy">
          Advisor Copilot
        </h1>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) => getLinkClass(isActive, true)}
          end
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => getLinkClass(isActive, false)}
        >
          <FileBarChart size={18} />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => getLinkClass(isActive, false)}
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) => getLinkClass(isActive, false)}
        >
          <HelpCircle size={18} />
          <span>Help</span>
        </NavLink>
      </div>

      <div className="p-4 border-t border-silver">
        <div className="bg-silver-light rounded-md p-3">
          <div className="font-medium text-sm text-charcoal">
            Role: {isCompanyAdmin ? 'Company Admin' : 'Client Admin'}
          </div>
          {!isCompanyAdmin && selectedClient && (
            <div className="mt-1 text-xs text-charcoal-light">
              Client: {selectedClient}
            </div>
          )}
          {isCompanyAdmin && (
            <div className="mt-1 text-xs text-charcoal-light">
              Viewing: All Clients
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;