import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isCompanyAdmin: boolean;
  toggleAdminView: () => void;
  selectedClient: string | null;
  setSelectedClient: (client: string | null) => void;
}

const AdminContext = createContext<AdminContextType>({
  isCompanyAdmin: false,
  toggleAdminView: () => {},
  selectedClient: null,
  setSelectedClient: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCompanyAdmin, setIsCompanyAdmin] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>("Meridian Wealth Advisors");

  const toggleAdminView = () => {
    setIsCompanyAdmin(prev => !prev);
  };

  return (
    <AdminContext.Provider value={{ 
      isCompanyAdmin, 
      toggleAdminView, 
      selectedClient, 
      setSelectedClient 
    }}>
      {children}
    </AdminContext.Provider>
  );
};