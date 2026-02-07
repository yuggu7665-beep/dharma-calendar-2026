
import React from 'react';
import { Bell, X, Trash2, CalendarClock } from 'lucide-react';
import { Festival } from '../types';

interface NotificationPanelProps {
  notifications: Festival[];
  onRemove: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onRemove, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b flex items-center justify-between bg-orange-50">
          <div className="flex items-center gap-2">
            <Bell className="text-orange-500" />
            <h2 className="text-xl font-bold font-cinzel text-gray-800">My Reminders</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-100 rounded-full text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <CalendarClock size={64} className="opacity-20" />
              <p className="text-lg">No reminders set yet</p>
              <p className="text-sm text-center max-w-[250px]">
                Click the bell icon on any festival to get notified!
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-lg text-2xl">
                  {n.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{n.name}</h4>
                  <p className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => onRemove(n.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <p className="text-xs text-gray-400 text-center">
            You will receive browser notifications for these festivals on the day they occur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
