import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileBarChart, Settings, HelpCircle } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const Sidebar: React.FC = () => {
  const { isCompanyAdmin, selectedClient } = useAdmin();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-navy text-white'
        : 'text-charcoal hover:bg-navy/10'
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
        <NavLink to="/" className={getLinkClass} end>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/reports" className={getLinkClass}>
          <FileBarChart size={18} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={getLinkClass}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/help" className={getLinkClass}>
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