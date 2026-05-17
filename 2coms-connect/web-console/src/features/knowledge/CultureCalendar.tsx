import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, BellPlus, CheckCircle2, X, Info, TrendingUp } from 'lucide-react';

export const CultureCalendar = () => {
  const [showToast, setShowToast] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const events = [
    { id: 1, title: 'Management Vision Q3 Townhall', date: 'May 20, 2026', time: '10:00 AM', loc: 'Main Hall / Zoom', type: 'Strategy', color: 'bg-blue-600', desc: 'A deep dive into our global alignment goals and vertical expansion plans for 2026.' },
    { id: 2, title: 'AI Integration Workshop', date: 'May 22, 2026', time: '2:00 PM', loc: 'Tech Hub', type: 'Learning', color: 'bg-purple-600', desc: 'Hands-on session for developers to integrate new LLM pipelines into the 2COMS ecosystem.' },
    { id: 3, title: 'Employee Birthday: Priya Das', date: 'May 25, 2026', time: 'All Day', loc: 'Social Area', type: 'Culture', color: 'bg-pink-500', desc: 'Cake cutting and team celebration for Priya in the breakout area!' },
    { id: 4, title: 'Project Apollo 11 Retrospective', date: 'May 28, 2026', time: '11:30 AM', loc: 'Conference Room B', type: 'Projects', color: 'bg-emerald-600', desc: 'Analyzing the success metrics and delivery speed of the Apollo 11 launch.' }
  ];

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);

  const triggerReminder = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    setShowToast(`Reminder set for: ${title} 🔔`);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative pb-20">
      {showToast && (
        <div className="fixed top-24 right-8 z-50 bg-navy text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-white/10 animate-in slide-in-from-top-4">
          <CheckCircle2 size={18} className="text-blue-400" />
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <Card className="max-w-xl w-full p-10 space-y-6 relative animate-in zoom-in duration-200 border-none shadow-2xl rounded-3xl">
            <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 text-gray-400 hover:text-navy"><X size={24}/></button>
            <div className="space-y-4">
              <Badge className={`${selectedEvent.color} text-white border-none px-3 font-black uppercase text-[10px]`}>{selectedEvent.type}</Badge>
              <h2 className="text-3xl font-black text-navy leading-tight">{selectedEvent.title}</h2>
              <div className="flex items-center space-x-6 text-gray-400 text-sm font-bold">
                <div className="flex items-center"><Clock size={16} className="mr-2 text-blue-500" /> {selectedEvent.time}</div>
                <div className="flex items-center"><MapPin size={16} className="mr-2 text-blue-500" /> {selectedEvent.loc}</div>
              </div>
              <p className="text-gray-500 leading-relaxed pt-4 border-t border-gray-50">{selectedEvent.desc}</p>
            </div>
            <div className="flex gap-4 pt-6">
              <Button onClick={(e) => { triggerReminder(e, selectedEvent.title); setSelectedEvent(null); }} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg">Set Reminder</Button>
              <Button variant="outline" onClick={() => setSelectedEvent(null)} className="flex-1 py-4 rounded-2xl font-bold">Close</Button>
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">Culture Calendar</h1>
          <p className="text-gray-500 font-medium">Deep visualization of our organizational schedule.</p>
        </div>
        <div className="flex space-x-3 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <Button variant="ghost" className="rounded-xl px-3 hover:bg-gray-50"><ChevronLeft size={20}/></Button>
          <div className="px-6 py-2 font-black text-navy flex items-center tracking-tight">May 2026</div>
          <Button variant="ghost" className="rounded-xl px-3 hover:bg-gray-50"><ChevronRight size={20}/></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-black text-navy uppercase tracking-widest text-[10px] mb-4">Upcoming Schedule</h2>
          {filteredEvents.map((event, i) => (
            <div key={event.id} className="relative pl-8 pb-8 group">
              {i !== filteredEvents.length - 1 && (
                <div className="absolute left-[11px] top-10 bottom-0 w-0.5 bg-gray-100 group-hover:bg-blue-100 transition-colors"></div>
              )}
              <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md ${event.color} z-10 group-hover:scale-125 transition-transform`}></div>
              
              <Card 
                className="p-6 hover:shadow-2xl hover:border-blue-200 transition-all cursor-pointer group/card border-gray-100/60"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">{event.date}</span>
                      <Badge className="bg-gray-100 text-gray-500 border-none text-[9px] font-black uppercase px-2">{event.type}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A192F] group-hover/card:text-blue-600 transition-colors leading-tight">{event.title}</h3>
                    <div className="flex items-center space-x-6 text-gray-400 text-xs font-bold uppercase tracking-tighter">
                      <div className="flex items-center"><Clock size={14} className="mr-1.5" /> {event.time}</div>
                      <div className="flex items-center"><MapPin size={14} className="mr-1.5" /> {event.loc}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={(e) => triggerReminder(e, event.title)} className="text-gray-300 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-xl">
                      <BellPlus size={20} />
                    </Button>
                    <Info size={18} className="text-gray-200 group-hover/card:text-blue-200" />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-black text-navy mb-5 uppercase tracking-widest text-[10px]">Filter Events</h2>
            <div className="flex flex-wrap gap-2">
              {['All', 'Strategy', 'Learning', 'Culture', 'Projects'].map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => setFilter(tag)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === tag ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20' : 'bg-white border-gray-100 text-gray-400 hover:border-blue-100 hover:text-blue-600'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-2xl rounded-3xl relative overflow-hidden">
            <h4 className="text-lg font-black mb-6">Participation Score</h4>
            <p className="text-4xl font-black mb-2">85%</p>
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Team Engagement Goal</p>
            <div className="mt-6 w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full w-[85%]"></div>
            </div>
            <TrendingUp className="absolute -bottom-6 -right-6 text-white/10 w-32 h-32 rotate-12" />
          </Card>
        </div>
      </div>
    </div>
  );
};
