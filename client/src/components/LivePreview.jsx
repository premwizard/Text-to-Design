/* eslint-disable no-unused-vars, no-empty, no-self-assign */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
// Bypass browser cache for LivePreview
import { RefreshCw, Terminal as TerminalIcon, CheckCircle2, CircleDashed } from 'lucide-react';
import { webcontainerManager } from './RuntimeEngine/WebContainerManager';
import { FileExplorer } from './RuntimeEngine/FileExplorer';
import { CodeEditor } from './RuntimeEngine/CodeEditor';
import { Terminal } from './RuntimeEngine/Terminal';

export function LivePreview({ files = {}, loading = false, statusText = '', onRuntimeError }) {
  const [selectedFile, setSelectedFile] = useState('index.html');
  const [activeCode, setActiveCode] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [logs, setLogs] = useState('');
  const [isBooting, setIsBooting] = useState(false);
  const [bootPhase, setBootPhase] = useState('idle');
  const [showTerminal, setShowTerminal] = useState(true);

  const isMounted = useRef(false);
  const prevFiles = useRef({});
  const autoFixedImports = useRef(new Set());
  const logBufferRef = useRef('');

  // ... (keep rest of stubs logic) ...
  
  // Setup the WebContainer or Static preview when files arrive
  useEffect(() => {
    if (Object.keys(files).length === 0) return;

    let isCancelled = false;

    const applyFilesAndBoot = async () => {
      try {
        const runtimeFiles = { ...files };
        const hasReactFiles = Object.keys(runtimeFiles).some(f => f.endsWith('.jsx') || f.endsWith('.tsx'));

        // -------------------------------------------------------------
        // INSTANT STATIC PREVIEW ENGINE (No WebContainer/SharedArrayBuffer needed)
        // -------------------------------------------------------------
        if (!hasReactFiles && (runtimeFiles['index.html'] || runtimeFiles['/index.html'])) {
          const htmlCode = runtimeFiles['index.html'] || runtimeFiles['/index.html'] || '';
          const cssCode = runtimeFiles['style.css'] || runtimeFiles['/style.css'] || '';
          const jsCode = runtimeFiles['script.js'] || runtimeFiles['/script.js'] || '';

          let combinedDoc = htmlCode;
          if (cssCode && !combinedDoc.includes('<style') && !combinedDoc.includes('style.css')) {
            combinedDoc = combinedDoc.replace('</head>', `<style>\n${cssCode}\n</style>\n</head>`);
          }
          if (jsCode && !combinedDoc.includes('<script') && !combinedDoc.includes('script.js')) {
            combinedDoc = combinedDoc.replace('</body>', `<script>\n${jsCode}\n</script>\n</body>`);
          }

          const blob = new Blob([combinedDoc], { type: 'text/html;charset=utf-8' });
          const objectUrl = URL.createObjectURL(blob);

          if (!isCancelled) {
            setPreviewUrl(objectUrl);
            setIsBooting(false);
            setBootPhase('ready');
            setLogs('> Pure Static HTML5/CSS3/Vanilla JS website rendered instantly.\r\n');
          }
          return;
        }

        // Normalize entry file and create index.jsx fallback bridge ONLY if React component files exist
        if (hasReactFiles && !runtimeFiles['index.jsx'] && !runtimeFiles['index.tsx']) {
          if (runtimeFiles['main.jsx']) {
            runtimeFiles['index.jsx'] = `import './main.jsx';`;
          } else if (runtimeFiles['main.tsx']) {
            runtimeFiles['index.jsx'] = `import './main.tsx';`;
          } else if (runtimeFiles['src/main.jsx']) {
            runtimeFiles['index.jsx'] = `import './src/main.jsx';`;
          } else if (runtimeFiles['src/main.tsx']) {
            runtimeFiles['index.jsx'] = `import './src/main.tsx';`;
          } else if (runtimeFiles['src/index.jsx']) {
            runtimeFiles['index.jsx'] = `import './src/index.jsx';`;
          } else if (runtimeFiles['src/index.tsx']) {
            runtimeFiles['index.jsx'] = `import './src/index.tsx';`;
          } else {
            let appImport = './App.jsx';
            if (runtimeFiles['src/App.jsx']) appImport = './src/App.jsx';
            else if (runtimeFiles['src/App.tsx']) appImport = './src/App.tsx';
            else if (runtimeFiles['App.jsx']) appImport = './App.jsx';
            else if (runtimeFiles['App.tsx']) appImport = './App.tsx';
            else {
              const firstJsx = Object.keys(runtimeFiles).find(f => f.endsWith('.jsx') || f.endsWith('.tsx'));
              if (firstJsx) appImport = `./${firstJsx}`;
            }

            runtimeFiles['index.jsx'] = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from '${appImport}';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("React Error Boundary Caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', fontFamily: 'monospace', height: '100vh', overflow: 'auto' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.5rem' }}>React Runtime Error</h2>
          <div style={{ background: '#fef2f2', padding: '15px', borderRadius: '6px', border: '1px solid #f87171' }}>
            <strong>Message:</strong> {this.state.error?.message || 'Unknown Error'}<br/>
            <pre style={{ marginTop: '10px', fontSize: '12px', whiteSpace: 'pre-wrap' }}>{this.state.errorInfo?.componentStack}</pre>
          </div>
          <p style={{ marginTop: '15px' }}>Check your browser's Developer Console (F12) for more details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <HashRouter>
      <App />
    </HashRouter>
  </ErrorBoundary>
);`;
          }
        }

        const entryScript = runtimeFiles['main.jsx'] ? '/main.jsx' : '/index.jsx';

        if (!runtimeFiles['index.html']) {
          runtimeFiles['index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script>
      window.addEventListener('error', (event) => {
        const root = document.getElementById('root');
        if (root) {
          root.innerHTML = \\\`
            <div style="padding: 20px; background: #fee2e2; color: #991b1b; font-family: monospace; height: 100vh; overflow: auto; box-sizing: border-box;">
              <h2 style="margin-top: 0; font-size: 1.5rem;">Syntax / Module Error</h2>
              <div style="background: #fef2f2; padding: 15px; border-radius: 6px; border: 1px solid #f87171;">
                <strong>Message:</strong> \\\${event.message}<br/>
                <strong>File:</strong> \\\${event.filename || 'Unknown'}<br/>
                <strong>Line:</strong> \\\${event.lineno || 'Unknown'}: \\\${event.colno || 'Unknown'}<br/>
              </div>
              <p style="margin-top: 15px;">Check your browser's Developer Console (F12) for more details.</p>
            </div>
          \\\`;
        }
      });
      window.addEventListener('unhandledrejection', (event) => {
        const root = document.getElementById('root');
        if (root) {
          root.innerHTML = \\\`
            <div style="padding: 20px; background: #fee2e2; color: #991b1b; font-family: monospace; height: 100vh; overflow: auto; box-sizing: border-box;">
              <h2 style="margin-top: 0; font-size: 1.5rem;">Unhandled Promise Rejection</h2>
              <div style="background: #fef2f2; padding: 15px; border-radius: 6px; border: 1px solid #f87171;">
                <strong>Message:</strong> \\\${event.reason?.message || event.reason || 'Unknown Error'}<br/>
              </div>
              <p style="margin-top: 15px;">Check your browser's Developer Console (F12) for more details.</p>
            </div>
          \\\`;
        }
      });
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entryScript}"></script>
  </body>
</html>`;
        } else {
          runtimeFiles['index.html'] = runtimeFiles['index.html'].replace(
            'https://cdn.tailwindcss.com',
            'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'
          );
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

        if (!isMounted.current) {
          isMounted.current = true;
          setIsBooting(true);
          setBootPhase('booting');
          setLogs(prev => prev + '\r\n> Booting isolated Node.js environment...\r\n');

          // Mount files
          await webcontainerManager.mountFiles(runtimeFiles);
          prevFiles.current = runtimeFiles;
          setLogs(prev => prev + '> Files mounted successfully.\r\n');

          // Listen for server-ready
          webcontainerManager.onServerReady((port, url) => {
            if (!isCancelled) {
              setLogs(prev => prev + `> Server ready on ${url}\r\n`);
              setPreviewUrl(url);
              setIsBooting(false);
              setBootPhase('ready');
            }
          });

          // Run npm install
          setBootPhase('installing');
          setLogs(prev => prev + '> Running npm install...\r\n');
          const installExitCode = await webcontainerManager.runCommand('npm', ['install'], (data) => {
            setLogs(prev => prev + data);
          });

          if (installExitCode !== 0) {
            throw new Error('npm install failed');
          }

          // Run npm run dev
          setBootPhase('starting');
          setLogs(prev => prev + '\r\n> Starting Vite dev server...\r\n');
          await webcontainerManager.runCommand('npm', ['run', 'dev'], (data) => {
            setLogs(prev => prev + data);
            handleTerminalOutput(data);
          });
        } else {
          // Hot Reloading Logic
          const oldFiles = prevFiles.current;
          let pkgChanged = false;

          for (const [path, content] of Object.entries(runtimeFiles)) {
            if (oldFiles[path] !== content) {
              await webcontainerManager.writeFile(path, content);
              if (path === 'package.json') {
                if (webcontainerManager.hasPackageDependenciesChanged(oldFiles[path], content)) {
                  pkgChanged = true;
                }
              }
            }
          }

          for (const path of Object.keys(oldFiles)) {
            if (!(path in runtimeFiles)) {
              await webcontainerManager.deleteFile(path);
            }
          }

          prevFiles.current = runtimeFiles;

          if (pkgChanged) {
            setLogs(prev => prev + '\r\n> Dependencies changed, running npm install...\r\n');
            setIsBooting(true);
            setBootPhase('installing');
            const installExitCode = await webcontainerManager.runCommand('npm', ['install'], (data) => {
              setLogs(prev => prev + data);
            });
            if (installExitCode === 0) {
              setLogs(prev => prev + '> npm install completed.\r\n');
            }
            setIsBooting(false);
            setBootPhase('ready');
          }
        }

      } catch (err) {
        if (!isCancelled) {
          setLogs(prev => prev + `\r\n[ERROR] ${err.message}\r\n`);
          setIsBooting(false);
          setBootPhase('error');
        }
      }
    };

    applyFilesAndBoot();

    return () => {
      isCancelled = true;
    };
  }, [files]);

  // Sync selected file content
  useEffect(() => {
    let cleanPath = selectedFile.startsWith('/') ? selectedFile.slice(1) : selectedFile;
    if (files[cleanPath]) {
      setActiveCode(files[cleanPath]);
    } else if (files['index.html']) {
      setSelectedFile('index.html');
      setActiveCode(files['index.html']);
    } else {
      const firstFile = Object.keys(files)[0];
      if (firstFile) {
        setSelectedFile(firstFile);
        setActiveCode(files[firstFile]);
      } else {
        setActiveCode('/* File not found or empty */');
      }
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
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md text-zinc-300">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                      <div className="relative mb-6 mx-auto w-16 h-16">
                        <div className="w-16 h-16 border-4 border-zinc-800 border-t-sky-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sky-400 font-bold text-xl">
                          {bootPhase === 'booting' && '1'}
                          {bootPhase === 'installing' && '2'}
                          {bootPhase === 'starting' && '3'}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Preparing Environment</h3>
                      <div className="space-y-3 mt-6 text-left">
                        <div className="flex items-center gap-3 text-sm">
                          {bootPhase !== 'booting' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 border-2 border-zinc-600 border-t-sky-500 rounded-full animate-spin" />}
                          <span className={bootPhase !== 'booting' ? 'text-zinc-500' : 'text-zinc-200'}>Booting WebContainer Engine...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          {bootPhase === 'starting' || bootPhase === 'ready' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : bootPhase === 'installing' ? <div className="w-4 h-4 border-2 border-zinc-600 border-t-sky-500 rounded-full animate-spin" /> : <CircleDashed className="w-4 h-4 text-zinc-700" />}
                          <span className={bootPhase === 'installing' ? 'text-zinc-200' : 'text-zinc-500'}>Installing dependencies...</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          {bootPhase === 'ready' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : bootPhase === 'starting' ? <div className="w-4 h-4 border-2 border-zinc-600 border-t-sky-500 rounded-full animate-spin" /> : <CircleDashed className="w-4 h-4 text-zinc-700" />}
                          <span className={bootPhase === 'starting' ? 'text-zinc-200' : 'text-zinc-500'}>Starting Dev Server...</span>
                        </div>
                      </div>
                    </div>
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
