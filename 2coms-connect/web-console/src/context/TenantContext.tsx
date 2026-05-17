import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Department } from '../core/types';

interface TenantContextType {
  activeTenant: Department;
  setTenant: (dept: Department) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const [activeTenant, setActiveTenant] = useState<Department>('GLOBAL');

  const setTenant = (dept: Department) => setActiveTenant(dept);

  return (
    <TenantContext.Provider value={{ activeTenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within TenantProvider');
  return context;
};
