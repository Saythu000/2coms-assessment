import React, { useState } from 'react';
import { ArrowLeft, Send, Plus, ThumbsUp, Reply } from 'lucide-react';
import { mobileStyles as styles, BadgeComponent } from '../../components/shared/MobileShared';
import { MOCK_THREADS } from '../../api/mockData';

export const Forum = () => {
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [activeThread, setActiveThread] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({ title: '', category: 'Tech' });
  const [replyText, setReplyText] = useState('');

  const handleUpvote = (id: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === id) {
        return t.hasVoted ? { ...t, likes: t.likes - 1, hasVoted: false } : { ...t, likes: t.likes + 1, hasVoted: true };
      }
      return t;
    }));
  };

  const createThread = () => {
    if (!newData.title) return;
    const newThread = { id: `mt-${Date.now()}`, title: newData.title, content: 'New discussion topic started.', category: newData.category, author: 'You (Rahul)', likes: 0, replies: 0, hasVoted: false, comments: [] };
    setThreads([newThread, ...threads]);
    setIsModalOpen(false);
    setNewData({ title: '', category: 'Tech' });
  };

  const postReply = () => {
    if (!replyText.trim()) return;
    const updated = { ...activeThread, replies: (activeThread.replies || 0) + 1, comments: [...(activeThread.comments || []), { user: 'You', text: replyText, time: 'Just now' }] };
    setThreads(prev => prev.map(t => t.id === activeThread.id ? updated : t));
    setActiveThread(updated);
    setReplyText('');
  };

  if (activeThread) {
    return (
      <div className="absolute inset-0 h-full bg-[#F8FAFC] animate-in slide-in-from-right duration-300 z-[70] flex flex-col">
        <div className="px-6 py-10 bg-[#0A192F] text-white flex items-center space-x-4 shadow-lg">
          <button onClick={() => setActiveThread(null)} className="p-2 -ml-2 active:scale-90 transition-all"><ArrowLeft size={24}/></button>
          <h2 className="font-black text-lg uppercase tracking-tight">Discussion</h2>
        </div>
        <div className="flex-1 overflow-y-auto"><div className="p-6 bg-white border-b border-gray-100 space-y-4 text-left"><BadgeComponent>{activeThread.category}</BadgeComponent><h3 className="text-2xl font-black text-[#0A192F] leading-tight">{activeThread.title}</h3><p className="text-sm text-gray-500 font-medium">By {activeThread.author}</p><p className="text-gray-600 leading-relaxed text-sm pt-4 border-t border-gray-50">{activeThread.content}</p></div><div className="p-6 space-y-4 text-left"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Replies ({(activeThread.comments || []).length})</p>{(activeThread.comments || []).map((c: any, i: number) => (<div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"><div className="flex justify-between mb-1"><p className="text-xs font-bold text-[#0A192F]">{c.user}</p><p className="text-[10px] text-gray-400">{c.time}</p></div><p className="text-sm text-gray-500 font-medium">{c.text}</p></div>))}</div></div>
        <div className="p-4 bg-white border-t border-gray-100 pb-12"><div className="flex items-center space-x-3 bg-gray-50 rounded-[1.5rem] px-5 py-2 text-left shadow-inner"><input className="flex-1 bg-transparent border-none outline-none text-sm py-4 text-left" placeholder="Share thoughts..." value={replyText} onChange={(e) => setReplyText(e.target.value)} /><button onClick={postReply} className="text-blue-600 font-black text-xs uppercase active:scale-90 transition-all"><Send size={20}/></button></div></div>
      </div>
    );
  }

  return (
    <div className={styles.contentArea}>
      {isModalOpen && (<div className="absolute inset-0 z-[100] bg-[#0A192F]/95 backdrop-blur-md flex flex-col p-8 animate-in slide-in-from-bottom duration-300"><div className="flex justify-between items-center mb-10 text-left leading-none"><h2 className="text-2xl font-black text-white uppercase tracking-tighter">New Thread</h2><button onClick={() => setIsModalOpen(false)} className="text-blue-400 font-bold uppercase text-[10px]">Cancel</button></div><div className="space-y-6 flex-1 text-left"><div className="space-y-2 text-left"><label className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Category</label><select className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white text-sm" value={newData.category} onChange={e => setNewData({...newData, category: e.target.value})}><option value="Tech">Tech</option><option value="Culture">Culture</option><option value="Strategy">Strategy</option></select></div><div className="space-y-2 text-left"><label className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Topic Title</label><textarea rows={3} className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white text-sm outline-none" placeholder="What's on your mind?" value={newData.title} onChange={e => setNewData({...newData, title: e.target.value})} /></div></div><button onClick={createThread} className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl active:scale-95 transition-all">Publish Post</button></div>)}
      <div className="flex justify-between items-center p-5 mb-4 leading-none"><h1 className="text-3xl font-black text-[#0A192F] tracking-tight uppercase italic">The Forum</h1><button onClick={() => setIsModalOpen(true)} className="bg-[#0A192F] p-3 rounded-2xl text-white shadow-lg active:scale-90 transition-all"><Plus size={24} /></button></div>
      <div className="space-y-1">{threads.map(thread => (<div key={thread.id} className={styles.card} onClick={() => setActiveThread(thread)}><div className="text-left"><BadgeComponent className="mb-3">{thread.category}</BadgeComponent><h4 className="font-bold text-[#0A192F] text-lg mb-2 leading-tight">{thread.title}</h4><p className="text-[10px] text-gray-400 font-bold uppercase mb-4">By {thread.author} • Just now</p></div><div className="flex space-x-6 pt-4 border-t border-gray-50"><button onClick={(e) => { e.stopPropagation(); handleUpvote(thread.id); }} className={`flex items-center space-x-2 text-[10px] font-black transition-all ${thread.hasVoted ? 'text-blue-600' : 'text-gray-400'}`}><ThumbsUp size={16} fill={thread.hasVoted ? 'currentColor' : 'none'} /> <span>{thread.likes} VOTES</span></button><button onClick={(e) => { e.stopPropagation(); setActiveThread(thread); }} className="flex items-center space-x-2 text-gray-400 text-[10px] font-black active:text-blue-600"><Reply size={16} /> <span>{thread.replies} REPLIES</span></button></div></div>))}</div>
    </div>
  );
};
