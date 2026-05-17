import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui';
import { MessageSquare, ThumbsUp, Reply, Plus, TrendingUp, Hash, ArrowLeft, Send, X, CheckCircle2 } from 'lucide-react';
import { MOCK_THREADS } from '../../api/mockData';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  replies: number;
  likes: number;
  hasVoted?: boolean;
  category: string;
  timestamp: string;
  comments: { user: string; text: string; time: string }[];
}

export const ForumScreen = () => {
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);
  
  // New Thread State
  const [newThreadData, setNewThreadData] = useState({ title: '', content: '', category: 'Tech' });

  const showToast = (msg: string) => {
    setShowSuccessToast(msg);
    setTimeout(() => setShowSuccessToast(null), 3000);
  };

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads(prev => prev.map(t => {
      if (t.id === id) {
        if (t.hasVoted) {
          return { ...t, likes: t.likes - 1, hasVoted: false };
        }
        return { ...t, likes: t.likes + 1, hasVoted: true };
      }
      return t;
    }));
  };

  const createThread = () => {
    if (!newThreadData.title || !newThreadData.content) return;
    const thread: Thread = {
      id: `t${Date.now()}`,
      title: newThreadData.title,
      content: newThreadData.content,
      category: newThreadData.category,
      author: 'You (Rahul)',
      likes: 0,
      replies: 0,
      timestamp: 'Just now',
      comments: []
    };
    setThreads([thread, ...threads]);
    setIsModalOpen(false);
    setNewThreadData({ title: '', content: '', category: 'Tech' });
    showToast('Discussion Published Successfully! 🚀');
  };

  const submitComment = () => {
    if (!newComment.trim() || !activeThread) return;
    const updatedThread = {
      ...activeThread,
      replies: activeThread.replies + 1,
      comments: [...activeThread.comments, { user: 'You (Rahul)', text: newComment, time: 'Just now' }]
    };
    
    // Update global list
    setThreads(prev => prev.map(t => t.id === activeThread.id ? updatedThread : t));
    // Update current view
    setActiveThread(updatedThread);
    setNewComment('');
    showToast('Reply Posted! ✅');
  };

  if (activeThread) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 relative">
        {showSuccessToast && (
          <div className="fixed top-24 right-8 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-white/20 animate-in slide-in-from-top-4">
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold">{showSuccessToast}</span>
          </div>
        )}

        <button onClick={() => setActiveThread(null)} className="flex items-center text-blue-600 font-bold hover:underline mb-4">
          <ArrowLeft size={18} className="mr-2" /> Back to Forum
        </button>
        
        <Card className="p-8 space-y-6 rounded-3xl border-none shadow-xl">
          <div className="space-y-4 text-left">
            <Badge className="bg-blue-50 text-blue-600 border-none uppercase text-[10px] font-black tracking-widest px-3 py-1">
              {activeThread.category}
            </Badge>
            <h1 className="text-3xl font-black text-navy leading-tight">{activeThread.title}</h1>
            <p className="text-gray-500 text-sm font-medium">By {activeThread.author} • {activeThread.timestamp}</p>
            <p className="text-gray-600 text-lg leading-relaxed border-b border-gray-50 pb-8 pt-4">{activeThread.content}</p>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-navy flex items-center text-left">
              <MessageSquare size={18} className="mr-2 text-blue-600" />
              Conversation ({activeThread.comments.length})
            </h3>
            <div className="space-y-4">
              {activeThread.comments.map((comment, i) => (
                <div key={i} className="flex space-x-4 p-4 bg-gray-50 rounded-2xl text-left">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-[10px]">
                    {comment.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-black text-navy">{comment.user}</p>
                      <p className="text-[10px] text-gray-400">{comment.time}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <textarea 
                placeholder="Type your reply here..." 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm h-32"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={submitComment} className="space-x-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20">
                  <Send size={18} />
                  <span>Post Reply</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-in fade-in duration-500 pb-20 relative">
      {showSuccessToast && (
        <div className="fixed top-24 right-8 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-white/20 animate-in slide-in-from-top-4">
          <CheckCircle2 size={18} />
          <span className="text-sm font-bold">{showSuccessToast}</span>
        </div>
      )}

      {/* Create Discussion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <Card className="max-w-xl w-full p-8 space-y-6 relative animate-in zoom-in duration-200 rounded-[2rem] border-none shadow-2xl">
            <div className="flex justify-between items-center text-left">
              <h2 className="text-2xl font-black text-navy leading-none">Start a Discussion</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-navy"><X size={24}/></button>
            </div>
            <div className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm"
                  value={newThreadData.category}
                  onChange={(e) => setNewThreadData({...newThreadData, category: e.target.value})}
                >
                  <option>Tech</option>
                  <option>Strategy</option>
                  <option>Culture</option>
                  <option>Off-topic</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Topic Title</label>
                <input 
                  type="text" 
                  placeholder="What do you want to talk about?"
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={newThreadData.title}
                  onChange={(e) => setNewThreadData({...newThreadData, title: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Provide some context..."
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={newThreadData.content}
                  onChange={(e) => setNewThreadData({...newThreadData, content: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={createThread} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20">
              Publish Discussion
            </Button>
          </Card>
        </div>
      )}

      <div className="lg:col-span-3 space-y-8">
        <div className="flex justify-between items-center text-left">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0A192F] tracking-tight leading-none">Community Forum</h1>
            <p className="text-gray-500 font-medium text-sm mt-2">Empowering open exchange across all departments.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="space-x-2 bg-navy px-6 py-3 rounded-xl shadow-lg shadow-navy/20 text-white font-bold">
            <Plus size={18} />
            <span>Start Discussion</span>
          </Button>
        </div>

        <div className="space-y-4">
          {threads.map((thread) => (
            <Card 
              key={thread.id} 
              className="p-6 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group border-gray-100/60 rounded-[2rem] text-left"
              onClick={() => setActiveThread(thread)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <Badge className="bg-gray-100 text-gray-500 border-none text-[9px] font-black uppercase px-2 py-1">{thread.category}</Badge>
                  <h3 className="text-xl font-bold text-[#0A192F] group-hover:text-blue-600 transition-colors leading-tight">
                    {thread.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">Started by <span className="text-navy font-bold">{thread.author}</span> • {thread.timestamp}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-6 pt-4 border-t border-gray-50/50">
                <button 
                  onClick={(e) => handleUpvote(thread.id, e)}
                  className={`flex items-center space-x-2 text-xs font-black transition-colors ${thread.hasVoted ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  <ThumbsUp size={16} fill={thread.hasVoted ? 'currentColor' : 'none'} />
                  <span>{thread.likes} {thread.hasVoted ? 'VOTED' : 'UPVOTES'}</span>
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveThread(thread); }}
                  className="flex items-center space-x-2 text-gray-400 text-xs font-black hover:text-blue-600 transition-colors"
                >
                  <Reply size={16} />
                  <span>REPLY TO THREAD</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sidebar: Categories */}
      <div className="space-y-8 text-left">
        <section>
          <h2 className="text-lg font-black text-navy mb-5 uppercase tracking-widest text-[10px]">Trending Categories</h2>
          <div className="space-y-2">
            {['Strategy', 'Tech', 'Culture', 'Off-topic'].map(cat => (
              <div key={cat} className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm cursor-pointer transition-all border border-transparent hover:border-gray-100 group">
                <div className="flex items-center space-x-3">
                  <Hash size={16} className="text-blue-500" />
                  <span className="text-sm font-bold text-gray-600 group-hover:text-navy transition-colors">{cat}</span>
                </div>
                <TrendingUp size={14} className="text-gray-300" />
              </div>
            ))}
          </div>
        </section>
        
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl rounded-3xl">
          <Hash size={32} className="mb-4 opacity-50" />
          <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Forum Guidelines</h4>
          <p className="text-[11px] text-blue-100 leading-relaxed font-medium">Keep discussions professional and culture-focused. All posts are moderated by HR Admins.</p>
        </Card>
      </div>
    </div>
  );
};
