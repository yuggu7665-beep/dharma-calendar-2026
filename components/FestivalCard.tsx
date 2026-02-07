
import React from 'react';
import { Festival } from '../types';
import { Bell, Info, Calendar } from 'lucide-react';

interface FestivalCardProps {
  festival: Festival;
  onNotify: (festival: Festival) => void;
  isNotified: boolean;
  onDetails: (festival: Festival) => void;
}

const FestivalCard: React.FC<FestivalCardProps> = ({ festival, onNotify, isNotified, onDetails }) => {
  const dateObj = new Date(festival.date);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = dateObj.getDate();
  const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

  const isToday = new Date().toISOString().split('T')[0] === festival.date;

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'major': 
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'fast': 
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default: 
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className={`card-hover glass-card rounded-2xl p-5 border-l-4 ${isToday ? 'border-l-red-500 bg-red-50/30' : 'border-l-orange-500'}`}>
      {isToday && (
        <div className="mb-3 inline-flex items-center gap-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
          <Calendar size={14} />
          Aaj Ka Din
        </div>
      )}
      
      <div className="flex gap-4">
        {/* Date Section */}
        <div className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-xl ${isToday ? 'bg-red-100 border-2 border-red-300' : 'bg-orange-100 border-2 border-orange-200'}`}>
          <span className={`text-xs font-medium uppercase ${isToday ? 'text-red-600' : 'text-orange-600'}`}>{monthName}</span>
          <span className={`text-2xl font-bold ${isToday ? 'text-red-700' : 'text-orange-700'}`}>{dayNum}</span>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-3xl flex-shrink-0">{festival.icon || '🕉️'}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">{festival.name}</h3>
              <p className="text-sm text-gray-500 font-hindi font-medium mb-2">{festival.hindiName}</p>
              <span className={`inline-block text-xs px-2.5 py-1 rounded-full border font-medium ${getTypeStyle(festival.type)}`}>
                {festival.type === 'major' ? 'Major Festival' : festival.type === 'fast' ? 'Fasting Day' : 'Observance'}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {festival.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button 
            onClick={() => onNotify(festival)}
            className={`p-2.5 rounded-lg transition-all ${isNotified ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'}`}
            title={isNotified ? "Reminder Set" : "Set Reminder"}
          >
            <Bell size={18} fill={isNotified ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={() => onDetails(festival)}
            className="p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-all"
            title="View Details"
          >
            <Info size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FestivalCard;
