import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui';
import { AlertCircle, CheckCircle, Trash2, Send, PlusCircle, CheckCircle2, X, TrendingUp } from 'lucide-react';

interface AdminConsoleProps {
  onPublish: (item: any) => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ onPublish }) => {
  const [activeTab, setActiveTab] = useState<'moderation' | 'creator'>('moderation');
  const [queue, setQueue] = useState([
    { id: 'q1', title: 'Off-topic comment in Forum', author: 'Rahul Varma', time: '10 mins ago', reason: 'Clutter' }
  ]);
  
  const [formData, setNewData] = useState({ title: '', content: '', type: 'ANNOUNCEMENT' });
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleModeration = (id: string, action: 'approve' | 'reject') => {
    setQueue(prev => prev.filter(item => item.id !== id));
    triggerToast(action === 'approve' ? 'Content Approved ✅' : 'Content Removed 🗑️');
  };

  const handlePublish = () => {
    if (!formData.title || !formData.content) return;
    
    const newItem = {
      id: `admin-${Date.now()}`,
      ...formData,
      authorId: '1',
      department: 'GLOBAL',
      timestamp: new Date().toISOString(),
      likes: 0,
      reactions: ['🚀', '👏']
    };

    onPublish(newItem);
    setNewData({ title: '', content: '', type: 'ANNOUNCEMENT' });
    triggerToast(`${formData.type.replace('_', ' ')} Published Live! 🚀`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {showToast && (
        <div className="fixed top-24 right-8 z-50 bg-navy text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-white/10 animate-in slide-in-from-top-4">
          <CheckCircle2 size={18} className="text-blue-400" />
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">Admin Command Center</h1>
          <p className="text-gray-500 font-medium">Protect and drive the 2COMS organizational culture.</p>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
          <button 
            onClick={() => setActiveTab('moderation')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'moderation' ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-gray-500 hover:text-navy'}`}
          >
            Moderation Queue
          </button>
          <button 
            onClick={() => setActiveTab('creator')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'creator' ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-gray-500 hover:text-navy'}`}
          >
            Content Creator
          </button>
        </div>
      </div>

      {activeTab === 'moderation' ? (
        <Card className="overflow-hidden border-none shadow-xl rounded-3xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Flagged Content</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {queue.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors animate-in fade-in">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-navy">{item.title}</p>
                    <p className="text-xs text-gray-400 font-medium">By: {item.author} • {item.time}</p>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[9px] uppercase px-2">{item.reason}</Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-amber-500 text-[10px] font-black uppercase tracking-wider">
                      <AlertCircle size={14} className="mr-1.5" /> Pending Review
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right space-x-3">
                    <button 
                      onClick={() => handleModeration(item.id, 'reject')}
                      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleModeration(item.id, 'approve')}
                      className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                    >
                      <CheckCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {queue.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold">
                    Queue is clear. No items requiring moderation! 🎉
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="p-10 space-y-6 border-none shadow-2xl rounded-3xl bg-white">
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-navy tracking-tight">Create Global Announcement</h3>
                <p className="text-sm text-gray-400 font-medium">This will appear instantly on the Daily Pulse feed.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Dept</label>
                  <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none focus:ring-4 focus:ring-blue-500/10">
                    <option>Global (All)</option>
                    <option>Tech</option>
                    <option>Sales</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Post Type</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none focus:ring-4 focus:ring-blue-500/10"
                    value={formData.type}
                    onChange={(e) => setNewData({...formData, type: e.target.value})}
                  >
                    <option value="ANNOUNCEMENT">Announcement</option>
                    <option value="VISION">Management Vision</option>
                    <option value="PROJECT_WIN">Project Win</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Heading</label>
                <input 
                  type="text" 
                  placeholder="e.g. Q4 Growth Milestones" 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10" 
                  value={formData.title}
                  onChange={(e) => setNewData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={4} 
                  placeholder="What is the key update?" 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10"
                  value={formData.content}
                  onChange={(e) => setNewData({...formData, content: e.target.value})}
                ></textarea>
              </div>

              <div className="flex justify-end pt-6">
                <Button onClick={handlePublish} className="space-x-2 px-10 py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transform transition-all active:scale-95">
                  <Send size={18} />
                  <span>Push to Pulse</span>
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-[#0A192F] to-[#112240] text-white border-none shadow-xl rounded-3xl relative overflow-hidden">
              <PlusCircle className="mb-6 text-blue-400 opacity-50" size={40} />
              <h4 className="text-lg font-black mb-3">Admin Rules</h4>
              <p className="text-xs text-blue-100/70 leading-relaxed font-medium">
                Visions will replace the current hero card. Announcements and Project Wins will be prepended to the Latest Impact feed.
              </p>
              <TrendingUp className="absolute right-[-20px] bottom-[-20px] text-white/5 w-40 h-40" />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
