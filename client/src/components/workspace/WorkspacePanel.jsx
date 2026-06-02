import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw, 
  Maximize2, 
  Download, 
  Copy,
  Code2,
  Layout,
  Terminal,
  FileJson,
  ExternalLink
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LivePreview } from '../LivePreview';
import { CodePanel } from '../CodePanel';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TABS = [
  { id: 'preview', label: 'Preview', icon: Layout },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'files', label: 'Files', icon: FileJson },
  { id: 'logs', label: 'Logs', icon: Terminal },
];

export function WorkspacePanel({ 
  code, 
  setCode, 
  loading, 
  statusText, 
  generationId, 
  localError,
  onFullscreen,
  onRuntimeError
}) {
  const [activeTab, setActiveTab] = useState('preview');
  const [viewportMode, setViewportMode] = useState('desktop');

  return (
    <div className="flex-1 min-w-[500px] flex flex-col bg-[#09090b] border-l border-zinc-800/80 overflow-hidden relative">
      
      {/* Top Tabs Bar */}
      <div className="h-14 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-md shrink-0 z-10">
        <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/50">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  isActive 
                    ? "bg-zinc-800 text-zinc-100 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                )}
              >
                <Icon size={18} className={cn(isActive ? "text-violet-400" : "")} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Toolbar specific to Preview Tab */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-3">
            {/* Viewport Toggles */}
            <div className="flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800/50">
              <button 
                onClick={() => setViewportMode('desktop')}
                className={cn("p-2 rounded-lg transition-colors", viewportMode === 'desktop' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
              >
                <Monitor size={20} />
              </button>
              <button 
                onClick={() => setViewportMode('tablet')}
                className={cn("p-2 rounded-lg transition-colors", viewportMode === 'tablet' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
              >
                <Tablet size={20} />
              </button>
              <button 
                onClick={() => setViewportMode('mobile')}
                className={cn("p-2 rounded-lg transition-colors", viewportMode === 'mobile' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
              >
                <Smartphone size={20} />
              </button>
            </div>

            <div className="w-px h-4 bg-zinc-800" />

            <div className="flex items-center gap-1.5">
              <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors" title="Refresh">
                <RefreshCw size={20} />
              </button>
              <button onClick={onFullscreen} className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors" title="Fullscreen">
                <Maximize2 size={20} />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors" title="Copy Code">
                <Copy size={20} />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors" title="Download">
                <Download size={20} />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-xl transition-colors" title="Open New Window">
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative bg-dot-grid">
        
        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start">
            <div 
              className={cn(
                "transition-all duration-300 flex flex-col bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden h-full",
                viewportMode === 'desktop' ? "w-full max-w-6xl" : 
                viewportMode === 'tablet' ? "w-[768px]" : "w-[375px]"
              )}
            >
              {/* Browser Header Mockup */}
              <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-3 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-1 bg-zinc-950 rounded-md text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                    <Layout className="w-3 h-3" />
                    localhost:3000
                  </div>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-white relative overflow-hidden">
                {!code && !loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-zinc-500">
                    <div className="text-center">
                      <Layout className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Preview will appear here</p>
                    </div>
                  </div>
                ) : localError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 p-6">
                    <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-zinc-800 border-t-violet-500 rounded-full animate-spin"></div>
                          <AlertCircle className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100 mb-2">We're fixing the generated code...</h3>
                      <p className="text-sm font-medium text-violet-400 mb-6">Attempt 1 of 5</p>
                      
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Identified build issue</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-100">
                          <div className="w-4 h-4 border-2 border-zinc-600 border-t-violet-500 rounded-full animate-spin"></div>
                          <span>Repairing components...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                          <CircleDashed className="w-4 h-4" />
                          <span>Rebuilding preview...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <LivePreview 
                    code={code} 
                    loading={loading} 
                    statusText={statusText} 
                    generationId={generationId} 
                    onRuntimeError={onRuntimeError}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col bg-zinc-950">
            {code ? (
              <CodePanel code={code} onChange={setCode} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
                No code generated yet
              </div>
            )}
          </div>
        )}

        {/* Placeholder Tabs */}
        {(activeTab === 'files' || activeTab === 'logs') && (
          <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm bg-zinc-950">
            <div className="text-center space-y-3">
              {activeTab === 'files' ? <FileJson className="w-8 h-8 mx-auto opacity-50" /> : <Terminal className="w-8 h-8 mx-auto opacity-50" />}
              <p>{activeTab === 'files' ? 'File Explorer coming soon' : 'Build logs coming soon'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
