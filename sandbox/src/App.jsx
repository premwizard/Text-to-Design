import React from 'react';

export default function SafeComponent() {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px] bg-red-950/30 border-2 border-red-500/50 rounded-xl p-8">
      <div className="text-center space-y-2">
        <h2 className="text-red-400 font-bold text-xl">Component failed safely</h2>
        <p className="text-red-400/80 text-sm max-w-md mx-auto">
          The generated JSX was malformed and failed compilation. The fallback component is being displayed to prevent the preview from crashing.
        </p>
      </div>
    </div>
  );
}
