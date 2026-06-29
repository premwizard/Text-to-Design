import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerate } from '../hooks/useGenerate';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { PromptPanel } from '../components/prompt/PromptPanel';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { DesignPlanPanel } from '../components/workspace/DesignPlanPanel';
import { VariationsGrid } from '../components/workspace/VariationsGrid';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';
import { PromptComposer } from '../components/prompt/PromptComposer';
import { PersonalizationCard } from '../components/workspace/PersonalizationCard';
import { Layout, LayoutTemplate, Briefcase, Monitor, ShoppingCart, Smartphone, Sparkles, FolderOpen, History, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import { normalizeApiBaseUrl } from '../lib/urlHelpers';

let API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com');
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  API_BASE = 'http://localhost:5173';
}

function cleanGeneratedCode(code) {
  if (!code) return "";
  let cleaned = code.trim();
  cleaned = cleaned.replace(/^```(?:jsx|javascript|js|react|tsx|ts|json)?\s*\n?/i, '');
  cleaned = cleaned.replace(/\n?```\s*$/, '');
  cleaned = cleaned.replace(/^\s*<!--[\s\S]*?-->\s*/, '');
  cleaned = cleaned.replace(/\s*<!--[\s\S]*?-->\s*$/, '');
  cleaned = cleaned.replace(/^\s*(?:File|Filename):\s*[\w\.\-/]+\s*\n?/i, '');
  cleaned = cleaned.replace(/^\s*###\s*[\w\.\-/]+\s*\n?/i, '');
  const match = cleaned.match(/^\s*(import|export\b)/m);
  if (match) {
    cleaned = cleaned.slice(match.index);
  }
  return cleaned.trim();
}

function validateGeneratedCode(code, filename) {
  if (!code || code.trim().length < 30) {
    console.warn(`[VALIDATION FAILED] File: ${filename || 'unknown'}. Reason: Code is empty or too short (length: ${code ? code.length : 0})`);
    return false;
  }
  const forbiddenTokens = ["<!--", "-->", "```", "###"];
  for (const token of forbiddenTokens) {
    if (code.includes(token)) {
      console.warn(`[VALIDATION FAILED] File: ${filename || 'unknown'}. Reason: Contains forbidden token: ${token}`);
      return false;
    }
  }
  if (/\bfile:/i.test(code)) {
    console.warn(`[VALIDATION FAILED] File: ${filename || 'unknown'}. Reason: Contains forbidden pattern 'file:'`);
    return false;
  }
  if (/\bfilename:/i.test(code)) {
    console.warn(`[VALIDATION FAILED] File: ${filename || 'unknown'}. Reason: Contains forbidden pattern 'filename:'`);
    return false;
  }
  
  // Highlight spans checks
  const highlightingPatterns = [
    /<span\s+(class|className)="text-(pink-400\s+font-semibold|amber-300|violet-300|emerald-400|sky-400|zinc-500\s+italic)"/,
    /text-pink-400\s+font-semibold">/,
    /text-amber-300">/,
    /text-violet-300">/,
    /text-emerald-400">/,
    /text-sky-400">/,
    /text-zinc-500\s+italic">/
  ];
  for (const pattern of highlightingPatterns) {
    if (pattern.test(code)) {
      console.warn(`[VALIDATION FAILED] File: ${filename || 'unknown'}. Reason: Matches syntax highlighting span pattern: ${pattern.toString()}`);
      return false;
    }
  }
  
  // Malformed import/export checks
  const lines = code.split('\n');
  for (const line of lines) {
    if ((line.includes("import") || line.includes("export")) && 
        (line.includes("<") || line.includes(">") || line.includes("class=") || line.includes("className="))) {
      console.warn(`[VALIDATION FAILED] File: ${filename || 'unknown'}. Reason: Malformed import/export line: ${line}`);
      return false;
    }
  }
  
  return true;
}

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(location.state?.initialPrompt || '');
  const [localError, setLocalError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sandboxFiles, setSandboxFiles] = useState({});
  const [mode, setMode] = useState('generate');

  const { code, setCode, generate, editUI, fix, loading, error, statusText, generationId, plan, timelineStep, variations, setVariations, agentStatus, agentOutputs, sessionId } = useGenerate();
  const [activeVariationId, setActiveVariationId] = useState(null);
  const [generationMode, setGenerationMode] = useState('single_mode');
  const [variationCount, setVariationCount] = useState(1);
  const { user } = useAuth();
  const [recentProjects, setRecentProjects] = useState([]);
  
  // Handle preview iframe postMessage listeners and log directly to console
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'preview_console') {
        console.log(`[IFRAME CONSOLE] [${e.data.logType}] ${e.data.message}`);
      } else if (e.data?.type === 'runtime_error') {
        console.error(`[IFRAME RUNTIME ERROR] ${e.data.error}\nStack:\n${e.data.stack}`);
      } else if (e.data?.type === 'preview_rendered') {
        console.log(`[IFRAME DOM] DOM successfully rendered.`);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Log pipeline stages, compilation and status updates to console
  useEffect(() => {
    if (sessionId) {
      console.log(`[PIPELINE SESSION ID] ${sessionId}`);
    }
  }, [sessionId]);

  useEffect(() => {
    if (timelineStep || agentStatus) {
      console.log(`[PIPELINE STATUS] Stage: ${timelineStep || 'None'} | Agent: ${agentStatus || 'Idle'}`);
    }
  }, [timelineStep, agentStatus]);

  useEffect(() => {
    if (loading) {
      console.log("[PIPELINE STATUS] Compilation initiated (COMPILING)");
    }
  }, [loading]);

  useEffect(() => {
    if (error || localError) {
      console.error(`[PIPELINE STATUS] Compilation failed: ${error || localError}`);
    } else if (code && !loading) {
      console.log("[PIPELINE STATUS] Compilation successful (SUCCESS)");
    }
  }, [error, localError, code, loading]);

  function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
  }

  // Fetch recent projects for the empty state
  useEffect(() => {
    if (user?.id) {
      projectService.getProjects()
        .then(data => setRecentProjects(data.slice(0, 3)))
        .catch(console.error);
    }
  }, [user]);

  // Auto-save single code when loading finishes (if not using variations)
  useEffect(() => {
    if (!loading && code && code.length > 50 && user?.id) {
       // Prevent duplicate saves by checking if this generationId was already saved
       const saveKey = `saved_gen_${generationId}`;
       if (!window[saveKey]) {
         window[saveKey] = true;
         projectService.createProject({
           user_id: user.id,
           title: "Edited Design",
           prompt: prompt || "Edit",
           generated_code: code,
           framework: 'react'
         }).catch(console.error);
       }
    }
  }, [loading, code, user, generationId, prompt]);

  useEffect(() => {
    const handleSandboxMessage = (event) => {
      const { type, action } = event.data;
      if (type === 'SANDBOX_ACTION') {
        if (action.type === 'open-modal') {
          setModalContent(action.target || 'standard');
        } else if (action.type === 'close-modal') {
          setModalContent(null);
        } else if (action.type === 'navigate') {
          window.open(action.target || '#', '_blank');
        }
      }
    };

    window.addEventListener('message', handleSandboxMessage);
    return () => window.removeEventListener('message', handleSandboxMessage);
  }, []);

  // Handle auto-generation if initialPrompt is provided via navigation
  useEffect(() => {
    if (location.state?.initialPrompt) {
      const p = location.state.initialPrompt;
      // Clear the state so it doesn't trigger again on refresh
      navigate('.', { replace: true, state: {} });
      if (!loading) {
        generate(p, null);
      }
    }
  }, [location.state?.initialPrompt]);

  useEffect(() => {
    if (!code) return;
    let files = null;
    try {
      let cleanedCode = code.trim();
      cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\n?/i, '');
      cleanedCode = cleanedCode.replace(/\n?```\s*$/, '');
      cleanedCode = cleanedCode.trim();
      if (cleanedCode.startsWith('{')) {
        const parsed = JSON.parse(cleanedCode);
        if (parsed && parsed.files) files = parsed.files;
      }
    } catch (e) {}

    if (!files) return;

    let hasInvalidFile = false;
    const sanitizedFiles = {};
    for (const [filename, fileContent] of Object.entries(files)) {
      const cleaned = cleanGeneratedCode(fileContent);
      if (!validateGeneratedCode(cleaned, filename)) {
        hasInvalidFile = true;
        break;
      }
      sanitizedFiles[filename] = cleaned;
    }

    if (hasInvalidFile) {
      setLocalError("Generated code validation failed.");
      return;
    } else {
      setLocalError("");
    }

    setSandboxFiles(sanitizedFiles);

    const timer = setTimeout(async () => {
      try {
        await fetch(`${API_BASE}/save-files`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files: sanitizedFiles }),
        });
      } catch (err) {}
    }, 1000);

    return () => clearTimeout(timer);
  }, [code]);

  // Save files for variations when they update
  useEffect(() => {
    if (!variations) return;
    
    // Find all complete or generating variations that need saving
    Object.keys(variations).forEach(vid => {
      const v = variations[vid];
      if (!v.code || v.code.length < 50) return;
      
      let files = null;
      try {
        let cleanedCode = v.code.trim();
        cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\n?/i, '');
        cleanedCode = cleanedCode.replace(/\n?```\s*$/, '');
        cleanedCode = cleanedCode.trim();
        if (cleanedCode.startsWith('{')) {
          const parsed = JSON.parse(cleanedCode);
          if (parsed && parsed.files) files = parsed.files;
        }
      } catch (e) {}
      
      if (!files) return;
      
      const sanitizedFiles = {};
      for (const [filename, fileContent] of Object.entries(files)) {
        sanitizedFiles[filename] = cleanGeneratedCode(fileContent);
      }
      
      if (Object.keys(sanitizedFiles).length > 0) {
        // Debounce the save per variation
        clearTimeout(window[`saveTimer_${vid}`]);
        window[`saveTimer_${vid}`] = setTimeout(async () => {
          try {
            await fetch(`${API_BASE}/save-files`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ files: sanitizedFiles, variation_id: vid }),
            });
          } catch (err) {
            console.error("Failed to save variation files", err);
          }
        }, 1500); // Wait 1.5s to batch saves while generating
      }
    });
  }, [variations]);


  const handleGenerate = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    
    if (mode === 'edit' && code) {
      editUI(user?.id || 'default_user', sessionId || 'default_session', trimmed, JSON.stringify({ files: sandboxFiles }), plan);
    } else {
      setActiveVariationId(null);
      setMode('edit');
      generate(trimmed, activeVariationId ? variations[activeVariationId]?.code : (code || null), user?.id || user?.email || null, generationMode, variationCount);
    }
  };

  const handleRuntimeError = async (errorMsg, stack) => {
    if (!stack) return;

    // 1. Extract filename from stack
    const match = stack.match(/at\s+.*?\s+\((.*?\.jsx):\d+:\d+\)/) || stack.match(/at\s+.*?\s+(.*?\.jsx):\d+:\d+/);
    let filename = '';
    if (match) {
      filename = match[1];
      if (!filename.startsWith('components/') && filename !== 'App.jsx' && filename !== 'main.jsx') {
        filename = 'components/' + filename; 
      }
    } else {
      filename = 'App.jsx';
    }

    // Attempt to find exact matching key in sandboxFiles
    const matchingKey = Object.keys(sandboxFiles).find(k => k.endsWith(filename));
    const brokenCode = matchingKey ? sandboxFiles[matchingKey] : sandboxFiles['App.jsx'];
    
    if (!brokenCode) {
       console.error("Could not find source for:", filename);
       setLocalError(`Could not find source file: ${filename}`);
       return;
    }

    // Call fix
    const fixedCode = await fix(brokenCode, errorMsg);
    if (fixedCode) {
       try {
         let cleanedCode = code.trim();
         cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js|react)?\s*\n?/i, '');
         cleanedCode = cleanedCode.replace(/\n?```\s*$/, '');
         const parsed = JSON.parse(cleanedCode);
         
         const exactKey = Object.keys(parsed.files).find(k => k.endsWith(filename)) || Object.keys(parsed.files)[0];
         parsed.files[exactKey] = fixedCode;
         
         setCode(JSON.stringify(parsed, null, 2));
       } catch (e) {
         console.error("Failed to inject fixed code back into state", e);
         setLocalError("Failed to apply the fix to the workspace.");
       }
    }
  };

  const hasProject = Object.keys(variations || {}).length > 0 || code || loading;
  
  const TEMPLATES = [
    { id: 'landing', label: 'SaaS Landing Page', icon: Layout, desc: 'Modern SaaS landing page' },
    { id: 'portfolio', label: 'Portfolio Website', icon: Briefcase, desc: 'Creative personal site' },
    { id: 'dashboard', label: 'Analytics Dashboard', icon: Monitor, desc: 'Analytics and data view' },
    { id: 'ecommerce', label: 'E-Commerce Store', icon: ShoppingCart, desc: 'Online store front' },
  ];

  return (
    <div className="h-screen w-screen bg-app text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
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
                  generationMode={generationMode}
                  setGenerationMode={setGenerationMode}
                  variationCount={variationCount}
                  setVariationCount={setVariationCount}
                />

                {/* Personalization Dashboard Panel */}
                <div className="w-full mt-10">
                  <PersonalizationCard userId={user?.id || user?.email} />
                </div>

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
                    {recentProjects.length > 0 ? recentProjects.map(proj => (
                      <div key={proj.id} className="p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
                          <FolderOpen size={18} className="text-zinc-500" />
                        </div>
                        <div className="truncate text-left">
                          <h4 className="text-sm font-semibold text-zinc-200 truncate">{proj.title}</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">{new Date(proj.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-3 text-center py-4 text-zinc-500 text-sm">No recent projects</div>
                    )}
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
                      variationId={activeVariationId}
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
                    onSave={async (id) => {
                      const v = variations[id];
                      if (!v || !user?.id || v.isSaved) return;
                      try {
                        const proj = await projectService.createProject({
                          user_id: user.id,
                          title: v.plan?.product_name || `Variation ${id}`,
                          prompt: prompt,
                          generated_code: v.code,
                          framework: 'react'
                        });
                        setVariations(prev => ({
                          ...prev,
                          [id]: { ...prev[id], isSaved: true, dbProjectId: proj.id }
                        }));
                      } catch (err) {
                        console.error("Failed to save variation project", err);
                      }
                    }}
                    onToggleFavorite={async (id) => {
                      const v = variations[id];
                      if (!v || !user?.id) return;
                      try {
                        let projectId = v.dbProjectId;
                        // If not saved yet, save it first
                        if (!projectId) {
                          const proj = await projectService.createProject({
                            user_id: user.id,
                            title: v.plan?.product_name || `Variation ${id}`,
                            prompt: prompt,
                            generated_code: v.code,
                            framework: 'react'
                          });
                          projectId = proj.id;
                        }
                        
                        const newFavStatus = !v.is_favorite;
                        await projectService.toggleFavorite(projectId, newFavStatus);
                        
                        setVariations(prev => ({
                          ...prev,
                          [id]: { ...prev[id], isSaved: true, dbProjectId: projectId, is_favorite: newFavStatus }
                        }));
                      } catch (err) {
                        console.error("Failed to favorite variation project", err);
                      }
                    }}
                  />
                ) : (!code || code.length < 50) && loading ? (
                  <DesignPlanPanel plan={plan} timelineStep={timelineStep} agentStatus={agentStatus} agentOutputs={agentOutputs} />
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
                    sessionId={sessionId}
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
                    mode={mode}
                    setMode={setMode}
                    generationMode={generationMode}
                    setGenerationMode={setGenerationMode}
                    variationCount={variationCount}
                    setVariationCount={setVariationCount}
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
}

export default Home;
