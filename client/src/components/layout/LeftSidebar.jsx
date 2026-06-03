import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Clock, 
  FolderOpen, 
  LayoutTemplate, 
  Star, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Code2
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { id: 'new', label: 'New Workspace', icon: Plus },
  { id: 'recent', label: 'Recent Generations', icon: Clock },
  { id: 'saved', label: 'Saved Projects', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'components', label: 'Components', icon: Code2 },
];

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on route
  const activeTab = location.pathname === '/templates' ? 'templates' : 'new';

  const handleNavClick = (id) => {
    if (id === 'templates') {
      navigate('/templates');
    } else if (id === 'new') {
      navigate('/app');
    }
    // Other tabs can be implemented later
  };

  return (
    <aside 
      className={cn(
        "flex flex-col border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl transition-all duration-300 ease-in-out z-10 shrink-0 shadow-2xl relative",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />

      {/* Collapse Toggle */}
      <div className="flex justify-end p-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-3.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group relative hover:bg-white/5",
                isActive 
                  ? "bg-violet-500/15 border-transparent text-violet-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                  : "text-zinc-400 hover:text-zinc-200 border border-transparent"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-violet-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
              )}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-transparent opacity-50" />
              )}
              
              <div className={cn(
                "p-1.5 rounded-lg transition-all duration-300",
                isActive ? "bg-violet-500/20 text-violet-400 scale-110" : "bg-zinc-900/50 text-zinc-500 group-hover:text-zinc-300 group-hover:bg-zinc-800 group-hover:scale-105"
              )}>
                <Icon size={24} className="shrink-0" />
              </div>
              
              {!isCollapsed && (
                <span className="truncate tracking-wide">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => navigate('/settings')}
          className={cn(
            "w-full flex items-center gap-4 px-3.5 py-3.5 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-all duration-300 group",
            isCollapsed && "justify-center",
            location.pathname === '/settings' && "bg-violet-500/15 text-violet-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <div className={cn(
            "p-1.5 rounded-lg transition-all duration-300",
            location.pathname === '/settings' 
              ? "bg-violet-500/20 text-violet-400 scale-110" 
              : "bg-zinc-900/50 text-zinc-500 group-hover:text-zinc-300 group-hover:bg-zinc-800 group-hover:rotate-45"
          )}>
            <Settings size={24} className="shrink-0" />
          </div>
          {!isCollapsed && <span className="tracking-wide">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
