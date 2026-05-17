import React, { useState } from 'react';
import { Card, Button } from '../../components/ui';
import { ShieldCheck, User as UserIcon, Lock, Globe, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'EMPLOYEE' | 'HR_ADMIN'>('EMPLOYEE');
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    // Professional validation simulation
    const isAdmin = selectedRole === 'HR_ADMIN';
    const validId = isAdmin ? 'ADMIN-2026' : 'EMP-1045';
    const validPass = isAdmin ? 'admin123' : 'pulse2026';

    if (credentials.id === validId && credentials.password === validPass) {
      login(selectedRole);
    } else {
      setError(`Invalid Credentials. Use ${validId} / ${validPass}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">2COMS <span className="text-blue-500">Connect</span></h1>
          <p className="text-blue-200/60 font-medium tracking-wide uppercase text-[10px]">Secure Organizational Gateway</p>
        </div>

        <Card className="p-10 border-none shadow-2xl rounded-[2.5rem] bg-white animate-in zoom-in fade-in duration-500">
          <div className="space-y-6">
            <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 mb-4">
              <button 
                onClick={() => { setSelectedRole('EMPLOYEE'); setError(null); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${selectedRole === 'EMPLOYEE' ? 'bg-white shadow-md text-blue-600' : 'text-gray-400'}`}
              >
                Employee
              </button>
              <button 
                onClick={() => { setSelectedRole('HR_ADMIN'); setError(null); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${selectedRole === 'HR_ADMIN' ? 'bg-white shadow-md text-blue-600' : 'text-gray-400'}`}
              >
                HR Admin
              </button>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Staff ID</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    placeholder={selectedRole === 'HR_ADMIN' ? 'ADMIN-XXXX' : 'EMP-XXXX'}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={credentials.id}
                    onChange={(e) => setCredentials({...credentials, id: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center space-x-2 animate-in shake duration-300">
                  <KeyRound size={16} />
                  <p className="text-[10px] font-bold tracking-tight">{error}</p>
                </div>
              )}
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4"
            >
              Sign In to 2COMS
            </Button>
          </div>
        </Card>

        <div className="mt-12 flex justify-center items-center space-x-6 text-blue-200/40 font-bold text-[10px] uppercase tracking-widest">
          <span>{selectedRole} PORTAL ACTIVE</span>
          <div className="w-1 h-1 bg-white/10 rounded-full"></div>
          <span>ENCRYPTED ACCESS</span>
        </div>
      </div>
    </div>
  );
};
