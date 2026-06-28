import React, { useRef, useState, useEffect } from 'react';
import { normalizeApiBaseUrl, normalizeSandboxUrl } from '../lib/urlHelpers';

export function LivePreview({ code, loading = false, statusText = '', generationId = 0, onRuntimeError, variationId, sessionId }) {
  let API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com');
  let SANDBOX_URL = normalizeSandboxUrl(import.meta.env.VITE_SANDBOX_URL || `${API_BASE}/preview`);

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE = 'http://localhost:5173';
    SANDBOX_URL = 'http://localhost:5173/preview';
  }

  const iframeRef = useRef(null);
  const [runtimeError, setRuntimeError] = useState(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  const prevLoading = useRef(loading);
  const prevCode = useRef(code);

  const postDebugEvent = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/log-debug-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return;
    } catch (e) {}

    // Fallback directly to localhost ports to bypass cached/unrestarted dev server proxies
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const fallbackPorts = ['8000', '8001'];
      for (const port of fallbackPorts) {
        try {
          const res = await fetch(`http://localhost:${port}/log-debug-event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) return;
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    const handleMsg = (e) => {
      if (e.data?.type === 'runtime_error') {
        setRuntimeError({ error: e.data.error, stack: e.data.stack });
        if (sessionId) {
          postDebugEvent({
            session_id: sessionId,
            stage: 'VITE_RUNTIME',
            status: 'ERROR',
            message: `React Runtime Error:\n${e.data.error}\nStack:\n${e.data.stack}`
          });
        }
      } else if (e.data?.type === 'preview_console') {
        console.log(`[IFRAME CONSOLE] [${e.data.logType}] ${e.data.message}`);
        if (sessionId) {
          postDebugEvent({
            session_id: sessionId,
            stage: 'VITE',
            status: e.data.logType.toUpperCase(),
            message: e.data.message
          });
        }
      } else if (e.data?.type === 'preview_rendered') {
        console.log(`[IFRAME DOM] Rendered HTML. length: ${e.data.html.length}`);
        if (sessionId) {
          postDebugEvent({
            session_id: sessionId,
            stage: 'PREVIEW',
            status: 'SUCCESS',
            message: `DOM successfully rendered. Content snippet:\n${e.data.html}`
          });
        }
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [sessionId, API_BASE]);

  useEffect(() => {
    setRuntimeError(null);
  }, [code]);

  useEffect(() => {
    if ((prevLoading.current && !loading) || (prevCode.current !== code && !loading)) {
      setReloadCounter(prev => prev + 1);
    }
    prevLoading.current = loading;
    prevCode.current = code;
  }, [loading, code]);

  const iframeSrc = variationId 
    ? `${SANDBOX_URL}/${variationId}.html?rc=${reloadCounter}`
    : `${SANDBOX_URL}?rc=${reloadCounter}`;


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
          key={`${variationId || 'default'}-${reloadCounter}`}
          ref={iframeRef}
          src={iframeSrc}
          className="w-full h-full border-0 bg-transparent"
          title="Sandbox Preview"
          sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
          onLoad={() => {
            console.log(`[IFRAME] loaded src: ${iframeSrc}`);
            if (sessionId) {
              postDebugEvent({
                session_id: sessionId,
                stage: 'PREVIEW',
                status: 'LOADED',
                message: `iframe loaded source: ${iframeSrc}`
              });
            }
          }}
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
