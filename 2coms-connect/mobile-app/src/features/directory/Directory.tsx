import React, { useState } from 'react';
import { Search, ArrowLeft, MessageCircle } from 'lucide-react';
import { MOCK_USERS } from '../../api/mockData';
import { mobileStyles as styles } from '../../components/shared/MobileShared';

export const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<{ text: string, isMe: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const startChat = (user: any) => {
    setActiveChat(user);
    setMessages([{ text: `Hi! Excited to connect with you.`, isMe: false }]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, isMe: true }]);
    setInputValue('');
  };

  if (activeChat) {
    return (
      <div className="absolute inset-0 h-full bg-white animate-in slide-in-from-right duration-300 z-[70] flex flex-col">
        <div className="px-6 py-10 bg-navy text-white flex items-center space-x-4 shadow-md">
          <button onClick={() => setActiveChat(null)} className="p-2 -ml-2"><ArrowLeft size={24}/></button>
          <img src={activeChat.avatar} className="w-10 h-10 rounded-2xl border-2 border-white/20" alt="Avatar" />
          <div className="flex-1 text-left leading-none"><p className="font-bold text-sm">{activeChat.name}</p><p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Active Now</p></div>
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[#F8FAFC]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-3xl max-w-[85%] text-sm font-medium ${m.isMe ? 'bg-blue-600 text-white rounded-tr-none text-right shadow-lg' : 'bg-white text-gray-600 border border-gray-100 rounded-tl-none shadow-sm text-left'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-100 pb-12">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-[1.5rem] px-5 py-2">
            <input className="flex-1 bg-transparent border-none outline-none text-sm py-4 text-left" placeholder="Type message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} className="text-blue-600 font-black text-xs uppercase">Send</button>
          </div>
        </div>
      </div>
    );
  }

  const filtered = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.skills && u.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    u.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.contentArea}>
      <h1 className="text-3xl font-black text-navy p-5 tracking-tight leading-none text-left">Silo Breakers</h1>
      <div className="px-5 mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
          <input placeholder="Search by name or skill..." className="w-full p-5 pl-14 bg-white border border-gray-100 rounded-[2rem] text-sm outline-none shadow-sm transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="space-y-1 text-left">
        {filtered.map(user => (
          <div key={user.id} className={styles.card}>
            <div className="flex items-center space-x-4 mb-4">
              <img src={user.avatar} className="w-16 h-16 rounded-3xl shadow-md" alt="Avatar" />
              <div className="flex-1 text-left"><p className="font-bold text-navy text-base leading-none">{user.name}</p><p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1">{user.department} TEAM</p></div>
              <button onClick={() => startChat(user)} className="p-4 bg-blue-50 text-blue-600 rounded-2xl active:bg-blue-100"><MessageCircle size={22} fill="currentColor" /></button>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">{user.skills.map(skill => (<span key={skill} className="text-[10px] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg uppercase tracking-tighter">{skill}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
