import React, { useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { Trophy, Medal, Star, TrendingUp, Zap, Users, CheckCircle2, ChevronRight } from 'lucide-react';

export const LeaderboardScreen = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'department'>('individual');
  const [showToast, setShowToast] = useState<string | null>(null);

  const rankings = [
    { name: 'Rahul Varma', dept: 'Tech', score: 2450, rank: 1, avatar: 'https://i.pravatar.cc/150?u=2' },
    { name: 'Ananya Sharma', dept: 'HR', score: 2100, rank: 2, avatar: 'https://i.pravatar.cc/150?u=1' },
    { name: 'Amit Patel', dept: 'Tech', score: 1850, rank: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
    { name: 'Priya Das', dept: 'Sales', score: 1600, rank: 4, avatar: 'https://i.pravatar.cc/150?u=4' },
  ];

  const deptStats = [
    { name: 'Tech', activity: '92%', points: 15400, color: 'bg-blue-600' },
    { name: 'HR', activity: '88%', points: 12100, color: 'bg-purple-600' },
    { name: 'Sales', activity: '75%', points: 9800, color: 'bg-emerald-600' }
  ];

  const triggerApplaud = (name: string) => {
    setShowToast(`Appreciation sent to ${name}! 👏`);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 relative">
      {showToast && (
        <div className="fixed top-24 right-8 z-50 bg-navy text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-white/10 animate-in slide-in-from-top-4">
          <CheckCircle2 size={18} className="text-blue-400" />
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">Culture Leaderboards</h1>
          <p className="text-gray-500 font-medium">Rewarding participation, engagement, and organizational impact.</p>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
          <button 
            onClick={() => setActiveTab('individual')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'individual' ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-gray-500 hover:text-navy'}`}
          >
            Top Employees
          </button>
          <button 
            onClick={() => setActiveTab('department')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'department' ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-gray-500 hover:text-navy'}`}
          >
            Team Rankings
          </button>
        </div>
      </div>

      {activeTab === 'individual' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-none shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
              <Trophy className="text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500" size={64} />
              <div className="relative z-10">
                <h3 className="font-black text-[#0A192F] uppercase tracking-widest text-xs mb-2">MVP of the Month</h3>
                <p className="text-2xl font-black text-navy">{rankings[0].name}</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <Badge className="bg-white/80 text-amber-600 border-none px-3 font-black">2,450 PTS</Badge>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-amber-200/20 rotate-12"><Trophy size={120} /></div>
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
              <TrendingUp className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500" size={64} />
              <div className="relative z-10">
                <h3 className="font-black text-[#0A192F] uppercase tracking-widest text-xs mb-2">Most Improved</h3>
                <p className="text-2xl font-black text-navy">Amit Patel</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <Badge className="bg-white/80 text-blue-600 border-none px-3 font-black">+42% Growth</Badge>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-blue-200/20 rotate-12"><TrendingUp size={120} /></div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-900 to-navy border-none shadow-xl flex flex-col justify-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-black text-blue-400 uppercase tracking-widest text-[10px] mb-4">Your Engagement</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-xl">#8</div>
                  <div>
                    <p className="text-lg font-bold">Rahul Varma</p>
                    <p className="text-xs text-blue-200/60 font-medium">1,240 points earned</p>
                  </div>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-blue-500 h-full w-[65%]"></div>
                </div>
                <p className="text-[10px] font-bold text-blue-200/40">360 PTS TO REACH RANK #7</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden border-none shadow-xl rounded-3xl">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Rank</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Culture Pts</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {rankings.map((user) => (
                      <tr key={user.rank} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-2xl font-black text-sm ${user.rank === 1 ? 'bg-amber-100 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>
                            {user.rank}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <img src={user.avatar} className="w-10 h-10 rounded-xl shadow-sm" />
                            <div>
                              <p className="font-bold text-navy">{user.name}</p>
                              <p className="text-[10px] text-blue-600 font-black uppercase tracking-tighter">{user.dept}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-black text-navy">{user.score.toLocaleString()}</span>
                          <span className="text-[10px] text-green-500 font-bold ml-2">↑ 120</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => triggerApplaud(user.name)}
                            className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all font-bold"
                          >
                            Applaud 👏
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-black text-navy mb-5 uppercase tracking-widest text-[10px]">Earning Points</h2>
                <div className="space-y-4">
                  {[
                    { act: 'Post Recognition', pts: '+50', icon: Star, color: 'text-amber-500' },
                    { act: 'Policy Q&A', pts: '+30', icon: CheckCircle2, color: 'text-green-500' },
                    { act: 'Daily Pulse Check', pts: '+10', icon: Zap, color: 'text-blue-500' }
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <rule.icon size={16} className={rule.color} />
                        <span className="text-xs font-bold text-gray-600">{rule.act}</span>
                      </div>
                      <span className="text-xs font-black text-navy">{rule.pts}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deptStats.map((dept, i) => (
            <Card key={i} className="p-8 border-none shadow-xl group hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${dept.color} text-white shadow-lg`}>
                  <Users size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Activity Rate</p>
                  <p className="text-xl font-black text-navy">{dept.activity}</p>
                </div>
              </div>
              <h3 className="text-2xl font-black text-navy mb-1">{dept.name}</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Consolidated Team Impact</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-xs font-bold text-gray-400">Total Points</span>
                <span className="font-black text-navy">{dept.points.toLocaleString()}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
