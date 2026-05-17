import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, UserCircle, MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginScreen } from './features/auth/LoginScreen';
import { mobileStyles as styles } from './components/shared/MobileShared';
import { ContentService } from './core/services/ContentService';

// Feature Imports
import { Dashboard } from './features/dashboard/Dashboard';
import { Directory } from './features/directory/Directory';
import { Forum } from './features/forum/Forum';
import { Docs } from './features/docs/Docs';
import { Me } from './features/me/Me';
import { Admin } from './features/admin/Admin';
import { Calendar } from './features/calendar/Calendar';

const AppContent = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('pulse');
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [userVoted, setUserVoted] = useState<{ [key: string]: boolean }>({});
  const [allContent, setAllContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleReaction = (postId: string, emoji: string) => {
    const key = `${postId}-${emoji}`;
    const hasReacted = userVoted[key];
    setReactions(prev => ({ ...prev, [key]: hasReacted ? (prev[key] || 1) - 1 : (prev[key] || 0) + 1 }));
    setUserVoted(prev => ({ ...prev, [key]: !hasReacted }));
  };

  useEffect(() => {
    if (!currentUser) return;

    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted && loading) setLoading(false);
    }, 3500);

    const unsubscribe = ContentService.subscribeToFeed(currentUser, (items) => {
      if (!isMounted) return;
      setAllContent(items);
      setLoading(false);
      clearTimeout(timer);
    });

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, [currentUser]);

  if (!currentUser) return <LoginScreen />;
  
  if (loading) return (
    <div className="fixed inset-0 bg-[#0A192F] flex flex-col items-center justify-center text-white p-10 z-[9999]">
      <RefreshCw className="animate-spin mb-6 text-blue-500" size={40} />
      <h2 className="font-black text-xl tracking-tighter mb-2 italic uppercase shadow-blue-500/20">2COMS</h2>
      <p className="font-black uppercase tracking-[0.3em] text-[9px] text-blue-400 animate-pulse">Syncing Cloud Ecosystem...</p>
    </div>
  );

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.viewSlot}>
          {activeTab === 'pulse' && <Dashboard content={allContent} reactions={reactions} userVoted={userVoted} onReaction={handleReaction} onNavigate={setActiveTab} />}
          {activeTab === 'directory' && <Directory />}
          {activeTab === 'forum' && <Forum />}
          {activeTab === 'docs' && <Docs />}
          {activeTab === 'me' && <Me />}
          {activeTab === 'calendar' && <Calendar onBack={() => setActiveTab('pulse')} />}
          {currentUser?.role === 'HR_ADMIN' && activeTab === 'admin' && <Admin />}
        </div>
        
        <div className={styles.tabBar}>
          <button onClick={() => setActiveTab('pulse')} className={`${styles.tabBtn} ${activeTab === 'pulse' || activeTab === 'calendar' ? 'text-blue-600' : 'text-gray-300'}`}>
            <LayoutDashboard size={24} /><span className={styles.tabText}>Pulse</span>
          </button>
          <button onClick={() => setActiveTab('directory')} className={`${styles.tabBtn} ${activeTab === 'directory' ? 'text-blue-600' : 'text-gray-300'}`}>
            <Users size={24} /><span className={styles.tabText}>Silos</span>
          </button>
          <button onClick={() => setActiveTab('forum')} className={`${styles.tabBtn} ${activeTab === 'forum' ? 'text-blue-600' : 'text-gray-300'}`}>
            <MessageSquare size={24} /><span className={styles.tabText}>Forum</span>
          </button>
          {currentUser?.role === 'HR_ADMIN' ? (
            <button onClick={() => setActiveTab('admin')} className={`${styles.tabBtn} ${activeTab === 'admin' ? 'text-blue-600' : 'text-gray-300'}`}>
              <ShieldCheck size={24} /><span className={styles.tabText}>Admin</span>
            </button>
          ) : (
            <button onClick={() => setActiveTab('docs')} className={`${styles.tabBtn} ${activeTab === 'docs' ? 'text-blue-600' : 'text-gray-300'}`}>
              <BookOpen size={24} /><span className={styles.tabText}>Docs</span>
            </button>
          )}
          <button onClick={() => setActiveTab('me')} className={`${styles.tabBtn} ${activeTab === 'me' ? 'text-blue-600' : 'text-gray-300'}`}>
            <UserCircle size={24} /><span className={styles.tabText}>Me</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => (<AuthProvider><AppContent /></AuthProvider>);

export default App;
