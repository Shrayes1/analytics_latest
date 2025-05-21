import React from 'react';
import { useLocation } from 'react-router-dom';
import { User, Bell, HelpCircle, Menu } from 'lucide-react';
import ClientSelector from '../components/ui/ClientSelector';
import TimeRangeSelector from '../components/ui/TimeRangeSelector';
import AdminViewSwitch from '../components/ui/AdminViewSwitch';
import FeatureNav from '../components/ui/FeatureNav';
import { useAdmin } from '../contexts/AdminContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { isCompanyAdmin, selectedClient } = useAdmin();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return isCompanyAdmin ? 'Company Admin Dashboard' : 'Client Admin Dashboard';
    if (path === '/client-meet') return 'Client Meet';
    if (path === '/client-iq') return 'Client IQ';
    if (path === '/advisor-iq') return 'Advisor IQ';
    if (path === '/client-write') return 'Client Write';
    if (path === '/firm-iq') return 'Firm IQ';
    if (path === '/reports') return 'Reports';
    if (path === '/settings') return 'Settings';
    if (path === '/help') return 'Help & Support';
    return 'Dashboard';
  };
  
  const showTimeSelector = location.pathname !== '/reports' && 
                          location.pathname !== '/settings' && 
                          location.pathname !== '/help';
  
  return (
    <header className="bg-white border-b border-silver">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-xl font-heading font-medium">{getPageTitle()}</h2>
              {!isCompanyAdmin && selectedClient && (
                <p className="text-sm text-charcoal-light mt-0.5">{selectedClient}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {showTimeSelector && <TimeRangeSelector />}
            <ClientSelector />
            
            <div className="flex items-center gap-3">
              <button className="text-charcoal-light hover:text-navy transition-colors">
                <Bell size={20} />
              </button>
              <button className="text-charcoal-light hover:text-navy transition-colors">
                <HelpCircle size={20} />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium">
                  <div className="bg-navy text-white p-1.5 rounded-full">
                    <User size={16} />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-silver rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2">
                    <AdminViewSwitch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeatureNav />
      </div>
    </header>
  );
};

export default Header;