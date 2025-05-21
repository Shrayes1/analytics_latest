import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAdmin } from '../contexts/AdminContext';

const DashboardLayout: React.FC = () => {
  const { isCompanyAdmin } = useAdmin();

  return (
    <div className="flex h-screen bg-silver-light">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;