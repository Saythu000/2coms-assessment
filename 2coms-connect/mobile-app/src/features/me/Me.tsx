import React, { useState } from 'react';
import { UserCircle, LogOut, TrendingUp, Trophy, Heart, LayoutDashboard, Star, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../api/mockData';
import { mobileStyles as styles } from '../../components/shared/MobileShared';

export const Me = () => {
  const { currentUser, logout } = useAuth();
  const [showGlobalList, setShowGlobalList] = useState(false);
  const shoutouts = [{ from: 'Ananya Sharma', text: 'Great work on the Apollo retro!', time: 'Yesterday' }, { from: 'Amit Patel', text: 'Thanks for the quick design feedback.', time: '2 days ago' }];

  if (showGlobalList) {
    return (
      <div className="absolute inset-0 bg-[#F8FAFC] animate-in slide-in-from-right duration-300 z-[80] flex flex-col">
        <div className="px-6 py-10 bg-navy text-white flex items-center space-x-4 shadow-lg"><button onClick={() => setShowGlobalList(false)} className="p-2 -ml-2"><ArrowLeft size={24}/></button><h2 className="font-black text-lg tracking-tight uppercase text-left">Leaderboards</h2></div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-end justify-center space-x-4 p-8 bg-white border-b border-gray-100">
            <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full border-2 border-gray-200 mb-2 overflow-hidden"><img src="https://i.pravatar.cc/150?u=1" alt="Rank 2" /></div><div className="w-16 h-16 bg-gray-100 rounded-t-xl flex items-center justify-center font-black text-gray-400">2</div></div>
            <div className="flex flex-col items-center"><Trophy className="text-amber-500 mb-2" size={32} /><div className="w-16 h-16 rounded-full border-4 border-amber-400 mb-2 overflow-hidden"><img src="https://i.pravatar.cc/150?u=2" alt="Rank 1" /></div><div className="w-20 h-24 bg-navy rounded-t-xl flex items-center justify-center font-black text-white text-xl shadow-2xl">1</div></div>
            <div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full border-2 border-gray-200 mb-2 overflow-hidden"><img src="https://i.pravatar.cc/150?u=3" alt="Rank 3" /></div><div className="w-16 h-12 bg-gray-50 rounded-t-xl flex items-center justify-center font-black text-gray-300">3</div></div>
          </div>
          <div className="p-6 space-y-4">{MOCK_USERS.map((user, i) => (<div key={user.id} className="flex items-center space-x-4 bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm active:scale-95 transition-all text-left"><div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>{i + 1}</div><img src={user.avatar} className="w-12 h-12 rounded-2xl" alt="User avatar" /><div className="flex-1"><p className="font-bold text-navy text-sm leading-tight">{user.name}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{user.department}</p></div><div className="text-blue-600 font-black text-sm">{(2500 - (i*300)).toLocaleString()}</div></div>))}</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.contentArea}>
      <h1 className="text-3xl font-black text-navy p-5 tracking-tight leading-none mt-2 text-left">Your Pulse</h1>
      <div className="mx-5 bg-gradient-to-br from-gray-900 to-navy p-10 rounded-[3rem] text-white shadow-2xl mb-8 relative overflow-hidden text-left shadow-blue-900/40">
        <button onClick={() => logout()} className="absolute top-6 right-6 p-4 bg-white/10 rounded-2xl text-white active:scale-90 transition-all"><LogOut size={20} /></button>
        <div className="flex items-center space-x-6 mb-8"><div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center font-black text-4xl border border-white/20 overflow-hidden">{currentUser?.avatar ? <img src={currentUser.avatar} className="w-full h-full" alt="Me" /> : <UserCircle size={40} />}</div><div className="text-left leading-none"><p className="text-2xl font-black tracking-tight">{currentUser?.name}</p><p className="text-[10px] text-blue-200/60 font-bold uppercase tracking-widest mt-2">{currentUser?.id}</p></div></div>
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-3"><div className="bg-blue-500 h-full w-[65%] shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div></div>
        <div className="flex justify-between items-center"><p className="text-[10px] font-black text-blue-200/40 uppercase tracking-[2px]">{currentUser?.role === 'HR_ADMIN' ? 'ADMIN ACCESS' : '85% COMPLETE'}</p><span className="text-[10px] font-black text-white">1,240 XP</span></div>
        <div className="absolute -bottom-10 -right-10 text-white/5 rotate-12"><TrendingUp size={180} /></div>
      </div>
      <div className="px-5 mb-10 text-left"><button onClick={() => setShowGlobalList(true)} className="w-full py-6 bg-white border border-gray-100 rounded-[2rem] shadow-lg shadow-blue-900/5 flex items-center justify-center space-x-3 active:scale-95 transition-all"><Trophy size={22} className="text-amber-500" /><span className="font-black text-navy uppercase text-xs tracking-widest">Global Standings</span></button></div>
      <div className="space-y-8 pb-10 text-left">
        <section><h2 className="text-lg font-black text-navy mb-5 uppercase tracking-widest text-[10px] px-7">Your Achievements</h2><div className="grid grid-cols-2 gap-5 px-5"><div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center shadow-sm"><div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><Heart className="text-amber-500" size={28} fill="currentColor" /></div><p className="text-[10px] font-black text-navy uppercase tracking-tighter leading-none">Culture Lead</p></div><div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center shadow-sm"><div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><LayoutDashboard className="text-blue-500" size={28} /></div><p className="text-[10px] font-black text-navy uppercase tracking-tighter leading-none">Pulse Expert</p></div></div></section>
        <section><div className="flex justify-between items-center px-7 mb-5 text-left"><h2 className="text-lg font-black text-navy uppercase tracking-widest text-[10px]">Received Kudos</h2><span className="text-[10px] font-bold text-blue-600">View All</span></div><div className="px-5 space-y-4">{shoutouts.map((s, i) => (<div key={i} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-start space-x-4 shadow-sm text-left"><div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0"><Star size={20} fill="currentColor" /></div><div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">From {s.from}</p><p className="text-sm font-medium text-gray-700 leading-snug">"{s.text}"</p></div></div>))}</div></section>
      </div>
    </div>
  );
};
