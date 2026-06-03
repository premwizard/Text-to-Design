import re

filepath = 'client/src/pages/Home.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# Add imports
imports_old = """import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { DesignPlanPanel } from '../components/workspace/DesignPlanPanel';
import { VariationsGrid } from '../components/workspace/VariationsGrid';"""

imports_new = """import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { DesignPlanPanel } from '../components/workspace/DesignPlanPanel';
import { VariationsGrid } from '../components/workspace/VariationsGrid';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';
import { PromptComposer } from '../components/prompt/PromptComposer';
import { Layout, LayoutTemplate, Briefcase, Monitor, ShoppingCart, Smartphone, Sparkles, FolderOpen, History, ArrowRight } from 'lucide-react';"""

code = code.replace(imports_old, imports_new)

# Find the main return block and replace the content.
# The current return block:
#   return (
#     <div className="h-screen w-screen bg-[#09090b] text-zinc-100 flex flex-col overflow-hidden font-sans select-none">
#     ...

main_return_old = """  return (
    <div className="h-screen w-screen bg-[#09090b] text-zinc-100 flex flex-col overflow-hidden font-sans select-none">
      
      {/* Top Navigation */}
      <TopNav loading={loading} projectName="Untitled Project" />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Prompt Panel */}
        <PromptPanel 
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          loading={loading}
          error={error}
          hasCode={!!code}
        />

        {/* Workspace / Live Preview */}
        {(Object.keys(variations || {}).length > 0 || code || loading) ? (
          <div className={isFullscreen ? 'fixed inset-0 z-50 bg-[#09090b] flex flex-col transition-all duration-300' : 'flex-1 flex flex-col min-w-[500px] shrink-0 transition-all duration-300'}>
            {isFullscreen && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-zinc-900/90 backdrop-blur-md px-6 py-2 rounded-full border border-zinc-800 shadow-2xl">
                <span className="text-xs font-semibold text-violet-400">Fullscreen Preview</span>
                <div className="w-px h-4 bg-zinc-700" />
                <button 
                  onClick={() => setIsFullscreen(false)}
                  className="text-xs font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  Exit Fullscreen
                </button>
              </div>
            )}
            {activeVariationId ? (
              <div className="flex-1 flex flex-col relative">
                <button 
                  onClick={() => setActiveVariationId(null)}
                  className="absolute top-4 right-4 z-50 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-colors border border-zinc-700/50"
                >
                  ← Back to Variations
                </button>
                <WorkspacePanel 
                  code={variations[activeVariationId]?.code || ''}
                  setCode={(newCode) => {
                    const c = typeof newCode === 'function' ? newCode(variations[activeVariationId]?.code || '') : newCode;
                    setVariations(prev => ({
                      ...prev,
                      [activeVariationId]: {
                        ...prev[activeVariationId],
                        code: c
                      }
                    }));
                  }}
                  loading={loading}
                  statusText={statusText}
                  generationId={generationId}
                  localError={localError}
                  onFullscreen={() => setIsFullscreen(true)}
                  onRuntimeError={handleRuntimeError}
                />
              </div>
            ) : Object.keys(variations || {}).length > 0 ? (
              <VariationsGrid 
                variations={variations}
                onSelect={(id) => setActiveVariationId(id)}
                onRegenerate={(id) => {
                  setActiveVariationId(null);
                  generate("Regenerate this variation with a different design", variations[id]?.code);
                }}
              />
            ) : (!code || code.length < 50) && loading ? (
              <DesignPlanPanel plan={plan} timelineStep={timelineStep} />
            ) : (
              <WorkspacePanel 
                code={code}
                setCode={setCode}
                loading={loading}
                statusText={statusText}
                generationId={generationId}
                localError={localError}
                onFullscreen={() => setIsFullscreen(true)}
                onRuntimeError={handleRuntimeError}
              />
            )}
          </div>
        ) : null}

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
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-bold rounded-xl transition hover:opacity-90 active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );"""

# I need to match everything from `return (` to the end.
search_pattern = r'  return \(\n    <div className="h-screen w-screen bg-\[#09090b\].*?  \);\n\}'

