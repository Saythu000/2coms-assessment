import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui';
import { Search, MessageSquare, Filter, Star } from 'lucide-react';
import { MOCK_USERS } from '../../api/mockData';

export const DirectoryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<{ user: string, text: string, isMe: boolean }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const openChat = (user: any) => {
    setActiveChat(user);
    setChatMessages([
      { user: user.name, text: `Hi Rahul! I saw your request on the project win post. How can I help?`, isMe: false }
    ]);
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    setChatMessages([...chatMessages, { user: 'Me', text: currentMessage, isMe: true }]);
    setCurrentMessage('');
  };

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-full animate-in fade-in duration-500">
      {/* Chat Interface Drawer */}
      {activeChat && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 border-l border-gray-100 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 bg-[#0A192F] text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={activeChat.avatar} className="w-10 h-10 rounded-full border-2 border-white/20" />
              <div>
                <p className="font-bold leading-none">{activeChat.name}</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Online</p>
              </div>
            </div>
            <button onClick={() => setActiveChat(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <Star size={20} className="rotate-45" /> 
            </button>
          </div>
          
          <div className="flex-1 p-6 bg-gray-50 space-y-4 overflow-y-auto">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[80%] border shadow-sm ${
                  msg.isMe 
                    ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                    : 'bg-white text-gray-600 border-gray-100 rounded-tl-none'
                }`}>
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-4 py-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm py-2 font-medium" 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                disabled={!currentMessage.trim()}
                className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:text-blue-700 disabled:text-gray-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 pr-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">Colleague Directory</h1>
            <p className="text-gray-500 font-medium text-sm">Find experts and break functional silos across 2COMS.</p>
          </div>
          <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <Filter size={16} className="text-blue-600" />
            <span className="text-xs font-bold text-gray-700">All Departments</span>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, skills, or department..."
            className="w-full p-3 pl-12 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div key={user.id} className="group">
              <Card className="p-5 bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden text-center flex flex-col items-center">
                <div className="relative mb-3">
                  <img src={user.avatar} className="w-16 h-16 rounded-2xl shadow-md object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                
                <h3 className="text-base font-bold text-[#0A192F] mb-0.5">{user.name}</h3>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-4">{user.department}</p>

                <div className="w-full flex flex-wrap justify-center gap-1.5 mb-6">
                  {user.skills.slice(0, 2).map(skill => (
                    <Badge key={skill} className="bg-gray-50 text-gray-400 border-none px-2 py-0.5 rounded-md text-[9px] font-bold tracking-tight">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="w-full flex gap-2">
                  <button 
                    onClick={() => alert(`Opening email to ${user.name}`)}
                    className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-600 text-[10px] font-bold hover:bg-gray-100 transition-colors"
                  >
                    Email
                  </button>
                  <button 
                    onClick={() => openChat(user)}
                    className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                  >
                    Chat
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">No colleagues found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
