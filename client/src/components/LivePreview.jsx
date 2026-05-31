import React, { useRef } from 'react';

export function LivePreview({ code, loading = false }) {
  const iframeRef = useRef(null);

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-950">
      {/* Streaming progress bar */}
      {loading && (
        <div
          className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-sky-500"
          style={{
            animation: 'progressBar 1.8s ease-in-out infinite',
          }}
        />
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
          className="w-full h-full border-none bg-zinc-950"
          title="Sandbox Preview"
          sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
        />
      )}
    </div>
  );
}

export default LivePreview;
