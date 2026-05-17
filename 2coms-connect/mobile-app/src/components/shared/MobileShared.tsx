import React from 'react';

// Mobile Optimized CSS (Viewport Locked) - Shared across features
export const mobileStyles = {
  main: "fixed inset-0 bg-[#0A192F] flex justify-center overflow-hidden",
  container: "fixed inset-0 md:relative w-full max-w-[500px] bg-[#F8FAFC] flex flex-col",
  viewSlot: "flex-1 relative overflow-hidden flex flex-col",
  tabBar: "h-20 bg-white border-t border-gray-100 flex justify-around items-center pb-2 z-50 shrink-0",
  tabBtn: "flex flex-col items-center transition-all px-2 outline-none",
  tabText: "text-[8px] font-black uppercase mt-1",
  card: "bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm mx-5 mb-5 active:scale-[0.98] transition-all",
  badge: "bg-blue-50 text-blue-600 text-[9px] font-black uppercase px-2 py-1 rounded-md mb-2 inline-block",
  contentArea: "flex-1 overflow-y-auto pb-4",
};

export const BadgeComponent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-blue-50 text-blue-600 text-[9px] font-black uppercase px-2 py-1 rounded-md ${className}`}>
    {children}
  </span>
);
