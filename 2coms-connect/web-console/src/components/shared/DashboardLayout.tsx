import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  ShieldCheck,
  Search,
  Bell,
  Calendar as CalendarIcon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-200 ${
      active ? 'bg-blue-50 text-[#007BFF] border-r-4 border-[#007BFF]' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export const DashboardLayout: React.FC<LayoutProps & { activeView?: string, onViewChange?: (v: string) => void }> = ({ children, activeView, onViewChange }) => {
  const { currentUser, logout } = useAuth();
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* ... sidebar part ... */}
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-[#0A192F]">2COMS <span className="text-[#007BFF]">Connect</span></h1>
        </div>
        
        <nav className="flex-1 mt-4">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Daily Pulse" 
            active={activeView === 'dashboard'} 
            onClick={() => onViewChange?.('dashboard')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Colleague Directory" 
            active={activeView === 'directory'} 
            onClick={() => onViewChange?.('directory')} 
          />
          <SidebarItem 
            icon={BookOpen} 
            label="Knowledge Hub" 
            active={activeView === 'knowledge'} 
            onClick={() => onViewChange?.('knowledge')} 
          />
          <SidebarItem 
            icon={CalendarIcon} 
            label="Culture Calendar" 
            active={activeView === 'calendar'} 
            onClick={() => onViewChange?.('calendar')} 
          />
          <SidebarItem 
            icon={Trophy} 
            label="Leaderboards" 
            active={activeView === 'leaderboards'} 
            onClick={() => onViewChange?.('leaderboards')} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="The Forum" 
            active={activeView === 'forum'} 
            onClick={() => onViewChange?.('forum')} 
          />
          {currentUser?.role === 'HR_ADMIN' && (
            <SidebarItem 
              icon={ShieldCheck} 
              label="Admin Console" 
              active={activeView === 'admin'} 
              onClick={() => onViewChange?.('admin')} 
            />
          )}
        </nav>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img src={currentUser?.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-gray-200" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-[#0A192F]">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.department}</p>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Search removed for clutter-free design */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {activeView?.replace('dashboard', 'Daily Pulse').replace('directory', 'Colleague Directory').replace('knowledge', 'Knowledge Hub').replace('calendar', 'Culture Calendar').replace('forum', 'Community Forum').replace('admin', 'Admin Console').replace('leaderboards', 'Leaderboards')}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 hover:bg-gray-50 rounded-full relative"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 shadow-2xl rounded-xl p-0 z-40 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">Culture Activity</p>
                    </div>
                    <div className="p-2 divide-y divide-gray-50">
                      <div 
                        onClick={() => { setShowNotifications(false); onViewChange?.('dashboard'); }}
                        className="p-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg"
                      >
                        <p className="text-sm text-gray-700 leading-tight">🎉 <span className="font-bold text-navy">Project Apollo 11</span> was celebrated company-wide!</p>
                        <p className="text-[10px] text-gray-400 mt-1">12 minutes ago</p>
                      </div>
                      <div 
                        onClick={() => { setShowNotifications(false); onViewChange?.('directory'); }}
                        className="p-3 hover:bg-blue-50/50 transition-colors cursor-pointer rounded-lg"
                      >
                        <p className="text-sm text-gray-700 leading-tight">👋 <span className="font-bold text-navy">4 people</span> welcomed Amit Patel to the Tech Team.</p>
                        <p className="text-[10px] text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                      <button 
                        onClick={() => alert('All notifications are up to date! ✅')}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        View all alerts
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <span className="text-sm font-medium text-gray-600">{currentUser?.role === 'HR_ADMIN' ? 'HR Mode' : 'Employee Mode'}</span>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <section className="flex-1 overflow-y-auto p-8">
          {children}
        </section>
      </main>
    </div>
  );
};
