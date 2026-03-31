import React from 'react';
import { Home, FileText, Settings, Users, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <BookOpen size={20} />, label: "Knowledge Base" },
    { icon: <FileText size={20} />, label: "Documents" },
    { icon: <Users size={20} />, label: "Team" },
    { icon: <Settings size={20} />, label: "Settings" }
  ];

  return (
    <aside className="w-64 bg-secondary text-white h-screen flex flex-col pt-6 font-sans shrink-0">
      <div className="px-6 pb-6 border-b border-indigo-900/50 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white shadow-lg">
            KB
          </div>
          <span className="text-xl font-semibold tracking-tight">KnowBase.</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 mt-4">Menu</p>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              item.active 
                ? 'bg-primary text-white font-medium shadow-md' 
                : 'text-indigo-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-indigo-900/50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 overflow-hidden flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">System Admin</p>
            <p className="text-xs text-indigo-300 truncate">admin@knowbase.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
