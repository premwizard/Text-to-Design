import React, { useState, useMemo } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';

// Basic regex-based syntax highlighter for JS/JSX
function highlightCode(code) {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Keywords
  html = html.replace(/\b(import|export|from|default|function|const|let|var|return|if|else|for|while|try|catch|class|extends|async|await)\b/g, '<span class="text-pink-400 font-semibold">$1</span>');
  // Strings
  html = html.replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="text-amber-300">$1</span>');
  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="text-violet-300">$1</span>');
  // Components/Tags
  html = html.replace(/&lt;([A-Z][a-zA-Z0-9]*)/g, '&lt;<span class="text-emerald-400">$1</span>');
  html = html.replace(/&lt;(\/?[a-z][a-zA-Z0-9]*)/g, '&lt;<span class="text-sky-400">$1</span>');
  // Comments
  html = html.replace(/(\/\/.*)/g, '<span class="text-zinc-500 italic">$1</span>');
  
  return html;
}

export function FileViewer({ filename, content }) {
  const [copied, setCopied] = useState(false);

  const highlightedLines = useMemo(() => {
    if (!content) return [];
    return content.split('\n').map(line => highlightCode(line));
  }, [content]);

  if (!filename || !content) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1117] text-zinc-500 font-mono text-sm border-r border-zinc-800/50">
        <FileCode size={48} className="opacity-20 mb-4" />
        <p>Select a file to view its contents</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] border-r border-zinc-800/50 overflow-hidden">
      {/* Tab Header */}
      <div className="h-10 bg-[#161b22] border-b border-zinc-800 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-sky-400" />
          <span className="text-xs font-mono text-zinc-300">{filename}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition"
          title="Copy File Content"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto bg-[#0d1117] py-4 text-xs font-mono leading-relaxed">
        <div className="flex flex-col min-w-max">
          {highlightedLines.map((lineHtml, i) => (
            <div key={i} className="flex group hover:bg-[#161b22]/50">
              <div className="w-12 shrink-0 text-right pr-4 text-zinc-600 select-none group-hover:text-zinc-400">
                {i + 1}
              </div>
              <div 
                className="text-zinc-300 whitespace-pre pr-4"
                dangerouslySetInnerHTML={{ __html: lineHtml || ' ' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
