import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui';
import { FileText, Image as ImageIcon, Video, Download, ExternalLink, Search, FolderOpen, PlayCircle } from 'lucide-react';

export const KnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewItem, setPreviewItem] = useState<string | null>(null);

  const sections = [
    { 
      title: 'Employee Handbooks', 
      items: [
        { name: 'Global Policy 2026', type: 'PDF', size: '2.4MB' },
        { name: 'Code of Conduct', type: 'PDF', size: '1.1MB' },
        { name: 'Benefits & Insurance', type: 'DOCX', size: '4.5MB' }
      ], 
      icon: FileText, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Brand Assets', 
      items: [
        { name: '2COMS Logo Kit', type: 'ZIP', size: '15MB' },
        { name: 'Keynote Templates', type: 'PPTX', size: '8.2MB' },
        { name: 'Brand Voice Guide', type: 'PDF', size: '3.0MB' }
      ], 
      icon: FolderOpen, 
      color: 'text-purple-600' 
    }
  ];

  const gallery = [
    { title: 'Annual Gala 2025', category: 'Celebration', type: 'image' },
    { title: 'Tech Innovation Summit', category: 'Event', type: 'video' },
    { title: 'Team Building - Goa', category: 'Engagement', type: 'image' },
    { title: 'New Office Launch', category: 'Milestone', type: 'image' }
  ];

  const handleDownload = (filename: string) => {
    const content = `2COMS Connect - Official Resource\n\nDocument: ${filename}\nStatus: Certified\nTimestamp: ${new Date().toLocaleString()}\n\nThis is a placeholder for the official organization document. In a production environment, this would trigger a secure fetch from the S3/Azure storage bucket.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename.replace(/\s+/g, '_')}_2COMS.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Lightbox Preview Simulation */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="max-w-4xl w-full relative">
            <img src={previewItem} className="w-full rounded-2xl shadow-2xl" alt="Preview" />
            <Button 
              onClick={() => setPreviewItem(null)} 
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white border-none"
            >
              Close Preview
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">Knowledge Hub</h1>
          <p className="text-gray-500 font-medium">Policy Vault & Culture Media Gallery.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search documents or events..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {sections.map(section => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center space-x-2 px-1">
              <section.icon size={22} className={section.color} />
              <h2 className="text-xl font-bold text-navy">{section.title}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map(item => (
                <Card key={item.name} className="p-5 flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                      <FileText size={20} className="text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.type} • {item.size}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDownload(item.name)}
                    className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Download size={18} />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="pt-10 border-t border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy">Culture Media Gallery</h2>
            <p className="text-sm text-gray-500 font-medium">Relive our organization-wide celebrations and milestones.</p>
          </div>
          <Button variant="outline" className="font-bold">View All Albums</Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gallery.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setPreviewItem(`https://picsum.photos/800/600?random=${i+10}`)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img 
                src={`https://picsum.photos/400/300?random=${i+10}`} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-5 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase mb-1">{item.category}</Badge>
                    <p className="text-xs font-bold text-white leading-tight">{item.title}</p>
                  </div>
                  {item.type === 'video' ? <PlayCircle size={24} className="text-white/80" /> : <ImageIcon size={20} className="text-white/80" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
