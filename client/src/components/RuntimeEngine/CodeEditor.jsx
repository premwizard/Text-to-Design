import React from 'react';
import Editor from '@monaco-editor/react';

export function CodeEditor({ file, content, onChange }) {
  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500">
        <p className="text-sm">Select a file to edit</p>
      </div>
    );
  }

  const extension = file.split('.').pop();
  let language = 'javascript';
  if (extension === 'json') language = 'json';
  else if (extension === 'css') language = 'css';
  else if (extension === 'html') language = 'html';
  else if (extension === 'md') language = 'markdown';
  else if (extension === 'ts' || extension === 'tsx') language = 'typescript';

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col">
      <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 text-xs font-mono text-zinc-300">
        {file}
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={content}
          onChange={(val) => onChange(file, val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 16 }
          }}
        />
      </div>
    </div>
  );
}
