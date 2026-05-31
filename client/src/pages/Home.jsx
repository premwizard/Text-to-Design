import React, { useState, useEffect } from 'react';
import { useGenerate } from '../hooks/useGenerate';
import { LivePreview } from '../components/LivePreview';
import { CodePanel } from '../components/CodePanel';

// Use Vite proxy in dev (relative path), fall back to env var for production
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const EXAMPLE_PROMPTS = [
  { 
    label: '⚡ SaaS Landing', 
    text: 'Build a modern SaaS landing page with navbar, hero, cards grid showing product benefits, pricing plans, testimonials carousel, and a contact form. Use a futuristic dark theme with blue-purple colors and glassmorphism styling.' 
  },
  { 
    label: '🎨 Portfolio', 
    text: 'Design a bold brutalist agency portfolio with a large split hero, stats section, alternating row features, a list-style FAQ, and a grid columns footer. Use high contrast bold borders and neon red accents.' 
  },
  { 
    label: '📊 Tech Dashboard', 
    text: 'Create a dark tech analytics dashboard with a left sidebar, top header, metrics grid showing numbers and percent changes, active users chart placeholder, and a recent transactions table. Use indigo colors and a clean grid.' 
  }
];

function Home() {
  const [prompt, setPrompt] = useState('');
  
  // App views: 'editor' (3 columns: input, preview, code), 'focus' (2 columns: input, preview), 'preview' (fullscreen preview only)
  const [viewMode, setViewMode] = useState('editor');
  // Viewport modes: 'desktop' (w-full), 'tablet' (w-[768px]), 'mobile' (w-[375px])
  const [viewportMode, setViewportMode] = useState('desktop');
  const [modalContent, setModalContent] = useState(null);

  const { code, setCode, generate, loading, error } = useGenerate();

  // Listen for modal actions emitted by the sandbox iframe
  useEffect(() => {
    const handleSandboxMessage = (event) => {
      const { type, action } = event.data;
      if (type === 'SANDBOX_ACTION') {
        console.log('Action received from sandbox:', action);
        if (action.type === 'open-modal') {
          setModalContent(action.target || 'standard');
        } else if (action.type === 'close-modal') {
          setModalContent(null);
        } else if (action.type === 'navigate') {
          window.open(action.target || '#', '_blank');
        } else if (action.type === 'scroll-to-section') {
          console.log('Scroll to section dispatched inside sandbox:', action.target);
        }
      }
    };

    window.addEventListener('message', handleSandboxMessage);
    return () => {
      window.removeEventListener('message', handleSandboxMessage);
    };
  }, []);

  // Debounce and auto-save changes to the sandbox directory
  useEffect(() => {
    if (!code) return;
    
    // Parse files from JSON
    let files = null;
    try {
      let cleanedCode = code.trim();
      cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\n?/i, '');
      cleanedCode = cleanedCode.replace(/\n?```\s*$/, '');
      cleanedCode = cleanedCode.trim();
      
      if (cleanedCode.startsWith('{')) {
        const parsed = JSON.parse(cleanedCode);
        if (parsed && parsed.files) {
          files = parsed.files;
        }
      }
    } catch (e) {
      // Ignore invalid JSON during typing
    }

    if (!files) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`${API_BASE}/save-files`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files }),
        });
        const resData = await response.json();
        if (resData.status !== 'success') {
          console.error('Failed to auto-save files:', resData.message);
        }
      } catch (err) {
        console.error('Failed to connect to backend for auto-save:', err);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [code]);

  const handleGenerate = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    generate(trimmed, code || null);
  };

  return (
    <div className="h-screen w-screen bg-[#030712] text-slate-200 flex flex-col font-sans overflow-hidden relative selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 via-[#030712] to-[#030712]"></div>
      
      {/* Floating Header */}
      <header className="relative z-20 mx-4 mt-4 h-14 rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-5 shadow-2xl">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <svg className="w-4 h-4 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wide text-slate-100 uppercase">Nexus<span className="text-cyan-400 font-light">Builder</span></h1>
          </div>
        </div>

        {/* View Layout Controls */}
        <div className="hidden md:flex items-center gap-2 bg-slate-950/50 p-1 border border-slate-800/50 rounded-lg text-xs font-medium">
          {['editor', 'focus', 'preview'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-md transition-all duration-300 capitalize ${viewMode === mode ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${loading ? 'border-fuchsia-500/30 bg-fuchsia-500/10' : 'border-cyan-500/30 bg-cyan-500/10'} text-xs backdrop-blur-md transition-colors duration-500`}>
            <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${loading ? 'bg-fuchsia-500 animate-pulse' : 'bg-cyan-400'}`} />
            <span className={`font-semibold tracking-wide ${loading ? 'text-fuchsia-400' : 'text-cyan-400'}`}>
              {loading ? 'Synthesizing...' : 'System Ready'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex gap-4 p-4 overflow-hidden relative z-10">
        
        {/* Left/Center: Live Preview & Prompt Console */}
        <div className={`flex flex-col relative transition-all duration-500 ${viewMode === 'editor' ? 'w-full lg:w-[60%]' : 'w-full'}`}>
          
          {/* Preview Container */}
          <div className="flex-1 flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Viewport Toolbar */}
            {viewMode !== 'preview' && (
              <div className="h-12 border-b border-slate-800/60 bg-slate-950/40 flex items-center justify-between px-4 shrink-0">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-rose-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-amber-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-emerald-500 transition-colors"></div>
                </div>
                
                <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                  {['desktop', 'tablet', 'mobile'].map(vp => (
                    <button
                      key={vp}
                      onClick={() => setViewportMode(vp)}
                      className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-md transition-all ${viewportMode === vp ? 'bg-slate-700 text-cyan-300' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {vp}
                    </button>
                  ))}
                </div>
                
                <div className="text-[10px] text-slate-500 font-mono hidden sm:block">live_preview_v2.1</div>
              </div>
            )}

            {/* Canvas */}
            <div className="flex-1 overflow-auto flex justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
              <div className={`transition-all duration-500 ease-out h-full ${viewportMode === 'desktop' || viewMode === 'preview' ? 'w-full' : viewportMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'} shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                {code ? (
                  <LivePreview code={code} loading={loading} />
                ) : (
                  <div className="flex-1 h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                      <svg className="w-10 h-10 text-cyan-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-light text-slate-200 mb-2">Awaiting Instructions</h2>
                    <p className="text-sm text-slate-500 max-w-sm">Initialize the generative engine by providing a prompt in the command console below.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Command Console (Bottom) */}
          {viewMode !== 'preview' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-3xl flex flex-col gap-2 z-30">
              
              {/* Examples Chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide px-2">
                {EXAMPLE_PROMPTS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(chip.text)}
                    className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-slate-300 px-4 py-2 rounded-full hover:bg-cyan-900/40 hover:text-cyan-300 hover:border-cyan-500/50 transition-all shadow-lg"
                    disabled={loading}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 p-2 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-end gap-2 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Design a cyberpunk dashboard with neon graphs..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder-slate-500 px-4 py-3 max-h-32 min-h-[52px] resize-none"
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mx-auto mt-2 bg-rose-950/80 backdrop-blur-md border border-rose-500/50 text-rose-300 text-xs px-4 py-2 rounded-xl text-center shadow-lg">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Code Editor */}
        {viewMode === 'editor' && (
          <div className="w-full lg:w-[40%] flex flex-col bg-[#0d1117] border border-slate-800/60 rounded-3xl overflow-hidden shadow-2xl relative z-10 transition-all duration-500">
            <div className="h-12 border-b border-slate-800 bg-slate-900/50 flex items-center px-5 shrink-0 justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <span className="text-xs font-bold text-slate-300 tracking-wider">SOURCE_CODE</span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <CodePanel code={code} onChange={(newVal) => setCode(newVal)} />
            </div>
          </div>
        )}
      </main>

      {/* Exit Fullscreen Floating Button */}
      {viewMode === 'preview' && (
        <button
          onClick={() => setViewMode('editor')}
          className="fixed top-20 right-8 z-50 bg-slate-900/80 backdrop-blur-xl border border-slate-700 text-slate-200 px-6 py-3 rounded-full shadow-2xl font-semibold text-xs hover:bg-slate-800 hover:text-cyan-400 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          Exit Fullscreen
        </button>
      )}

      {/* Action modal popups */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl p-8 border border-cyan-500/20 bg-slate-900 shadow-[0_0_50px_rgba(6,182,212,0.1)] relative transform transition-all">
            <button 
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-100 capitalize tracking-wide">
                {modalContent.replace('-', ' ')}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-[250px] mx-auto">
                Triggered action for the "{modalContent}" modal inside the sandbox iframe.
              </p>
              <button
                onClick={() => setModalContent(null)}
                className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold tracking-wide rounded-xl transition-all border border-slate-700 hover:border-cyan-500/50"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
