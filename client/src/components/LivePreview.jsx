import React, { useRef, useState, useEffect } from 'react';

export function LivePreview({ code, loading = false, statusText = '', generationId = 0, onRuntimeError }) {
  const iframeRef = useRef(null);
  const [runtimeError, setRuntimeError] = useState(null);

  useEffect(() => {
    const handleMsg = (e) => {
      console.log("[LivePreview] Received message:", e.data);
      if (e.data?.type === 'runtime_error') {
        console.log("[LivePreview] Setting runtime error state!");
        setRuntimeError({ error: e.data.error, stack: e.data.stack });
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  useEffect(() => {
    setRuntimeError(null);
  }, [code]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Streaming progress bar */}
      {loading && (
        <div
          className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-sky-500"
          style={{
            animation: 'progressBar 1.8s ease-in-out infinite',
          }}
        />
      )}

      {/* Loading Overlay to hide broken state during generation/fixes */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-sm text-sky-400">
          <svg className="animate-spin h-8 w-8 mb-4 text-sky-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm font-semibold animate-pulse">{statusText || 'Generating layout code...'}</p>
        </div>
      )}

      <style>{`
        @keyframes progressBar {
          0%   { transform: scaleX(0);   transform-origin: left; }
          50%  { transform: scaleX(0.7); transform-origin: left; }
          100% { transform: scaleX(1);   transform-origin: left; }
        }
      `}</style>

      {/* Empty state — shown before first generation */}
      {!code && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#070708] text-zinc-650 text-center p-6">
          <div className="w-16 h-16 rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center text-2xl">
            ✦
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-500">Live Preview</p>
            <p className="text-xs text-zinc-700 mt-1 max-w-xs leading-relaxed">
              Enter a prompt on the left and click Generate to compile and render a React component live.
            </p>
          </div>
        </div>
      )}

      {code && (
        <iframe
          ref={iframeRef}
          src={`${window.location.protocol}//${window.location.hostname}:5174`}
          className="w-full h-full border-0 bg-transparent"
          title="Sandbox Preview"
          sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
        />
      )}

      {/* Runtime Error Overlay */}
      {runtimeError && !loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-6">
          <div className="bg-zinc-900 border border-rose-500/50 rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-bold">React Runtime Error</h3>
            </div>
            <div className="bg-zinc-950 rounded-lg p-4 font-mono text-sm text-rose-300 overflow-x-auto mb-4">
              {runtimeError.error}
            </div>
            <p className="text-xs text-zinc-500 mb-6 line-clamp-4 font-mono leading-relaxed overflow-hidden">
              {runtimeError.stack}
            </p>
            <button 
              onClick={() => {
                if (onRuntimeError) onRuntimeError(runtimeError.error, runtimeError.stack);
                setRuntimeError(null);
              }}
              className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg py-2.5 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              ✨ Auto-Fix with AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LivePreview;
