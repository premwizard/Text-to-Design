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
  CircleDashed,
  History
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
  onRuntimeError,
  variationId,
  sessionId
}) {
  const [viewportMode, setViewportMode] = useState('desktop');
  
  // Extract files from code state
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [activeTab, setActiveTab] = useState('code'); // 'code', 'history'
  const [historyList, setHistoryList] = useState([]);

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

  const fetchHistory = async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(`/edit-history?user_id=default_user&session_id=${sessionId}`);
      const data = await res.json();
      if (data.history) {
        setHistoryList(data.history);
      }
    } catch (e) {
      console.error("Failed to load edit history:", e);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab, sessionId, loading]);

  const handleRollback = async (snapshotId) => {
    try {
      const res = await fetch(`/edit-history/rollback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'default_user',
          session_id: sessionId,
          snapshot_id: snapshotId
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCode(JSON.stringify({ files: data.files }, null, 2));
        alert(`Successfully rolled back to Snapshot #${snapshotId}`);
        fetchHistory();
      } else {
        alert(`Rollback failed: ${data.message}`);
      }
    } catch (e) {
      console.error(e);
      alert('Rollback failed');
    }
  };

  const handleSelectFile = (path) => {
    setSelectedFile(path);
    localStorage.setItem('project_explorer_selected_file', path);
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-[#09090b] border-l border-zinc-800/80 overflow-hidden relative text-left">
      
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
              className={cn("p-1.5 rounded-md transition-colors cursor-pointer", viewportMode === 'desktop' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Monitor size={16} />
            </button>
            <button 
              onClick={() => setViewportMode('tablet')}
              className={cn("p-1.5 rounded-md transition-colors cursor-pointer", viewportMode === 'tablet' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Tablet size={16} />
            </button>
            <button 
              onClick={() => setViewportMode('mobile')}
              className={cn("p-1.5 rounded-md transition-colors cursor-pointer", viewportMode === 'mobile' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300")}
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
          
          {/* Panel 1: Project Explorer (15%) */}
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

          {/* Panel 2: File Viewer / Code / History (30%) */}
          <Panel defaultSize={30} minSize={20}>
            <div className="h-full border-r border-white/5 bg-[#0a0a0c] backdrop-blur-xl shadow-2xl relative flex flex-col">
              {/* Fake Tab Bar */}
              <div className="flex items-center h-10 border-b border-white/5 px-2 bg-zinc-950/50 shrink-0">
                <button
                  onClick={() => setActiveTab('code')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-semibold rounded-t-md transition-all cursor-pointer",
                    activeTab === 'code' ? "bg-white/5 text-zinc-100 border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  <span className="text-violet-400 mr-1.5">{'< >'}</span> Code
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-semibold rounded-t-md transition-all cursor-pointer flex items-center gap-1",
                    activeTab === 'history' ? "bg-white/5 text-zinc-100 border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  <History size={12} className="text-emerald-400" /> Edit History
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'code' ? (
                  <FileViewer 
                    filename={selectedFile} 
                    content={files ? files[selectedFile] : null} 
                  />
                ) : (
                  /* Edit History Snapshots List */
                  <div className="p-4 space-y-4 text-left">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Edit Snapshots</h3>
                    {historyList.length === 0 ? (
                      <p className="text-xs text-zinc-650 italic text-center py-12">No edit history recorded yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {historyList.map((h) => (
                          <div key={h.id} className="p-3.5 bg-zinc-900/40 border border-zinc-850 rounded-xl flex flex-col gap-2.5">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-bold text-violet-400 bg-violet-500/5 border border-violet-500/10 px-2 py-0.5 rounded">
                                Snapshot #{h.id}
                              </span>
                              <span className="text-[10px] text-zinc-600 font-semibold font-mono">
                                {new Date(h.timestamp * 1000).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-zinc-300">"{h.prompt}"</p>
                            <div className="flex items-center justify-between pt-2 border-t border-zinc-850/80">
                              <span className="text-[10px] text-emerald-400 font-bold">
                                Score: {h.metadata?.critic_score || '8.3'}
                              </span>
                              <button
                                onClick={() => handleRollback(h.id)}
                                className="text-[10px] bg-violet-600/20 border border-violet-500/30 text-violet-400 px-2.5 py-1 rounded-lg hover:bg-violet-600 hover:text-white transition-colors cursor-pointer font-bold"
                              >
                                Rollback
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-transparent hover:bg-violet-500/50 transition-colors cursor-col-resize flex items-center justify-center">
            <div className="w-0.5 h-8 bg-zinc-700 rounded-full" />
          </PanelResizeHandle>

          {/* Panel 3: Live Preview (55%) */}
          <Panel defaultSize={55} minSize={40}>
            <div className="w-full h-full flex flex-col bg-[#050505] relative">
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
                  <div className="w-10"></div>
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
                        files={files} 
                        loading={loading} 
                        statusText={statusText} 
                        generationId={generationId} 
                        onRuntimeError={onRuntimeError}
                        variationId={variationId}
                        sessionId={sessionId}
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
export default WorkspacePanel;
