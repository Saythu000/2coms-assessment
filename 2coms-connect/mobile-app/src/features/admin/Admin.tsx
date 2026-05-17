import React, { useState } from 'react';
import { ShieldCheck, Trash2, CheckCircle2, Send } from 'lucide-react';
import { mobileStyles as styles, BadgeComponent } from '../../components/shared/MobileShared';

export const Admin = () => {
  const [tab, setTab] = useState<'moderate' | 'post'>('moderate');
  const [queue, setQueue] = useState([{ id: 'q1', title: 'Flagged: Off-topic Forum post', author: 'Rahul Varma' }]);
  const [showToast, setShowToast] = useState(false);

  const handlePublish = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.contentArea}>
      <div className="p-5 flex justify-between items-center mb-4 text-left">
        <h1 className="text-3xl font-black text-navy tracking-tight leading-none">Admin Console</h1>
        <ShieldCheck size={28} className="text-blue-600" />
      </div>

      <div className="mx-5 flex bg-white border border-gray-200 rounded-2xl p-1 mb-8 shadow-sm">
        <button onClick={() => setTab('moderate')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${tab === 'moderate' ? 'bg-navy text-white shadow-lg' : 'text-gray-400'}`}>Moderate</button>
        <button onClick={() => setTab('post')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${tab === 'post' ? 'bg-navy text-white shadow-lg' : 'text-gray-400'}`}>Publish</button>
      </div>

      {showToast && (
        <div className="mx-5 p-4 bg-blue-600 text-white rounded-2xl mb-6 flex items-center space-x-3 shadow-lg animate-in slide-in-from-top-2">
          <CheckCircle2 size={18} />
          <p className="text-[10px] font-black uppercase tracking-widest">Broadcast Live! 🌐</p>
        </div>
      )}

      {tab === 'moderate' ? (
        <div className="space-y-1">
          {queue.map(item => (
            <div key={item.id} className={styles.card}>
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1 text-left">
                  <BadgeComponent className="bg-amber-50 text-amber-600">Pending Review</BadgeComponent>
                  <p className="font-bold text-navy text-sm leading-tight">{item.title}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">By {item.author}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button onClick={() => setQueue([])} className="flex-1 bg-red-50 py-3 rounded-2xl flex items-center justify-center text-red-600 active:bg-red-100"><Trash2 size={18}/></button>
                <button onClick={() => setQueue([])} className="flex-1 bg-green-50 py-3 rounded-2xl flex items-center justify-center text-green-600 active:bg-green-100"><CheckCircle2 size={18}/></button>
              </div>
            </div>
          ))}
          {queue.length === 0 && <div className="text-center py-20 text-gray-300 font-bold uppercase text-xs">All clear! 🎉</div>}
        </div>
      ) : (
        <div className="mx-5 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 text-left">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
              <input placeholder="Announcement Heading" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Body</label>
              <textarea rows={3} placeholder="What is the pulse update?" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none" />
            </div>
          </div>
          <button className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all" onClick={handlePublish}>Publish to Ecosystem</button>
        </div>
      )}
    </div>
  );
};
