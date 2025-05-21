import React, { useState } from 'react';
import { Building, ChevronDown, Search } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface ClientSelectorProps {
  isCompanyAdmin?: boolean;
}

const ClientSelector: React.FC<ClientSelectorProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCompanyAdmin, selectedClient, setSelectedClient } = useAdmin();
  
  const clients = [
    { id: 'all', name: 'All Clients' },
    { id: 'meridian', name: 'Meridian Wealth Advisors' },
    { id: 'alpha', name: 'Alpha Wealth' },
    { id: 'beta', name: 'Beta Advisors' },
    { id: 'gamma', name: 'Gamma Financial' },
    { id: 'delta', name: 'Delta Partners' },
  ];
  
  const handleSelectClient = (client: string | null) => {
    setSelectedClient(client === 'all' ? null : clients.find(c => c.id === client)?.name || null);
    setIsOpen(false);
  };
  
  // Only show selector for company admin
  if (!isCompanyAdmin) {
    return null;
  }
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border border-silver rounded-md hover:bg-silver-light transition-colors"
      >
        <Building size={16} className="text-navy" />
        <span className="text-charcoal">{selectedClient || 'All Clients'}</span>
        <ChevronDown size={14} className="text-charcoal-light" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-silver rounded-md shadow-lg z-50">
          <div className="p-2 border-b border-silver">
            <div className="relative">
              <Search size={14} className="absolute left-2 top-2.5 text-charcoal-light" />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-silver rounded-md focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy"
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            {clients.map(client => (
              <li key={client.id}>
                <button
                  onClick={() => handleSelectClient(client.id)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-silver-light text-charcoal"
                >
                  {client.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientSelector;