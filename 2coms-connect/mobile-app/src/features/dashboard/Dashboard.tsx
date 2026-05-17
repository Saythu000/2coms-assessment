import React, { useState } from 'react';
import { Users, Calendar, Clock, Share2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mobileStyles as styles, BadgeComponent } from '../../components/shared/MobileShared';
import { MOCK_NEW_JOINEES, MOCK_ROADMAP } from '../../api/mockData';

export const Dashboard = ({ content = [], reactions = {}, userVoted = {}, onReaction, onNavigate }: any) => {
  const { currentUser } = useAuth();
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  const showToast = (name: string) => {
    setWelcomeToast(name);
    setTimeout(() => setWelcomeToast(null), 3000);
  };

  const mainVision = content.find((c: any) => c?.type === 'VISION') || { 
    title: 'Vision 2026', 
    content: 'Syncing roadmap from the unified common pool...' 
  };
  const feedItems = content.filter((c: any) => c && c.type !== 'VISION');

  return (
    <div className={styles.contentArea}>
      {welcomeToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 animate-in slide-in-from-top-4 duration-300 border border-white/20">
          <CheckCircle2 size={16} />
          <p className="text-[10px] font-black uppercase tracking-widest">Welcome sent to {welcomeToast}!</p>
        </div>
      )}

      {showRoadmap && (
        <div className="absolute inset-0 z-[60] bg-[#0A192F]/95 backdrop-blur-md flex flex-col p-8 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-10 text-left">
            <h2 className="text-2xl font-black text-white leading-none uppercase tracking-tighter">Roadmap 2026</h2>
            <button onClick={() => setShowRoadmap(false)} className="text-blue-400 font-bold uppercase text-[10px]">Close</button>
          </div>
          <div className="space-y-8 flex-1 text-left overflow-y-auto">
            {MOCK_ROADMAP.map(item => (
              <div key={item.id} className="border-l-2 border-blue-500 pl-4 py-1 bg-white/5 p-4 rounded-r-2xl">
                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-blue-100/60 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowRoadmap(false)} className="mt-6 w-full py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl active:scale-95 transition-all">Back to Pulse</button>
        </div>
      )}

      <div className="p-5 flex justify-between items-end mb-2">
        <div className="text-left leading-none">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Morning, {currentUser?.name?.split(' ')[0] || 'Member'}</p>
          <h1 className="text-3xl font-black text-navy tracking-tight mt-1">The Pulse</h1>
        </div>
        <img src={currentUser?.avatar} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md bg-gray-100" alt="Avatar" />
      </div>

      <div className="flex space-x-4 overflow-x-auto px-5 pb-6 no-scrollbar">
        {MOCK_NEW_JOINEES.map((joinee, i) => (
          <div key={i} className="min-w-[220px] bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center"><Users size={20} className="text-blue-400" /></div>
              <div className="text-left leading-none">
                <p className="text-sm font-bold text-navy">{joinee.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{joinee.dept}</p>
              </div>
            </div>
            <button 
              onClick={() => showToast(joinee.name)}
              className="w-full py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest active:bg-blue-600 active:text-white"
            >
              Say Welcome
            </button>
          </div>
        ))}
      </div>
      
      <div className="mx-5 bg-gradient-to-br from-[#0A192F] to-[#112240] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden mb-6 text-left group">
        <span className="bg-amber-400/20 text-amber-300 text-[9px] font-black uppercase px-2 py-1 rounded-md mb-3 inline-block">2026 Strategy</span>
        <h3 className="text-xl font-bold mb-2 leading-tight">{mainVision.title}</h3>
        <p className="text-blue-100/70 text-xs leading-relaxed mb-6">{mainVision.content}</p>
        <button onClick={() => setShowRoadmap(true)} className="bg-blue-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">See Roadmap</button>
      </div>

      <div onClick={() => onNavigate('calendar')} className="mx-5 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-6 text-left active:scale-95 transition-all">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Calendar size={22} /></div>
          <div>
            <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">Next Event • May 20</p>
            <h4 className="font-bold text-navy text-sm">Q3 Management Townhall</h4>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center font-bold uppercase"><Clock size={10} className="mr-1" /> 10:00 AM • Main Hall</p>
          </div>
        </div>
      </div>

      <div className="space-y-1 pb-10">
        {feedItems.map((post: any) => (
          <div key={post.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm mx-5 mb-5 text-left active:scale-95 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm uppercase">{post.type?.[0] || 'P'}</div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-navy uppercase tracking-tighter">{post.type?.replace('_', ' ') || 'POST'}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Just now</p>
                </div>
              </div>
            </div>
            <h4 className="font-bold text-navy text-base mb-2 leading-snug text-left">{post.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium text-left">{post.content}</p>
            <div className="flex justify-between border-t border-gray-100 pt-4">
              <div className="flex space-x-5">
                {['🚀', '🔥'].map(emoji => {
                  const key = `${post.id}-${emoji}`;
                  const active = userVoted[key];
                  return (
                    <button key={emoji} onClick={(e) => { e.stopPropagation(); onReaction(post.id, emoji); }} className={`flex items-center space-x-2 active:scale-90 transition-all ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                      <span className="text-xl">{emoji}</span>
                      <span className="font-black text-[10px]">{reactions[key] || 0}</span>
                    </button>
                  );
                })}
              </div>
              <div className="text-gray-300"><Share2 size={20}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
