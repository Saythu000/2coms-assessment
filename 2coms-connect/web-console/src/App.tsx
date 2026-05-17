import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/shared/DashboardLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TenantProvider } from './context/TenantContext';
import { ContentService } from './core/services/ContentService';
import { AdminConsole } from './features/admin/AdminConsole';
import { DirectoryScreen } from './features/directory/DirectoryScreen';
import { KnowledgeHub } from './features/knowledge/KnowledgeHub';
import { ForumScreen } from './features/knowledge/ForumScreen';
import { LeaderboardScreen } from './features/recognition/LeaderboardScreen';
import { CultureCalendar } from './features/knowledge/CultureCalendar';
import { Dashboard } from './features/dashboard/Dashboard';
import { LoginScreen } from './features/auth/LoginScreen';

const AppContent = () => {
  const { currentUser } = useAuth();
  const [view, setView] = useState<'dashboard' | 'admin' | 'directory' | 'knowledge' | 'forum' | 'leaderboards' | 'calendar'>('dashboard');
  const [allContent, setAllContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    // Real-time Cloud Subscription
    const unsubscribe = ContentService.subscribeToFeed(currentUser, (items) => {
      setAllContent(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) return <LoginScreen />;
  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0A192F] text-white font-black text-xl animate-pulse uppercase tracking-widest text-center px-10">Syncing Unified Ecosystem...</div>;

  const handlePublish = async (newItem: any) => {
    await ContentService.publishContent(newItem);
    // State is automatically updated via real-time subscription (onSnapshot)
  };

  return (
    <DashboardLayout activeView={view} onViewChange={(v: any) => setView(v)}>
      {view === 'dashboard' && <Dashboard content={allContent} onViewChange={(v) => setView(v)} />}
      {view === 'admin' && <AdminConsole onPublish={handlePublish} />}
      {view === 'directory' && <DirectoryScreen />}
      {view === 'knowledge' && <KnowledgeHub />}
      {view === 'forum' && <ForumScreen />}
      {view === 'leaderboards' && <LeaderboardScreen />}
      {view === 'calendar' && <CultureCalendar />}
    </DashboardLayout>
  );
};

const App = () => (<AuthProvider><TenantProvider><AppContent /></TenantProvider></AuthProvider>);

export default App;
