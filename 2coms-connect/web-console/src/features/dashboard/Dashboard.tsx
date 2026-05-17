import React, { useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { Trophy, TrendingUp, Users, Calendar as CalendarIcon, Clock, X, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_NEW_JOINEES, MOCK_ROADMAP } from '../../api/mockData';

export const Dashboard = ({ content, onViewChange }: { content: any[], onViewChange?: (v: string) => void }) => {
  const { currentUser } = useAuth();
  const [reactions, setReactions] = useState<{ [key: string]: number }>({ 'p1-🚀': 24, 'p1-🔥': 12 });
  const [userVoted, setUserVoted] = useState<{ [key: string]: boolean }>({});
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);

  const handleReaction = (postId: string, emoji: string) => {
    const key = `${postId}-${emoji}`;
    const hasReacted = userVoted[key];
    setReactions(prev => ({ ...prev, [key]: hasReacted ? (prev[key] || 1) - 1 : (prev[key] || 0) + 1 }));
    setUserVoted(prev => ({ ...prev, [key]: !hasReacted }));
  };

  const handleDownload = (filename: string) => {
    const content = `2COMS Connect - Official Resource\n\nDocument: ${filename}\nStatus: Certified\nTimestamp: ${new Date().toLocaleString()}\n\nThis is a placeholder for the official organization document. In a production environment, this would trigger a secure fetch from the S3/Azure storage bucket.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename.replace(/\s+/g, '_')}_2COMS.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const mainVision = content.find(c => c.type === 'VISION') || { title: 'Vision 2026', content: 'Our strategic roadmap is currently being updated.' };
  
  // Multi-Tenancy Filter: Show GLOBAL posts + items matching user's department
  const filteredContent = content.filter(c => 
    c.type !== 'VISION' && (c.department === 'GLOBAL' || c.department === currentUser?.department)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-2 pb-20 animate-in fade-in duration-500">
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <Card className="max-w-2xl w-full p-10 space-y-6 relative animate-in zoom-in duration-200 border-none shadow-2xl rounded-3xl">
            <button onClick={() => setSelectedStory(null)} className="absolute top-6 right-6 text-gray-400 hover:text-navy"><X size={24}/></button>
            <div className="space-y-4 text-left">
              <Badge className="bg-blue-50 text-blue-600 border-none px-3 font-black uppercase text-[10px] tracking-widest">{selectedStory.type.replace('_', ' ')}</Badge>
              <h2 className="text-3xl font-black text-navy leading-tight">{selectedStory.title}</h2>
              <div className="flex items-center space-x-4 text-gray-400 text-xs font-bold uppercase tracking-tighter">
                 <span>Published by Admin</span>
                 <span>•</span>
                 <span>{new Date(selectedStory.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed pt-6 border-t border-gray-50">{selectedStory.content}</p>
            </div>
            <div className="pt-8 flex justify-between items-center">
              <div className="flex space-x-3">
                {['🚀', '👏', '🔥'].map(emoji => {
                  const key = `${selectedStory.id}-${emoji}`;
                  const active = userVoted[key];
                  return (
                    <button key={emoji} onClick={() => handleReaction(selectedStory.id, emoji)} className={`p-3 rounded-xl transition-all flex items-center gap-2 font-bold ${active ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-blue-50 text-gray-600'}`}>
                      {emoji} {reactions[key] || 0}
                    </button>
                  );
                })}
              </div>
              <Button onClick={() => setSelectedStory(null)} className="px-8 py-4 bg-navy text-white font-bold rounded-2xl">Close Story</Button>
            </div>
          </Card>
        </div>
      )}

      {showRoadmap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="max-w-2xl w-full p-8 space-y-6 relative animate-in fade-in zoom-in duration-300 rounded-3xl border-none shadow-2xl">
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight text-left">2COMS Strategic Roadmap</h2>
            <div className="space-y-6 text-left">
              {MOCK_ROADMAP.map(item => (
                <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50/50 rounded-r-xl">
                  <h4 className="font-bold text-navy">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium">{item.description}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setShowRoadmap(false)} className="w-full py-6 bg-navy text-white font-black rounded-2xl">Close Roadmap</Button>
          </Card>
        </div>
      )}

      {/* New Joinee Welcome Carousel */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#0A192F] tracking-tight">New Joinee Welcome</h2>
          <Badge className="bg-blue-50 text-blue-600 border-none uppercase text-[10px] font-black tracking-widest px-3 py-1">Recent Onboardings</Badge>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar">
          {MOCK_NEW_JOINEES.map((joinee, i) => (
            <Card key={i} className="min-w-[280px] p-6 flex items-center space-x-4 border-none shadow-lg hover:shadow-xl transition-all cursor-pointer bg-white group rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 p-1 group-hover:rotate-3 transition-transform">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden"><Users className="text-gray-300 w-8 h-8" /></div>
              </div>
              <div className="text-left">
                <p className="font-bold text-navy">{joinee.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{joinee.role} • {joinee.dept}</p>
                <button className="mt-2 text-[10px] font-black text-blue-600 uppercase hover:underline" onClick={() => alert(`Welcome message sent to ${joinee.name}! 🎉`)}>Say Welcome</button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#0A192F] tracking-tight">Management Vision</h2>
          <Button variant="ghost" size="sm" className="text-blue-600 font-bold" onClick={() => setShowRoadmap(true)}>View Roadmap</Button>
        </div>
        <Card className="p-10 bg-gradient-to-br from-[#0A192F] to-[#112240] text-white border-none shadow-2xl relative overflow-hidden group rounded-[2.5rem]">
          <div className="relative z-10 max-w-2xl text-left">
            <Badge className="mb-5 bg-amber-400/20 text-amber-300 border-none px-3 py-1 font-black uppercase text-[10px] tracking-widest">2026 STRATEGY</Badge>
            <h1 className="text-4xl font-extrabold mb-5 leading-tight">{mainVision.title}</h1>
            <p className="text-blue-100/80 text-xl leading-relaxed mb-8 font-light">{mainVision.content}</p>
            <Button onClick={() => setShowRoadmap(true)} className="bg-[#007BFF] hover:bg-blue-600 px-8 py-6 text-lg shadow-lg shadow-blue-500/20 rounded-2xl font-bold">Explore Initiatives</Button>
          </div>
          <TrendingUp className="absolute right-[-40px] bottom-[-40px] text-white/5 w-80 h-80 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-xl font-bold text-[#0A192F] tracking-tight text-left">Latest Impact ({currentUser?.department} Pulse)</h2>
          {filteredContent.map(post => (
            <div key={post.id} className="card-premium p-8 text-left">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className="mb-3 uppercase text-[10px] tracking-widest font-black bg-blue-50 text-blue-600 border-none px-2 py-1">{post.type.replace('_', ' ')}</Badge>
                  <h3 className="text-2xl font-bold text-[#0A192F] transition-colors">{post.title}</h3>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{post.department}</span>
              </div>
              <p className="text-gray-500 text-base leading-relaxed mb-6 font-medium">{post.content}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100/60">
                <div className="flex space-x-3">
                  {(post.reactions || ['🚀', '👏', '🔥']).map((r: string) => {
                    const key = `${post.id}-${r}`;
                    const active = userVoted[key];
                    return (
                      <button key={r} onClick={() => handleReaction(post.id, r)} className={`text-sm border px-4 py-2 rounded-full transition-all flex items-center gap-2 font-bold active:scale-95 ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50/50 hover:bg-blue-50 border border-gray-100 text-gray-600'}`}>
                        {r} <span className={`text-xs ${active ? 'text-white' : 'opacity-60'}`}>{reactions[key] || (post.id === 'p1' ? (r === '🚀' ? 24 : 12) : 0)}</span>
                      </button>
                    );
                  })}
                </div>
                <Button variant="ghost" size="sm" className="font-bold text-blue-600 hover:bg-blue-50" onClick={() => setSelectedStory(post)}>Read Full Story</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-5 tracking-tight text-left">Upcoming Pulse</h2>
            <Card className="p-6 border-none shadow-xl bg-white group cursor-pointer hover:border-blue-200 transition-all rounded-3xl" onClick={() => onViewChange?.('calendar')}>
              <div className="flex items-start space-x-4 text-left">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><CalendarIcon size={24} /></div>
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Next Event • May 20</p>
                  <h4 className="font-bold text-navy leading-tight group-hover:text-blue-600 transition-colors">Q3 Management Townhall</h4>
                  <p className="text-xs text-gray-500 mt-2 flex items-center font-medium"><Clock size={12} className="mr-1" /> 10:00 AM • Main Hall</p>
                </div>
              </div>
              <Button variant="ghost" onClick={(e) => { e.stopPropagation(); onViewChange?.('calendar'); }} className="w-full mt-4 text-xs font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-widest">Open Full Calendar</Button>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0A192F] mb-5 tracking-tight text-left">Top Contributors</h2>
            <div className="card-premium p-6 rounded-3xl">
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer" onClick={() => onViewChange?.('directory')}>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm border border-blue-100">{i}</div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Contributor {i}</span>
                    </div>
                    <Trophy className={`w-5 h-5 ${i === 1 ? 'text-amber-500' : 'text-gray-200'}`} />
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={() => onViewChange?.('leaderboards')} className="w-full mt-8 py-6 font-bold text-gray-600 hover:text-blue-600 hover:border-blue-200 rounded-2xl">View Full Leaderboard</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
