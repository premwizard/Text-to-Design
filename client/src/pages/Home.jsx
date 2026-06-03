import React, { useState, useEffect } from 'react';
import { useGenerate } from '../hooks/useGenerate';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { PromptPanel } from '../components/prompt/PromptPanel';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { DesignPlanPanel } from '../components/workspace/DesignPlanPanel';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

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

function validateGeneratedCode(code) {
  if (!code) return true;
  const forbiddenTokens = ["<!--", "-->", "```", "###"];
  for (const token of forbiddenTokens) {
    if (code.includes(token)) {
      return false;
    }
  }
  if (/\bfile:/i.test(code)) return false;
  if (/\bfilename:/i.test(code)) return false;
  return true;
}

function Home() {
  const [prompt, setPrompt] = useState('');
  const [localError, setLocalError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sandboxFiles, setSandboxFiles] = useState({});

  const { code, setCode, generate, fix, loading, error, statusText, generationId, plan, timelineStep } = useGenerate();

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
        }
      }
    };

    window.addEventListener('message', handleSandboxMessage);
    return () => window.removeEventListener('message', handleSandboxMessage);
  }, []);

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
      if (!validateGeneratedCode(cleaned)) {
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

  const handleGenerate = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    generate(trimmed, code || null);
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

  return (
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
        {code || loading ? (
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
            {(!code || code.length < 50) && loading ? (
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
  );
}

export default Home;
