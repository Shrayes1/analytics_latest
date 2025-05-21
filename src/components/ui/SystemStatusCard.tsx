import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
}

interface SystemStatusCardProps {
  statuses: SystemStatus[];
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({ statuses }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="text-sage" size={16} />;
      case 'degraded':
        return <AlertTriangle className="text-gold" size={16} />;
      case 'down':
        return <XCircle className="text-burgundy" size={16} />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-sage-light text-sage';
      case 'degraded':
        return 'bg-gold-light text-gold-dark';
      case 'down':
        return 'bg-burgundy-light text-burgundy';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-3">
      {statuses.map((status, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.status)}
            <span className="text-sm">{status.name}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(status.status)}`}>
            {status.uptime}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default SystemStatusCard;