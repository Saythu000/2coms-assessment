import React, { useState } from 'react';
import { ShieldCheck, User as UserIcon, Lock, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'EMPLOYEE' | 'HR_ADMIN'>('EMPLOYEE');
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const isAdmin = selectedRole === 'HR_ADMIN';
    const validId = isAdmin ? 'ADMIN-2026' : 'EMP-1045';
    const validPass = isAdmin ? 'admin123' : 'pulse2026';

    if (credentials.id === validId && credentials.password === validPass) {
      login(selectedRole);
    } else {
      setError(`Invalid. Use ${validId} / ${validPass}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-navy p-8 justify-center animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white tracking-tighter">2COMS <span className="text-blue-500 text-xl font-bold">MOBILE</span></h1>
        <p className="text-blue-200/40 text-[9px] uppercase font-black tracking-widest mt-1">Culture on the go</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl space-y-6">
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button 
            onClick={() => { setSelectedRole('EMPLOYEE'); setError(null); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${selectedRole === 'EMPLOYEE' ? 'bg-white shadow-md text-blue-600' : 'text-gray-400'}`}
          >
            Employee
          </button>
          <button 
            onClick={() => { setSelectedRole('HR_ADMIN'); setError(null); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${selectedRole === 'HR_ADMIN' ? 'bg-white shadow-md text-blue-600' : 'text-gray-400'}`}
          >
            Admin
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Staff ID</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input 
                type="text" 
                placeholder="Staff ID"
                className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none"
                value={credentials.id}
                onChange={(e) => setCredentials({...credentials, id: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-navy outline-none"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center space-x-2 animate-in shake duration-300">
              <KeyRound size={14} />
              <p className="text-[9px] font-bold">{error}</p>
            </div>
          )}
        </div>

        <button 
          onClick={handleLogin}
          className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all mt-4"
        >
          Sign In
        </button>
      </div>

      <p className="text-center text-blue-200/20 font-bold text-[8px] mt-10 uppercase tracking-[4px]">Secured Access</p>
    </div>
  );
};
