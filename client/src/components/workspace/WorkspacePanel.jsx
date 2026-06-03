import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw, 
  Maximize2, 
  Download, 
  Layout,
  AlertCircle,
  CheckCircle2,
  CircleDashed
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { LivePreview } from '../LivePreview';
import { ProjectExplorer } from './ProjectExplorer';
import { FileViewer } from './FileViewer';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
  const [viewportMode, setViewportMode] = useState('desktop');
  
  // Extract files from code state
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!code) {
       setFiles({});
       return;
    }
    try {
      let cleanedCode = code.trim();
      cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\n?/i, '');
      cleanedCode = cleanedCode.replace(/\n?```\s*$/, '');
      if (cleanedCode.startsWith('{')) {
        const parsed = JSON.parse(cleanedCode);
        if (parsed && parsed.files) {
          setFiles(parsed.files);
          
          // Auto-select first file if none selected, or 'App.jsx'
          if (!selectedFile || !parsed.files[selectedFile]) {
             if (parsed.files['App.jsx']) setSelectedFile('App.jsx');
             else setSelectedFile(Object.keys(parsed.files)[0] || null);
          }
        }
      }
    } catch (e) {
      // Ignore parse errors while streaming
    }
  }, [code, selectedFile]);

  // Restore selected file from local storage
  useEffect(() => {
    const saved = localStorage.getItem('project_explorer_selected_file');
    if (saved) {
      setSelectedFile(saved);
    }
  }, []);

  const handleSelectFile = (path) => {
    setSelectedFile(path);
    localStorage.setItem('project_explorer_selected_file', path);
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-[#09090b] border-l border-zinc-800/80 overflow-hidden relative">
      
      {/* Top Main Toolbar */}
      <div className="h-12 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-[#0d1117] shrink-0 z-10">
        <div className="flex items-center gap-2">
          <Layout size={16} className="text-sky-400" />
          <span className="text-xs font-bold text-zinc-300">Live Editor</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Viewport Toggles */}
          <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/50">
            <button 
              onClick={() => setViewportMode('desktop')}
              className={cn("p-1.5 rounded-md transition-colors", viewportMode === 'desktop' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Monitor size={16} />
            </button>
            <button 
              onClick={() => setViewportMode('tablet')}
              className={cn("p-1.5 rounded-md transition-colors", viewportMode === 'tablet' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Tablet size={16} />
            </button>
            <button 
              onClick={() => setViewportMode('mobile')}
              className={cn("p-1.5 rounded-md transition-colors", viewportMode === 'mobile' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Smartphone size={16} />
            </button>
          </div>

          <div className="w-px h-4 bg-zinc-800" />

          <div className="flex items-center gap-1">
            <button className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <button onClick={onFullscreen} className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors" title="Fullscreen">
              <Maximize2 size={16} />
            </button>
            <button className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors" title="Download Project">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Layout */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          
          {/* Panel 1: Project Explorer (10%) */}
          <Panel defaultSize={15} minSize={10} collapsible>
            <div className="h-full border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl">
              <ProjectExplorer 
                files={files} 
                selectedFile={selectedFile} 
                onSelectFile={handleSelectFile} 
              />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-1.5 bg-transparent hover:bg-violet-500/50 transition-colors cursor-col-resize flex items-center justify-center">
            <div className="w-0.5 h-8 bg-zinc-700 rounded-full" />
          </PanelResizeHandle>

          {/* Panel 2: File Viewer / Code (30%) */}
          <Panel defaultSize={30} minSize={20}>
            <div className="h-full border-r border-white/5 bg-[#0a0a0c] backdrop-blur-xl shadow-2xl relative">
              {/* Fake Tab Bar */}
              <div className="flex items-center h-10 border-b border-white/5 px-2 bg-zinc-950/50">
                <div className="px-4 py-1.5 bg-white/5 text-zinc-100 text-xs font-semibold rounded-t-md border-b-2 border-violet-500 flex items-center gap-2">
                  <span className="text-violet-400">{'< >'}</span> Code
                </div>
                <div className="px-4 py-1.5 text-zinc-500 hover:text-zinc-300 text-xs font-semibold cursor-pointer flex items-center gap-2">
                  <span className="text-emerald-400/70">§</span> Design Plan
                </div>
              </div>
              <div className="h-[calc(100%-40px)]">
                <FileViewer 
                  filename={selectedFile} 
                  content={files ? files[selectedFile] : null} 
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-transparent hover:bg-violet-500/50 transition-colors cursor-col-resize flex items-center justify-center">
            <div className="w-0.5 h-8 bg-zinc-700 rounded-full" />
          </PanelResizeHandle>

          {/* Panel 3: Live Preview (55%) */}
          <Panel defaultSize={55} minSize={40}>
            <div className="w-full h-full flex flex-col bg-[#050505] relative bg-dot-grid">
              <div className="h-10 bg-[#161b22] border-b border-zinc-800 flex items-center px-4 shrink-0 justify-between">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-0.5 bg-zinc-950 rounded-md text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                    <Layout className="w-3 h-3" />
                    localhost:3000
                  </div>
                  <div className="w-10"></div> {/* Spacer for centering */}
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 flex justify-center items-start">
                <div 
                  className={cn(
                    "transition-all duration-300 flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 shadow-2xl overflow-hidden h-full",
                    viewportMode === 'desktop' ? "w-full" : 
                    viewportMode === 'tablet' ? "w-[768px]" : "w-[375px]"
                  )}
                >
                  <div className="flex-1 bg-white relative overflow-hidden">
                    {!code && !loading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117] text-zinc-500">
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
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
