import React, { useState, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  useSandpack
} from "@codesandbox/sandpack-react";

export function LivePreview({ files = {}, loading = false, statusText = '', generationId = 0, onRuntimeError, variationId, sessionId }) {
  const [runtimeError, setRuntimeError] = useState(null);
  
  // Convert our flat files dictionary into Sandpack's expected format
  const sandpackFiles = {};
  for (const [filename, content] of Object.entries(files)) {
    // Ensure all paths start with a leading slash for Sandpack
    const path = filename.startsWith('/') ? filename : `/${filename}`;
    sandpackFiles[path] = content;
  }

  // Inject a minimal Vite-like index.html if one wasn't provided by the backend
  if (!sandpackFiles['/index.html'] && !sandpackFiles['index.html']) {
    sandpackFiles['/index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { theme: { extend: {} } };
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.js"></script>
  </body>
</html>`;
  }

  // Inject minimal package.json if not present
  if (!sandpackFiles['/package.json'] && !sandpackFiles['package.json']) {
    sandpackFiles['/package.json'] = {
      code: JSON.stringify({
        name: "generated-project",
        dependencies: {
          "react": "^18.0.0",
          "react-dom": "^18.0.0",
          "react-router-dom": "^6.20.0",
          "lucide-react": "0.292.0",
          "framer-motion": "^10.16.4",
          "clsx": "^2.0.0",
          "tailwind-merge": "^2.0.0"
        }
      }, null, 2),
      hidden: true
    };
  }
  
  // Inject index.js entry point to bootstrap React 18, if not present
  if (!sandpackFiles['/index.js'] && !sandpackFiles['index.js'] && !sandpackFiles['/main.jsx'] && !sandpackFiles['main.jsx']) {
    const appFile = sandpackFiles['/App.jsx'] || sandpackFiles['App.jsx'] ? './App.jsx' : './App';
    sandpackFiles['/index.js'] = `import React from "react";
import { createRoot } from "react-dom/client";
import App from "${appFile}";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);`;
  }

  // Inject empty index.css if not present
  if (!sandpackFiles['/index.css'] && !sandpackFiles['index.css']) {
      sandpackFiles['/index.css'] = `/* Tailwind is injected via CDN in index.html */`;
  }

  // Handle logging requirements
  useEffect(() => {
    if (Object.keys(files).length > 0) {
      console.log(`[DEBUG] [LivePreview] Receiving final_code...`);
      console.log(`[DEBUG] [LivePreview] Number of files: ${Object.keys(files).length}`);
      console.log(`[DEBUG] [LivePreview] File names:`, Object.keys(files));
      console.log(`[DEBUG] [LivePreview] Project mounted in Sandpack virtual filesystem.`);
    }
  }, [files]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-sm text-sky-400">
          <svg className="animate-spin h-8 w-8 mb-4 text-sky-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm font-semibold animate-pulse">{statusText || 'Generating project files...'}</p>
        </div>
      )}

      {/* Fallback Empty State */}
      {Object.keys(files).length === 0 && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#070708] text-zinc-650 text-center p-6 z-40">
          <div className="w-16 h-16 rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center text-2xl">
            ✦
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-500">Live Preview</p>
            <p className="text-xs text-zinc-700 mt-1 max-w-xs leading-relaxed">
              No files received from backend yet.
            </p>
          </div>
        </div>
      )}

      {/* Sandpack Project Renderer */}
      {Object.keys(files).length > 0 && (
        <div className="w-full h-full absolute inset-0 z-10">
          <SandpackProvider 
            template="vite-react" 
            theme="light"
            files={sandpackFiles}
            options={{
              classes: {
                "sp-wrapper": "h-full w-full",
                "sp-layout": "h-full w-full bg-white",
                "sp-preview": "h-full w-full bg-white",
                "sp-preview-container": "h-full w-full bg-white",
                "sp-preview-iframe": "h-full w-full border-none bg-white",
              }
            }}
            customSetup={{
              dependencies: {
                "react": "^18.0.0",
                "react-dom": "^18.0.0",
                "react-router-dom": "^6.20.0",
                "lucide-react": "0.292.0",
                "framer-motion": "^10.16.4",
                "clsx": "^2.0.0",
                "tailwind-merge": "^2.0.0"
              }
            }}
          >
            <SandpackLayout className="h-full w-full rounded-none border-none bg-white">
              <SandpackPreview 
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
                className="h-full w-full flex-grow bg-white"
              />
              <SandpackListener />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      )}
    </div>
  );
}

// Helper component to hook into Sandpack's internal state for logging
function SandpackListener() {
  const { sandpack } = useSandpack();
  
  useEffect(() => {
    if (sandpack.status === 'running') {
      console.log(`[DEBUG] [LivePreview] Project rendered by Sandpack bundler successfully.`);
    } else if (sandpack.status === 'error') {
      console.error(`[DEBUG] [LivePreview] Render error detected in Sandpack!`);
    }
  }, [sandpack.status]);

  return null;
}

export default LivePreview;