main_return_new = """  const hasProject = Object.keys(variations || {}).length > 0 || code || loading;
  
  const TEMPLATES = [
    { id: 'landing', label: 'SaaS Landing Page', icon: Layout, desc: 'Modern SaaS landing page' },
    { id: 'portfolio', label: 'Portfolio Website', icon: Briefcase, desc: 'Creative personal site' },
    { id: 'dashboard', label: 'Analytics Dashboard', icon: Monitor, desc: 'Analytics and data view' },
    { id: 'ecommerce', label: 'E-Commerce Store', icon: ShoppingCart, desc: 'Online store front' },
  ];

  return (
    <div className="h-screen w-screen bg-[#050505] text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
      <AnimatedBackground />
      
      {/* Top Navigation */}
      <TopNav loading={loading} projectName="Untitled Workspace" />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-black/20 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          
          {!hasProject ? (
            /* =========================================================
               EMPTY STATE: ONBOARDING DASHBOARD
               ========================================================= */
            <div className="flex-1 flex flex-col items-center overflow-y-auto px-6 pt-20 pb-12 w-full animate-fade-in">
              <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                
                {/* Hero */}
                <div className="mb-12 text-center relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-2xl backdrop-blur-md transform hover:scale-105 transition-transform cursor-default">
                    <Sparkles className="text-violet-400 drop-shadow-md w-8 h-8" />
                  </div>
                  <h2 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 mb-4 tracking-tight">
                    What will we build today?
                  </h2>
                  <p className="text-lg text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
                    Describe your vision, and our AI will generate a production-ready React codebase instantly.
                  </p>
                </div>

                {/* Main Prompt Composer */}
                <PromptComposer 
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onGenerate={handleGenerate}
                  loading={loading}
                  hasCode={false}
                />

                {/* Quick Templates */}
                <div className="w-full mt-16 mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <LayoutTemplate size={18} className="text-zinc-500" />
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Start with a Template</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TEMPLATES.map(t => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setPrompt(`Build a ${t.label.toLowerCase()}: ${t.desc}`)}
                          className="flex flex-col items-start gap-4 p-5 rounded-2xl glass-button text-left group hover:scale-[1.02]"
                        >
                          <div className="p-2.5 rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-colors shadow-inner">
                            <Icon size={22} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{t.label}</h4>
                            <p className="text-xs text-zinc-500 mt-1.5 font-medium">{t.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="w-full mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <History size={18} className="text-zinc-500" />
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Recent Workspaces</h3>
                    </div>
                    <button className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                      View all <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
                          <FolderOpen size={18} className="text-zinc-500" />
                        </div>
                        <div className="truncate">
                          <h4 className="text-sm font-semibold text-zinc-200 truncate">Untitled Project {i}</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">2 days ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* =========================================================
               ACTIVE PROJECT STATE
               ========================================================= */
            <div className="flex-1 flex flex-col relative w-full h-full animate-fade-in">
              <div className="flex-1 flex overflow-hidden">
                {isFullscreen && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 shadow-2xl">
                    <span className="text-xs font-semibold text-violet-400">Fullscreen Preview</span>
                    <div className="w-px h-4 bg-zinc-700" />
                    <button 
                      onClick={() => setIsFullscreen(false)}
                      className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      Exit Fullscreen
                    </button>
                  </div>
                )}
                
                {activeVariationId ? (
                  <div className="flex-1 flex flex-col relative">
                    <button 
                      onClick={() => setActiveVariationId(null)}
                      className="absolute top-4 right-4 z-50 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-xl transition-colors border border-white/10 shadow-lg flex items-center gap-2"
                    >
                      <ChevronLeft size={16} /> Back to Variations
                    </button>
                    <WorkspacePanel 
                      code={variations[activeVariationId]?.code || ''}
                      setCode={(newCode) => {
                        const c = typeof newCode === 'function' ? newCode(variations[activeVariationId]?.code || '') : newCode;
                        setVariations(prev => ({
                          ...prev,
                          [activeVariationId]: {
                            ...prev[activeVariationId],
                            code: c
                          }
                        }));
                      }}
                      loading={loading}
                      statusText={statusText}
                      generationId={generationId}
                      localError={localError}
                      onFullscreen={() => setIsFullscreen(true)}
                      onRuntimeError={handleRuntimeError}
                    />
                  </div>
                ) : Object.keys(variations || {}).length > 0 ? (
                  <VariationsGrid 
                    variations={variations}
                    onSelect={(id) => setActiveVariationId(id)}
                    onRegenerate={(id) => {
                      setActiveVariationId(null);
                      generate("Regenerate this variation with a different design", variations[id]?.code);
                    }}
                  />
                ) : (!code || code.length < 50) && loading ? (
                  <DesignPlanPanel plan={plan} timelineStep={timelineStep} />
                ) : (
                  <WorkspacePanel 
                    code={code}
                    setCode={setCode}
                    loading={loading}
                    statusText={statusText}
                    generationId={generationId}
                    localError={localError}
                    onFullscreen={() => setIsFullscreen(true)}
                    onRuntimeError={handleRuntimeError}
                  />
                )}
              </div>
              
              {/* Persistent Bottom Prompt Composer (Cursor/v0 style) */}
              <div className="w-full bg-gradient-to-t from-[#050505] to-transparent pt-12 pb-6 px-4 absolute bottom-0 left-0 pointer-events-none">
                <div className="pointer-events-auto">
                  <PromptComposer 
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onGenerate={handleGenerate}
                    loading={loading}
                    hasCode={true}
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Action modal popups */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-[2rem] p-8 glass-panel text-zinc-150 shadow-2xl relative border border-white/10">
            <button 
              onClick={() => setModalContent(null)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 font-bold text-2xl border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                ✓
              </div>
              <h3 className="text-xl font-display font-bold capitalize text-white">
                {modalContent.replace('-', ' ')}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Action trigger Simulation for "{modalContent}" modal overlay.
              </p>
              <button
                onClick={() => setModalContent(null)}
                className="mt-8 w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl transition hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:opacity-90 active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}"""

code = re.sub(search_pattern, main_return_new, code, flags=re.DOTALL)

# Let's make sure ChevronLeft is imported in Home.jsx
if 'ChevronLeft' not in code:
    code = code.replace("import { Layout, LayoutTemplate, Briefcase, Monitor, ShoppingCart, Smartphone, Sparkles, FolderOpen, History, ArrowRight } from 'lucide-react';", "import { Layout, LayoutTemplate, Briefcase, Monitor, ShoppingCart, Smartphone, Sparkles, FolderOpen, History, ArrowRight, ChevronLeft } from 'lucide-react';")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)
print("Updated Home.jsx layout")
