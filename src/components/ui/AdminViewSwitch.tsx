import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Building2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminViewSwitch: React.FC = () => {
  const { isCompanyAdmin, toggleAdminView } = useAdmin();
  const navigate = useNavigate();

  const handleSwitch = () => {
    toggleAdminView();
    // Navigate to appropriate dashboard when switching views
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSwitch}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-silver-light w-full"
      >
        {isCompanyAdmin ? (
          <>
            <Building2 size={16} className="text-navy" />
            <span className="text-sm">Switch to Client Admin</span>
          </>
        ) : (
          <>
            <User size={16} className="text-navy" />
            <span className="text-sm">Switch to Company Admin</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AdminViewSwitch;