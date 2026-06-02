import React, { useState } from 'react';
import { 
  Plus, 
  Clock, 
  FolderOpen, 
  LayoutTemplate, 
  Star, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { id: 'new', label: 'New Project', icon: Plus },
  { id: 'recent', label: 'Recent Generations', icon: Clock },
  { id: 'saved', label: 'Saved Projects', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'favorites', label: 'Favorites', icon: Star },
];

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('new');

  return (
    <aside 
      className={cn(
        "flex flex-col border-r border-zinc-800/80 bg-zinc-950/50 backdrop-blur-xl transition-all duration-300 z-10 shrink-0",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end p-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative hover:bg-zinc-800",
                isActive 
                  ? "bg-violet-500/15 border border-violet-500/30 text-violet-400" 
                  : "text-zinc-400 hover:text-zinc-200 border border-transparent"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-violet-500 rounded-r-full animate-fade-in" />
              )}
              <Icon size={22} className={cn("shrink-0", isActive ? "text-violet-400" : "group-hover:text-zinc-300")} />
              
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-zinc-800/50">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all duration-200",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings size={22} className="shrink-0 group-hover:text-zinc-300" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
