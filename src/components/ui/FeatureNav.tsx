import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageSquare, Brain, PenTool, Building2, UserCog } from 'lucide-react';

const FeatureNav: React.FC = () => {
  const location = useLocation();
  
  // Only show feature nav on feature pages and dashboard
  const showNav = ['/', '/client-meet', '/client-iq', '/advisor-iq', '/client-write', '/firm-iq'].includes(location.pathname);
  
  if (!showNav) return null;

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-navy text-white shadow-sm'
        : 'text-charcoal hover:bg-navy/5'
    }`;
  };

  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-1">
      <NavLink to="/client-meet" className={getLinkClass}>
        <MessageSquare size={18} />
        <span>Client Meet</span>
      </NavLink>
      <NavLink to="/client-iq" className={getLinkClass}>
        <Brain size={18} />
        <span>Client IQ</span>
      </NavLink>
      <NavLink to="/advisor-iq" className={getLinkClass}>
        <UserCog size={18} />
        <span>Advisor IQ</span>
      </NavLink>
      <NavLink to="/client-write" className={getLinkClass}>
        <PenTool size={18} />
        <span>Client Write</span>
      </NavLink>
      <NavLink to="/firm-iq" className={getLinkClass}>
        <Building2 size={18} />
        <span>Firm IQ</span>
      </NavLink>
    </nav>
  );
};

export default FeatureNav;