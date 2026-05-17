import React from 'react';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';

export const Calendar = ({ onBack }: any) => {
  const events = [
    { id: 1, title: 'Management Vision Q3 Townhall', date: 'May 20, 2026', time: '10:00 AM', loc: 'Main Hall / Zoom', color: 'bg-blue-600' },
    { id: 2, title: 'AI Integration Workshop', date: 'May 22, 2026', time: '2:00 PM', loc: 'Tech Hub', color: 'bg-purple-600' },
    { id: 3, title: 'Employee Birthday: Priya Das', date: 'May 25, 2026', time: 'All Day', loc: 'Social Area', color: 'bg-pink-500' }
  ];
  return (
    <div className="absolute inset-0 bg-[#F8FAFC] animate-in slide-in-from-bottom duration-300 z-[80] flex flex-col">
      <div className="px-6 py-10 bg-white flex items-center space-x-4 border-b border-gray-100 shadow-md text-left leading-none">
        <button onClick={onBack} className="p-2 -ml-2 text-navy active:scale-90 transition-all"><ArrowLeft size={24}/></button>
        <h2 className="font-black text-lg text-navy tracking-tight uppercase leading-none">Culture Calendar</h2>
      </div>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="flex space-x-4 text-left">
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-3.5 h-3.5 rounded-full ${event.color} mt-2 shadow-lg`}></div>
              <div className="w-0.5 flex-1 bg-gray-100"></div>
            </div>
            <div className="flex-1 pb-10">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">{event.date}</p>
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h4 className="font-bold text-navy text-sm mb-3 leading-snug">{event.title}</h4>
                <div className="flex flex-col space-y-2 text-gray-400 text-[10px] font-bold uppercase">
                  <div className="flex items-center"><Clock size={14} className="mr-2 text-blue-500" /> {event.time}</div>
                  <div className="flex items-center"><MapPin size={14} className="mr-2 text-blue-500" /> {event.loc}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
