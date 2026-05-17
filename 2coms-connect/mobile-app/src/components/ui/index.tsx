import React from 'react';

export const Card = ({ children, className, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm active:scale-[0.98] transition-all ${className}`}
  >
    {children}
  </div>
);

export const Badge = ({ children, className }: any) => (
  <span className={`bg-blue-50 text-blue-600 text-[9px] font-black uppercase px-2 py-1 rounded-md mb-2 inline-block ${className}`}>
    {children}
  </span>
);

export const Button = ({ children, className, onClick, variant = 'primary' }: any) => {
  const variants = {
    primary: "bg-blue-600 text-white font-black",
    secondary: "bg-navy text-white font-black",
    ghost: "bg-blue-50 text-blue-600 font-black"
  };
  
  return (
    <button 
      onClick={onClick}
      className={`py-3 px-6 rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-sm ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {children}
    </button>
  );
};
