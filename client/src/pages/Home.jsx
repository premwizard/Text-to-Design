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
          // If we want to scroll inside the sandboxed preview, we can let it handle itself inside the iframe
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
    // Pass existing code if any, to trigger an edit generation
    generate(trimmed, code || null);
  };

  return (
    <div className="h-screen w-screen bg-[#070708] text-zinc-200 flex flex-col overflow-hidden font-sans select-none">
      
      {/* Header Panel */}
      <header className="h-14 border-b border-zinc-900 flex items-center justify-between px-6 bg-zinc-950/60 backdrop-blur-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-xs font-black text-slate-950 shadow-md">
            JSX
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">JSX Compiler Studio</h1>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Babel Standalone Execution Sandbox</span>
          </div>
        </div>

        {/* View Layout Controls */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/40 p-1 border border-zinc-800 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('editor')}
            className={`px-3 py-1 rounded-lg transition duration-200 ${viewMode === 'editor' ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Split Editor
          </button>
          <button
            onClick={() => setViewMode('focus')}
            className={`px-3 py-1 rounded-lg transition duration-200 ${viewMode === 'focus' ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Focus View
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 rounded-lg transition duration-200 ${viewMode === 'preview' ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Live Fullscreen
          </button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-[10px] uppercase font-bold text-zinc-550">
              {loading ? 'Compiling' : 'Ready'}
            </span>
          </div>
        </div>
      </header>

      {/* Workspace Containers */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: PROMPT BUILDER */}
        {viewMode !== 'preview' && (
          <aside className="w-80 border-r border-zinc-900 bg-[#09090b]/80 backdrop-blur-md flex flex-col p-5 shrink-0 overflow-y-auto z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Prompt Instructions</h2>
            
            <div className="flex-1 flex flex-col gap-5">
              <div className="space-y-2">
                <label className="text-xs text-zinc-650">What would you like to build?</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your design requirements or request edits to the current code..."
                  rows={6}
                  className="w-full bg-zinc-950/60 border border-zinc-850/80 rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500/50 resize-none placeholder-zinc-700"
                  disabled={loading}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest">Example Mockup Templates</h3>
                <div className="flex flex-col gap-2">
                  {EXAMPLE_PROMPTS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(chip.text)}
                      className="text-left text-xs bg-zinc-950/40 border border-zinc-900 rounded-xl p-3 hover:border-zinc-800 transition hover:bg-zinc-900/30"
                      disabled={loading}
                    >
                      <span className="font-semibold text-zinc-300 block mb-0.5">{chip.label}</span>
                      <span className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{chip.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-zinc-900 pt-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-350 hover:to-indigo-400 px-4 py-3 text-sm font-bold text-zinc-950 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Streaming JSX...
                  </span>
                ) : code ? 'Update Code Design' : 'Stream Code Design'}
              </button>
              
              {error && (
                <div className="rounded-xl bg-rose-500/10 p-3 border border-rose-500/20 text-xs text-rose-350 leading-normal">
                  {error}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* CENTER PANEL: LIVE PREVIEW IFRAME */}
        <main className="flex-1 flex flex-col bg-[#070708] overflow-hidden relative">
          
          {/* Frame control toolbar */}
          {viewMode !== 'preview' && (
            <div className="h-12 border-b border-zinc-900 flex items-center justify-between px-6 bg-zinc-950/20 shrink-0 z-10 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Compiler Sandbox viewport</span>
              </div>

              {/* Viewport Dimension switches */}
              <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 border border-zinc-800 rounded-lg text-xs">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-2.5 py-1 rounded transition duration-200 ${viewportMode === 'desktop' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`px-2.5 py-1 rounded transition duration-200 ${viewportMode === 'tablet' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Tablet
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-2.5 py-1 rounded transition duration-200 ${viewportMode === 'mobile' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Mobile
                </button>
              </div>

              {/* Fullscreen shortcut */}
              {code && (
                <button
                  onClick={() => setViewMode('preview')}
                  className="text-xs text-sky-400 font-semibold hover:text-sky-300 flex items-center gap-1"
                >
                  Fullscreen Preview &rarr;
                </button>
              )}
            </div>
          )}

          {/* Core viewport frame */}
          <div className="flex-1 p-6 flex justify-center overflow-y-auto bg-dot-grid relative">
            <div className={`transition-all duration-300 h-full ${viewportMode === 'desktop' || viewMode === 'preview' ? 'w-full' : viewportMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'} flex flex-col justify-start`}>
              
              {/* Browser bar mockup */}
              {viewMode !== 'preview' && (
                <div className="w-full bg-zinc-950 border border-zinc-900 border-b-0 rounded-t-2xl px-4 py-3 flex items-center gap-3 shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-850" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-850" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-850" />
                  </div>
                  <div className="flex-1 max-w-sm mx-auto bg-zinc-900/60 border border-zinc-800 rounded-lg text-[10px] text-zinc-500 text-center py-1 truncate">
                    localhost:3000/generated-page
                  </div>
                </div>
              )}

              {/* Live standalone iframe container */}
              <div className={`flex-1 flex flex-col bg-zinc-950 ${viewMode === 'preview' ? 'rounded-none border-none' : 'rounded-b-2xl border border-zinc-900'}`}>
                {code ? (
                  <LivePreview code={code} loading={loading} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-zinc-650 text-center">
                    <div className="h-10 w-10 rounded-full border border-dashed border-zinc-800 flex items-center justify-center text-sm font-semibold mb-4">
                      +
                    </div>
                    <p className="text-sm font-medium text-zinc-550">Empty Sandbox Preview</p>
                    <p className="text-xs text-zinc-600 max-w-xs mt-1.5">Enter a design description on the left panel to compile and execute raw React code dynamically in this sandboxed window.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Exit overlay capsule */}
          {viewMode === 'preview' && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 border border-zinc-800 rounded-full shadow-2xl z-50 flex items-center gap-3">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Fullscreen Sandbox</span>
              <span className="text-zinc-650">|</span>
              <button
                onClick={() => setViewMode('editor')}
                className="text-xs font-semibold hover:text-white transition"
              >
                Exit Preview
              </button>
            </div>
          )}
        </main>

        {/* RIGHT PANEL: CODE PANEL EDITOR */}
        {viewMode === 'editor' && (
          <aside className="w-96 border-l border-zinc-900 bg-[#09090b]/80 backdrop-blur-md flex flex-col p-5 shrink-0 z-10 overflow-hidden">
            <CodePanel code={code} onChange={(newVal) => setCode(newVal)} />
          </aside>
        )}

      </div>

      {/* Action modal popups */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl p-8 border border-zinc-800 bg-[#0c0c0e] text-zinc-150 shadow-2xl relative">
            <button 
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 text-lg"
            >
              ✕
            </button>
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-lg">
                ✓
              </div>
              <h3 className="text-lg font-bold capitalize">
                {modalContent.replace('-', ' ')}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Action trigger Simulation for "{modalContent}" modal overlay.
              </p>
              <button
                onClick={() => setModalContent(null)}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-sky-400 to-indigo-600 text-slate-950 font-bold rounded-xl transition hover:opacity-90 active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
