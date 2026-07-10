import React, { useState, useEffect } from 'react';

export function CodePanel({ code, onChange }) {
  const [activeFile, setActiveFile] = useState('App.jsx');
  
  // Parse files from code JSON
  let files = null;
  let parseError = false;
  try {
    if (code && code.trim()) {
      let cleanedCode = code.trim();
      // Strip markdown code fences if present
      cleanedCode = cleanedCode.replace(/^```(?:json|jsx|js)?\s*\n?/i, '');
      cleanedCode = cleanedCode.replace(/\n?```\s*$/, '');
      cleanedCode = cleanedCode.trim();
      
      if (cleanedCode.startsWith('{')) {
        const parsed = JSON.parse(cleanedCode);
        if (parsed && parsed.files) {
          files = parsed.files;
        }
      }
    }
  } catch (e) /* eslint-disable-line no-unused-vars */ {
    parseError = true;
  }

  // Reset active file if files change and current activeFile is not in keys
  useEffect(() => {
    if (files && !files[activeFile]) {
      const keys = Object.keys(files);
      if (keys.length > 0) {
        if (files['App.jsx']) {
          setActiveFile('App.jsx');
        } else {
          setActiveFile(keys[0]);
        }
      }
    }
  }, [files, activeFile]);

  const handleCopy = () => {
    const contentToCopy = files ? files[activeFile] : code;
    if (!contentToCopy) return;
    navigator.clipboard.writeText(contentToCopy);
    alert(`${activeFile || 'Code'} copied to clipboard!`);
  };

  const handleTextareaChange = (e) => {
    const newVal = e.target.value;
    if (files) {
      // Construct new files object
      const updatedFiles = {
        ...files,
        [activeFile]: newVal
      };
      // Trigger onChange with serialized JSON
      onChange(JSON.stringify({ files: updatedFiles }, null, 2));
    } else {
      onChange(newVal);
    }
  };

  const fileKeys = files ? Object.keys(files) : [];

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden font-mono text-xs shadow-2xl">
      <div className="h-10 px-4 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
          <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest">
            {files ? `editing: ${activeFile}` : 'jsx source editor'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-zinc-900 rounded border border-zinc-800"
        >
          Copy Code
        </button>
      </div>
      
      {/* File tabs */}
      {files && fileKeys.length > 0 && (
        <div className="flex border-b border-zinc-900 bg-zinc-950 overflow-x-auto select-none scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {fileKeys.map((filename) => (
            <button
              key={filename}
              onClick={() => setActiveFile(filename)}
              className={`px-4 py-2.5 border-r border-zinc-900 text-[10px] font-semibold transition shrink-0 ${
                activeFile === filename 
                  ? 'bg-[#050506] text-sky-400 border-t-2 border-t-sky-500' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
              }`}
            >
              {filename}
            </button>
          ))}
        </div>
      )}
      
      <textarea
        value={files ? (files[activeFile] || '') : (code || '')}
        onChange={handleTextareaChange}
        className="flex-1 bg-[#050506] text-emerald-450 p-5 outline-none resize-none overflow-y-auto leading-relaxed border-none focus:ring-0 selection:bg-sky-500/20"
        style={{ 
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          tabSize: 2
        }}
        placeholder={files ? "// Select a file to view/edit..." : "// Code will be streamed here..."}
      />
    </div>
  );
}

export default CodePanel;
