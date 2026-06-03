import re

filepath = 'client/src/pages/Home.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Imports
imports_old = """import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { DesignPlanPanel } from '../components/workspace/DesignPlanPanel';"""
imports_new = """import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { DesignPlanPanel } from '../components/workspace/DesignPlanPanel';
import { VariationsGrid } from '../components/workspace/VariationsGrid';"""
code = code.replace(imports_old, imports_new)

# 2. Add activeVariationId state and destructure variations
state_old = """  const { code, setCode, generate, fix, loading, error, statusText, generationId, plan, timelineStep } = useGenerate();"""
state_new = """  const { code, setCode, generate, fix, loading, error, statusText, generationId, plan, timelineStep, variations, setVariations } = useGenerate();
  const [activeVariationId, setActiveVariationId] = useState(null);"""
code = code.replace(state_old, state_new)

# 3. Modify handleGenerate to reset activeVariationId
gen_old = """  const handleGenerate = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    generate(trimmed, code || null);
  };"""
gen_new = """  const handleGenerate = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setActiveVariationId(null);
    generate(trimmed, activeVariationId ? variations[activeVariationId]?.code : (code || null));
  };"""
code = code.replace(gen_old, gen_new)

# 4. Modify workspace rendering logic
render_old = """        {/* Workspace / Live Preview */}
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
        ) : null}"""

render_new = """        {/* Workspace / Live Preview */}
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
        ) : null}"""
code = code.replace(render_old, render_new)

# 5. Fix useEffect file saving logic.
# The original code listens to `[code]` to extract files, validate, and call /save-files.
# We need to do this when a variation is complete too.
# But we don't want to call /save-files from frontend if backend is already doing it?
# Wait! We removed `write_files` for variations in backend!
# No, we did NOT remove it! Let's check update_generate_ui.py...
# Ah, I wrote in update_generate_ui.py:
# `yield f"data: {json.dumps({'type': 'variation_complete', 'variation_id': variation_id})}\n\n"`
# I didn't call `write_files` in the loop in `update_generate_ui.py`.
# Wait, let's double check if I did call write_files in update_generate_ui.py for variations.
# I commented: "Instead of parsing and writing files on backend, we will just send variation_complete. The frontend already accumulates the code and can call /save-files!".
# So we DO need to call `/save-files` from the frontend when a variation updates.

# Let's add a useEffect for variations that checks for complete status and calls `/save-files`.
effect_old = """  useEffect(() => {
    if (!code) return;
    let files = null;
    try {
      let cleanedCode = code.trim();
      cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\\n?/i, '');
      cleanedCode = cleanedCode.replace(/\\n?```\s*$/, '');
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
  }, [code]);"""

effect_new = effect_old + """

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
        cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\\n?/i, '');
        cleanedCode = cleanedCode.replace(/\\n?```\s*$/, '');
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
"""
code = code.replace(effect_old, effect_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)
    
print("Updated Home.jsx")
