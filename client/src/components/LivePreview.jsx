/* eslint-disable no-unused-vars, no-empty, no-self-assign */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
// Bypass browser cache for LivePreview
import { RefreshCw, Terminal as TerminalIcon } from 'lucide-react';
import { webcontainerManager } from './RuntimeEngine/WebContainerManager';
import { FileExplorer } from './RuntimeEngine/FileExplorer';
import { CodeEditor } from './RuntimeEngine/CodeEditor';
import { Terminal } from './RuntimeEngine/Terminal';

export function LivePreview({ files = {}, loading = false, statusText = '' }) {
  const [selectedFile, setSelectedFile] = useState('App.jsx');
  const [activeCode, setActiveCode] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [logs, setLogs] = useState('');
  const [isBooting, setIsBooting] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const isMounted = useRef(false);

  // Setup the WebContainer and boot the environment when files arrive
  useEffect(() => {
    if (Object.keys(files).length === 0 || isMounted.current) return;
    
    let isCancelled = false;
    
    const bootEnvironment = async () => {
      try {
        isMounted.current = true;
        setIsBooting(true);
        setLogs(prev => prev + '\r\n> Booting isolated Node.js environment...\r\n');
        
        // Ensure index.html and Vite files exist
        const runtimeFiles = { ...files };
        if (!runtimeFiles['index.html']) {
          runtimeFiles['index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { theme: { extend: {} } };
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>`;
        }
        
        if (!runtimeFiles['package.json']) {
          runtimeFiles['package.json'] = JSON.stringify({
            name: "runtime-preview",
            private: true,
            type: "module",
            scripts: {
              dev: "vite"
            },
            dependencies: {
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "react-router-dom": "^6.22.0",
              "lucide-react": "0.292.0",
              "framer-motion": "^11.0.0",
              "clsx": "^2.1.0",
              "tailwind-merge": "^2.2.0"
            },
            devDependencies: {
              "@vitejs/plugin-react": "^4.2.1",
              "vite": "^5.1.0"
            }
          }, null, 2);
        }

        if (!runtimeFiles['vite.config.js']) {
          runtimeFiles['vite.config.js'] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: '0.0.0.0' }
});`;
        }

        if (!runtimeFiles['index.jsx'] && !runtimeFiles['main.jsx']) {
          const appFile = runtimeFiles['App.jsx'] ? './App.jsx' : './App';
          runtimeFiles['index.jsx'] = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from '${appFile}';

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);`;
        }

        // Mount files
        await webcontainerManager.mountFiles(runtimeFiles);
        setLogs(prev => prev + '> Files mounted successfully.\r\n');

        // Listen for server-ready
        webcontainerManager.onServerReady((port, url) => {
          if (!isCancelled) {
            setLogs(prev => prev + `> Server ready on ${url}\r\n`);
            setPreviewUrl(url);
            setIsBooting(false);
          }
        });

        // Run npm install
        setLogs(prev => prev + '> Running npm install...\r\n');
        const installExitCode = await webcontainerManager.runCommand('npm', ['install'], (data) => {
          setLogs(prev => prev + data);
        });

        if (installExitCode !== 0) {
          throw new Error('npm install failed');
        }

        // Run npm run dev
        setLogs(prev => prev + '\r\n> Starting Vite dev server...\r\n');
        await webcontainerManager.runCommand('npm', ['run', 'dev'], (data) => {
          setLogs(prev => prev + data);
        });

      } catch (err) {
        if (!isCancelled) {
          setLogs(prev => prev + `\r\n[ERROR] ${err.message}\r\n`);
          setIsBooting(false);
        }
      }
    };

    bootEnvironment();

    return () => {
      isCancelled = true;
    };
  }, [files]);

  // Sync selected file content
  useEffect(() => {
    let cleanPath = selectedFile.startsWith('/') ? selectedFile.slice(1) : selectedFile;
    if (files[cleanPath]) {
      setActiveCode(files[cleanPath]);
    } else {
      setActiveCode('/* File not found or empty */');
    }
  }, [selectedFile, files]);

  // Handle user edits
  const handleCodeChange = useCallback(async (filename, newContent) => {
    setActiveCode(newContent);
    // Debounce or write directly to VFS
    try {
      await webcontainerManager.writeFile(filename, newContent);
    } catch (e) {
      console.error("Failed to write to VFS", e);
    }
  }, []);

  const handleRefreshIframe = () => {
    const iframe = document.getElementById('preview-iframe');
    if (iframe) {
      
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col bg-zinc-950 text-white overflow-hidden border border-zinc-800 rounded-lg">
      
      {/* Header */}
      <div className="h-10 border-b border-zinc-800 bg-[#0a0a0c] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
          </div>
          <span className="text-xs font-semibold text-zinc-400">Runtime Engine</span>
        </div>
        <div className="flex items-center gap-2">
          {previewUrl && (
            <button onClick={handleRefreshIframe} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Refresh Preview">
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          <button onClick={() => setShowTerminal(!showTerminal)} className={`p-1.5 rounded-md transition-colors ${showTerminal ? 'bg-sky-500/20 text-sky-400' : 'text-zinc-400 hover:bg-zinc-800'}`} title="Toggle Terminal">
            <TerminalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 overflow-hidden">
        {Object.keys(files).length === 0 ? (
          // Empty State
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-[#070708]">
            {loading ? (
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 mb-4 text-sky-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm font-semibold text-zinc-400">{statusText || 'Generating files...'}</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center text-2xl mb-4 text-zinc-700">✦</div>
                <p className="text-sm font-medium">Ready to boot runtime</p>
                <p className="text-xs text-zinc-600 mt-2 max-w-xs text-center">Waiting for AI to generate project files before starting the Node.js environment.</p>
              </>
            )}
          </div>
        ) : (
          <PanelGroup direction="horizontal">
            {/* Sidebar: File Explorer */}
            <Panel defaultSize={20} minSize={15}>
              <FileExplorer files={files} onFileSelect={setSelectedFile} selectedFile={selectedFile} />
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-zinc-900 hover:bg-sky-500/50 transition-colors cursor-col-resize flex flex-col justify-center items-center">
              <div className="h-8 w-0.5 bg-zinc-700 rounded-full" />
            </PanelResizeHandle>
            
            {/* Center: Editor & Terminal */}
            <Panel defaultSize={40} minSize={30}>
              <PanelGroup direction="vertical">
                <Panel defaultSize={showTerminal ? 70 : 100}>
                  <CodeEditor file={selectedFile} content={activeCode} onChange={handleCodeChange} />
                </Panel>
                
                {showTerminal && (
                  <>
                    <PanelResizeHandle className="h-1 bg-zinc-900 hover:bg-sky-500/50 transition-colors cursor-row-resize flex justify-center items-center">
                      <div className="w-8 h-0.5 bg-zinc-700 rounded-full" />
                    </PanelResizeHandle>
                    <Panel defaultSize={30} minSize={15}>
                      <Terminal logs={logs} />
                    </Panel>
                  </>
                )}
              </PanelGroup>
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-zinc-900 hover:bg-sky-500/50 transition-colors cursor-col-resize flex flex-col justify-center items-center">
              <div className="h-8 w-0.5 bg-zinc-700 rounded-full" />
            </PanelResizeHandle>
            
            {/* Right: Preview Iframe */}
            <Panel defaultSize={40} minSize={20}>
              <div className="w-full h-full bg-white relative">
                {isBooting && !previewUrl && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm text-sky-400">
                    <svg className="animate-spin h-8 w-8 mb-4 text-sky-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm font-semibold animate-pulse">Booting Node.js & installing dependencies...</p>
                  </div>
                )}
                {previewUrl ? (
                  <iframe
                    id="preview-iframe"
                    src={previewUrl}
                    className="w-full h-full border-none"
                    title="Live Preview"
                    allow="cross-origin-isolated"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
                    {isBooting ? '' : 'Preview will appear here once the server starts'}
                  </div>
                )}
              </div>
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  );
}

export default LivePreview;
