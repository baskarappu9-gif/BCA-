import React from 'react';
import { Building2, Calendar, Award, DollarSign } from 'lucide-react';

const iconMap = {
  Building2,
  Calendar,
  Award,
  DollarSign
};

const StatCard = ({ label, value, iconName, delay = 0 }) => {
  const Icon = iconMap[iconName] || Building2;

  return (
    <div 
      className="card animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="w-10 h-10 text-primary-500 mb-4" />
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default StatCard;
