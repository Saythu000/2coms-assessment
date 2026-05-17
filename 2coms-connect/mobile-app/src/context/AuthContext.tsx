import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthService } from '../core/services/AuthService';
import { User, UserRole } from '../core/types';

interface AuthContextType {
  currentUser: User | null;
  login: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (role: UserRole) => {
    try {
      const user = await AuthService.login(role);
      setCurrentUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
