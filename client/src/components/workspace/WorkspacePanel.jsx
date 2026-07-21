import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Download, 
  Layout,
  AlertCircle,
  CheckCircle2,
  CircleDashed
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LivePreview } from '../LivePreview';

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
  const [files, setFiles] = useState({});

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
        }
      }
    } catch (e) {
      // Ignore parse errors while streaming
    }
  }, [code]);

  return (
    <div className="flex-1 w-full flex flex-col bg-[#09090b] border-l border-zinc-800/80 overflow-hidden relative text-left">
      <div className="h-12 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-[#0d1117] shrink-0 z-10">
        <div className="flex items-center gap-2">
          <Layout size={16} className="text-sky-400" />
          <span className="text-xs font-bold text-zinc-300">Live Editor</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button onClick={onFullscreen} className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors" title="Fullscreen">
              <Maximize2 size={16} />
            </button>
            <button className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-colors" title="Download Project">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        {localError && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 p-6 z-20">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-zinc-800 border-t-violet-500 rounded-full animate-spin"></div>
                  <AlertCircle className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">We're fixing the generated code...</h3>
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
        )}
        <LivePreview 
          files={files} 
          loading={loading} 
          statusText={statusText} 
          generationId={generationId} 
          onRuntimeError={onRuntimeError}
          variationId={variationId}
          sessionId={sessionId}
        />
      </div>
    </div>
  );
}
export default WorkspacePanel;
