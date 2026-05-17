import React, { useState } from 'react';
import { BookOpen, Share2, ArrowLeft, PlayCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { mobileStyles as styles, BadgeComponent } from '../../components/shared/MobileShared';

export const Docs = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<any | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleDownload = (filename: string) => {
    // UI Feedback
    setShowToast(filename);
    setTimeout(() => setShowToast(null), 3000);

    const content = `2COMS Connect Mobile\n\nDocument: ${filename}\nAccess: Secure Mobile Link\nTimestamp: ${new Date().toLocaleString()}\n\nVerified placeholder for organization-wide knowledge sharing.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename.replace(/\s+/g, '_')}_mobile.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const folders = [{ name: 'Employee Handbooks', items: ['Global Policy 2026', 'Code of Conduct', 'Benefits Guide'], icon: BookOpen, color: 'text-blue-600' }, { name: 'Office Assets', items: ['Brand Logo Pack', 'Slide Templates'], icon: Share2, color: 'text-purple-600' }];
  const gallery = [{ id: 11, type: 'image' }, { id: 12, type: 'video' }, { id: 13, type: 'image' }, { id: 14, type: 'image' }];
  
  if (selectedFolder) {
    return (
      <div className="absolute inset-0 h-full bg-white animate-in slide-in-from-right duration-300 z-[70] flex flex-col">
        <div className="px-6 py-10 bg-[#F8FAFC] flex items-center space-x-4 border-b border-gray-100 shadow-md"><button onClick={() => setSelectedFolder(null)} className="p-2 -ml-2 text-navy"><ArrowLeft size={24}/></button><h2 className="font-black text-lg text-navy uppercase tracking-tight leading-none">{selectedFolder}</h2></div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto text-left shadow-inner">
          {showToast && (
            <div className="p-4 bg-green-50 text-green-700 rounded-2xl mb-4 flex items-center space-x-3 border border-green-100 animate-in slide-in-from-top-2">
              <CheckCircle2 size={18} />
              <p className="text-[10px] font-bold uppercase">Downloading: {showToast}</p>
            </div>
          )}
          {folders.find(f => f.name === selectedFolder)?.items.map(item => (
            <div key={item} className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-[2rem] border border-gray-100 shadow-sm active:scale-95 transition-all"><div className="flex items-center space-x-4"><BookOpen size={22} className="text-gray-400" /><span className="text-sm font-bold text-navy">{item}</span></div><button className="text-blue-600 font-black text-[10px] uppercase tracking-widest" onClick={() => handleDownload(item)}>Get</button></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.contentArea}>
      {previewItem && (<div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300"><div className="max-w-full relative"><img src={previewItem.url} className="w-full rounded-[3rem] shadow-2xl" alt="Preview" />{previewItem.type === 'video' && <PlayCircle size={80} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80" />}</div><button onClick={() => setPreviewItem(null)} className="mt-12 bg-white/10 px-10 py-4 rounded-3xl text-white font-black text-xs uppercase tracking-widest">Close</button></div>)}
      <h1 className="text-3xl font-black text-navy p-5 tracking-tight leading-none mt-2 text-left">Resources</h1>
      <div className="px-5 mb-10 text-left"><div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl flex items-center justify-between relative overflow-hidden active:scale-[0.98] transition-all shadow-blue-600/30" onClick={() => setSelectedFolder('Employee Handbooks')}><div className="relative z-10 text-left"><BadgeComponent className="bg-white/20 text-white mb-3 px-3">Primary Pinned</BadgeComponent><h3 className="text-xl font-bold mb-1 tracking-tight leading-none">Global Conduct 2026</h3><p className="text-blue-100/70 text-[11px] font-medium mt-2">Official guidelines</p></div><div className="p-4 bg-white/10 rounded-2xl relative z-10"><ArrowLeft className="rotate-180" size={24} /></div><BookOpen className="absolute right-[-20px] bottom-[-20px] text-white/5 w-40 h-40 -rotate-12" /></div></div>
      <div className="px-5 space-y-5 mb-12 text-left"><h2 className="text-lg font-black text-navy uppercase tracking-widest text-[10px] px-2">Central Vault</h2>{folders.map(folder => (
          <button key={folder.name} onClick={() => setSelectedFolder(folder.name)} className="w-full flex items-center justify-between p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-[0.98] transition-all text-left"><div className="flex items-center space-x-5"><div className={`p-4 rounded-2xl bg-gray-50 ${folder.color}`}><folder.icon size={24} /></div><div className="text-left"><p className="font-bold text-navy text-sm leading-none">{folder.name}</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{folder.items.length} Documents</p></div></div><ChevronRight size={20} className="text-gray-300" /></button>
        ))}</div>
      <div className="flex justify-between items-center mb-8 px-7 text-left"><h2 className="text-lg font-black text-navy uppercase tracking-widest text-[10px]">Office Gallery</h2><span className="text-[10px] font-black text-blue-600 uppercase">View All</span></div>
      <div className="grid grid-cols-2 gap-5 px-5 pb-10">{gallery.map(item => (
          <button key={item.id} onClick={() => setPreviewItem({ url: `https://picsum.photos/600/800?random=${item.id}`, type: item.type })} className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-md active:scale-95 transition-all relative group"><img src={`https://picsum.photos/300/400?random=${item.id}`} className="w-full h-full object-cover" alt="Gallery item" /><div className="absolute inset-0 bg-navy/20 flex items-center justify-center transition-all group-active:bg-navy/40">{item.type === 'video' && <PlayCircle size={40} className="text-white/90 shadow-2xl" />}</div></button>
        ))}</div>
    </div>
  );
};
