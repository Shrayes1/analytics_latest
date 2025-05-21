import React, { useState } from 'react';
import { User, Bell, Palette, BarChart, Link, Server, Shield, Brush } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('user');
  const { isCompanyAdmin, selectedClient } = useAdmin();
  
  const tabs = [
    { id: 'user', name: 'User Management', icon: <User size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'theme', name: 'Theme Settings', icon: <Palette size={18} /> },
    { id: 'data', name: 'Data Display', icon: <BarChart size={18} /> },
    { id: 'integrations', name: 'Integrations', icon: <Link size={18} /> },
    { id: 'platform', name: 'Platform Config', icon: <Server size={18} /> },
    { id: 'security', name: 'Security', icon: <Shield size={18} /> },
    { id: 'white-label', name: 'White Labeling', icon: <Brush size={18} /> },
  ];

  // Mock user data based on client selection
  const getUserData = () => {
    if (!isCompanyAdmin) {
      return [
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@meridianwealth.com',
          role: 'Client Admin',
          status: 'Active'
        },
        {
          name: 'Michael Chen',
          email: 'michael.chen@meridianwealth.com',
          role: 'Advisor',
          status: 'Active'
        }
      ];
    }

    if (selectedClient) {
      return [
        {
          name: 'Sarah Johnson',
          email: `sarah.johnson@${selectedClient.toLowerCase().replace(/\s+/g, '')}.com`,
          role: 'Client Admin',
          status: 'Active'
        },
        {
          name: 'Michael Chen',
          email: `michael.chen@${selectedClient.toLowerCase().replace(/\s+/g, '')}.com`,
          role: 'Advisor',
          status: 'Active'
        }
      ];
    }

    return [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@meridianwealth.com',
        role: 'Client Admin',
        status: 'Active'
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@alphawealth.com',
        role: 'Client Admin',
        status: 'Active'
      },
      {
        name: 'Jessica Martinez',
        email: 'jessica.martinez@betaadvisors.com',
        role: 'Client Admin',
        status: 'Inactive'
      }
    ];
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 card">
        <h3 className="mb-4">Settings Menu</h3>
        <ul className="space-y-1">
          {tabs.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 text-sm ${
                  activeTab === tab.id
                    ? 'bg-navy text-white'
                    : 'hover:bg-silver-light text-charcoal'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="lg:col-span-9 card">
        {activeTab === 'user' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>User Management</h3>
              {isCompanyAdmin && (
                <div className="text-sm text-charcoal-light">
                  {selectedClient ? `Showing users for ${selectedClient}` : 'Showing users for all clients'}
                </div>
              )}
            </div>
            <div className="border border-silver rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-silver">
                <thead className="bg-silver-light">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-light uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-light uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-light uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-light uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-light uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-silver">
                  {getUserData().map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm">{user.name}</td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">{user.role}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' 
                            ? 'bg-sage-light text-sage' 
                            : 'bg-silver text-charcoal-light'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-navy hover:text-navy-light mr-2">Edit</button>
                        <button className={`${
                          user.status === 'Active'
                            ? 'text-burgundy hover:text-burgundy-light'
                            : 'text-sage hover:text-sage-light'
                        }`}>
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="btn-primary">Add User</button>
              <button className="btn-tertiary">Bulk Import</button>
            </div>
          </div>
        )}
        
        {activeTab === 'white-label' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>White Labeling</h3>
              {isCompanyAdmin && (
                <div className="text-sm text-charcoal-light">
                  {selectedClient ? `Configuring for ${selectedClient}` : 'Configuring for all clients'}
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <input 
                  type="text" 
                  className="w-full border border-silver rounded px-3 py-2"
                  value={selectedClient || "Meridian Wealth Advisors"}
                  readOnly={isCompanyAdmin && !selectedClient}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Logo Upload</label>
                <div className="border-2 border-dashed border-silver rounded-md p-6 text-center">
                  <div className="mx-auto w-24 h-24 bg-silver-light rounded flex items-center justify-center mb-3">
                    <p className="text-charcoal-light">Logo</p>
                  </div>
                  <button className="btn-tertiary text-sm" disabled={isCompanyAdmin && !selectedClient}>
                    Upload Logo
                  </button>
                  <p className="text-xs text-charcoal-light mt-2">Recommended size: 200x60px, PNG or SVG</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Color Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-silver rounded p-3 cursor-pointer bg-white">
                    <div className="h-8 bg-navy mb-2 rounded"></div>
                    <div className="h-2 bg-gold rounded"></div>
                    <p className="text-xs mt-2 text-center">Default</p>
                  </div>
                  <div className="border border-silver rounded p-3 cursor-pointer bg-white">
                    <div className="h-8 bg-burgundy mb-2 rounded"></div>
                    <div className="h-2 bg-silver-dark rounded"></div>
                    <p className="text-xs mt-2 text-center">Burgundy</p>
                  </div>
                  <div className="border border-silver rounded p-3 cursor-pointer bg-white">
                    <div className="h-8 bg-sage mb-2 rounded"></div>
                    <div className="h-2 bg-gold-light rounded"></div>
                    <p className="text-xs mt-2 text-center">Sage</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Custom Font</label>
                <select 
                  className="w-full border border-silver rounded px-3 py-2"
                  disabled={isCompanyAdmin && !selectedClient}
                >
                  <option>Default (Playfair Display / Source Sans Pro)</option>
                  <option>Serif (Georgia)</option>
                  <option>Sans-serif (Arial)</option>
                  <option>Custom...</option>
                </select>
              </div>
              
              <div className="pt-4 border-t border-silver">
                <button 
                  className="btn-primary mr-3"
                  disabled={isCompanyAdmin && !selectedClient}
                >
                  Save Changes
                </button>
                <button className="btn-tertiary">Cancel</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Add more tab content as needed */}
        {!(activeTab === 'user' || activeTab === 'white-label') && (
          <div className="text-center py-10 text-charcoal-light">
            <h3 className="mb-2">{tabs.find(t => t.id === activeTab)?.name} Settings</h3>
            <p>This settings panel would be implemented in the full version.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;