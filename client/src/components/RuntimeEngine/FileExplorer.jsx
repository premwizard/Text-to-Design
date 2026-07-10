import React, { useMemo, useState } from 'react';
import { ChevronRight, ChevronDown, FileCode2, FileJson, File, Folder } from 'lucide-react';

function getFileIcon(filename) {
  if (filename.endsWith('.jsx') || filename.endsWith('.tsx') || filename.endsWith('.js') || filename.endsWith('.ts')) {
    return <FileCode2 className="w-4 h-4 text-sky-400" />;
  }
  if (filename.endsWith('.json')) {
    return <FileJson className="w-4 h-4 text-emerald-400" />;
  }
  return <File className="w-4 h-4 text-zinc-400" />;
}

export function FileExplorer({ files, onFileSelect, selectedFile }) {
  const [expandedFolders, setExpandedFolders] = useState({ '/': true, 'src': true, 'components': true });

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  // Convert flat files dictionary to nested tree for rendering
  const tree = useMemo(() => {
    const root = { name: '/', type: 'folder', children: {}, path: '/' };
    Object.keys(files).sort().forEach(filepath => {
      const cleanPath = filepath.startsWith('/') ? filepath.slice(1) : filepath;
      const parts = cleanPath.split('/');
      let current = root;
      
      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const currentPath = parts.slice(0, index + 1).join('/');
        
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            type: isFile ? 'file' : 'folder',
            path: currentPath,
            children: {}
          };
        }
        current = current.children[part];
      });
    });
    return root;
  }, [files]);

  const renderTree = (node, level = 0) => {
    const sortedChildren = Object.values(node.children).sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'folder' ? -1 : 1;
    });

    return sortedChildren.map(child => {
      const isExpanded = expandedFolders[child.path] !== false;
      const isSelected = selectedFile === child.path || selectedFile === `/${child.path}`;
      
      if (child.type === 'folder') {
        return (
          <div key={child.path} className="w-full select-none">
            <div 
              className="flex items-center px-2 py-1 hover:bg-zinc-800 cursor-pointer text-zinc-300 text-sm"
              style={{ paddingLeft: \`\${level * 12 + 8}px\` }}
              onClick={() => toggleFolder(child.path)}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4 mr-1 opacity-70" /> : <ChevronRight className="w-4 h-4 mr-1 opacity-70" />}
              <Folder className="w-4 h-4 text-amber-400 mr-2" />
              <span className="truncate">{child.name}</span>
            </div>
            {isExpanded && child.children && (
              <div className="w-full">
                {renderTree(child, level + 1)}
              </div>
            )}
          </div>
        );
      }

      return (
        <div 
          key={child.path}
          className={\`flex items-center px-2 py-1 cursor-pointer text-sm transition-colors \${isSelected ? 'bg-sky-500/20 text-sky-300' : 'hover:bg-zinc-800 text-zinc-400'}\`}
          style={{ paddingLeft: \`\${level * 12 + 28}px\` }}
          onClick={() => onFileSelect(child.path)}
        >
          <span className="mr-2">{getFileIcon(child.name)}</span>
          <span className="truncate">{child.name}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full bg-[#0a0a0c] border-r border-zinc-800 flex flex-col overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Explorer</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-zinc-700">
        {renderTree(tree)}
      </div>
    </div>
  );
}
