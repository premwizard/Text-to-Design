import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, File, Search, Copy, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function parseFilesToTree(files) {
  const root = { name: 'root', type: 'folder', children: {}, path: '' };
  
  if (!files) return root;

  for (const [filepath, content] of Object.entries(files)) {
    const parts = filepath.split('/');
    let current = root;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          type: isFile ? 'file' : 'folder',
          path: parts.slice(0, i + 1).join('/'),
          children: isFile ? null : {},
          content: isFile ? content : null
        };
      }
      current = current.children[part];
    }
  }
  
  return root;
}

function filterTree(node, query) {
  if (node.type === 'file') {
    return node.name.toLowerCase().includes(query.toLowerCase()) ? node : null;
  }
  
  const filteredChildren = {};
  let hasMatch = false;
  
  for (const [key, child] of Object.entries(node.children)) {
    const filteredChild = filterTree(child, query);
    if (filteredChild) {
      filteredChildren[key] = filteredChild;
      hasMatch = true;
    }
  }
  
  if (hasMatch || node.name.toLowerCase().includes(query.toLowerCase())) {
    return { ...node, children: filteredChildren };
  }
  
  return null;
}

const TreeNode = ({ node, level, expandedFolders, toggleFolder, selectedFile, onSelectFile, onContextMenu }) => {
  const isExpanded = expandedFolders.has(node.path);
  const isSelected = selectedFile === node.path;
  
  if (node.type === 'file') {
    return (
      <div 
        className={`flex items-center gap-1.5 px-2 py-1 cursor-pointer transition-colors select-none ${
          isSelected ? 'bg-sky-500/15 text-sky-300 border-r-2 border-sky-400' : 'text-zinc-400 hover:bg-[#161b22] hover:text-zinc-200'
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => onSelectFile(node.path, node.content)}
        onContextMenu={(e) => onContextMenu(e, node)}
      >
        <File size={14} className={isSelected ? "text-sky-400" : "text-zinc-500"} />
        <span className="text-xs truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="flex items-center gap-1 px-2 py-1 cursor-pointer text-zinc-300 hover:bg-[#161b22] select-none"
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        onClick={() => toggleFolder(node.path)}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        <Folder size={14} className="text-amber-400/80" />
        <span className="text-xs truncate">{node.name}</span>
      </div>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {Object.values(node.children).sort((a, b) => {
              if (a.type === b.type) return a.name.localeCompare(b.name);
              return a.type === 'folder' ? -1 : 1;
            }).map(child => (
              <TreeNode 
                key={child.path}
                node={child}
                level={level + 1}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
                onContextMenu={onContextMenu}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function ProjectExplorer({ files, selectedFile, onSelectFile }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persist expanded folders
  const [expandedFolders, setExpandedFolders] = useState(() => {
    try {
      const saved = localStorage.getItem('project_explorer_expanded');
      return saved ? new Set(JSON.parse(saved)) : new Set(['src', 'src/components', 'components']);
    } catch {
      return new Set();
    }
  });

  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    localStorage.setItem('project_explorer_expanded', JSON.stringify(Array.from(expandedFolders)));
  }, [expandedFolders]);

  const tree = useMemo(() => parseFilesToTree(files), [files]);
  
  const filteredTree = useMemo(() => {
    if (!searchQuery) return tree;
    return filterTree(tree, searchQuery) || { name: 'root', type: 'folder', children: {}, path: '' };
  }, [tree, searchQuery]);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleContextMenu = (e, node) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      node
    });
  };

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const handleCopyPath = () => {
    if (contextMenu) navigator.clipboard.writeText(contextMenu.node.path);
  };

  const handleCopyContent = () => {
    if (contextMenu && contextMenu.node.type === 'file') {
      navigator.clipboard.writeText(contextMenu.node.content);
    }
  };

  // Expand folders automatically when searching
  useEffect(() => {
    if (searchQuery) {
      const pathsToExpand = new Set();
      const traverse = (node) => {
        if (node.type === 'folder') {
          pathsToExpand.add(node.path);
          Object.values(node.children).forEach(traverse);
        }
      };
      traverse(filteredTree);
      setExpandedFolders(prev => new Set([...prev, ...pathsToExpand]));
    }
  }, [searchQuery, filteredTree]);

  // Derived metadata for bottom panel
  const metadata = useMemo(() => {
    if (!selectedFile || !files || !files[selectedFile]) return null;
    const content = files[selectedFile];
    const lines = content.split('\n').length;
    const size = new Blob([content]).size;
    const kb = (size / 1024).toFixed(1);
    const ext = selectedFile.split('.').pop().toUpperCase() || 'FILE';
    return { name: selectedFile.split('/').pop(), lines, kb, ext };
  }, [selectedFile, files]);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] border-r border-zinc-800/50">
      <div className="h-10 px-4 bg-[#161b22] border-b border-zinc-800 flex items-center shrink-0">
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">Explorer</span>
      </div>
      
      <div className="p-2 border-b border-zinc-800/50">
        <div className="relative">
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#161b22] border border-zinc-700/50 rounded-md py-1.5 pl-8 pr-3 text-xs text-zinc-300 outline-none focus:border-sky-500/50 transition-colors placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-zinc-700">
        {Object.values(filteredTree.children).sort((a, b) => {
           if (a.type === b.type) return a.name.localeCompare(b.name);
           return a.type === 'folder' ? -1 : 1;
        }).map(child => (
          <TreeNode 
            key={child.path}
            node={child}
            level={0}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            selectedFile={selectedFile}
            onSelectFile={onSelectFile}
            onContextMenu={handleContextMenu}
          />
        ))}
        {Object.keys(filteredTree.children).length === 0 && (
          <div className="px-4 py-8 text-center text-zinc-600 text-xs">
            No files found
          </div>
        )}
      </div>

      {/* Metadata Panel */}
      {metadata && (
        <div className="p-3 bg-[#161b22] border-t border-zinc-800 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <FileJson size={14} className="text-sky-400" />
            <span className="text-xs font-bold text-zinc-200">{metadata.name}</span>
          </div>
          <div className="text-[10px] text-zinc-500 flex items-center gap-2">
            <span>{metadata.ext}</span>
            <span>&bull;</span>
            <span>{metadata.lines} lines</span>
            <span>&bull;</span>
            <span>{metadata.kb} KB</span>
          </div>
        </div>
      )}

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 bg-[#161b22] border border-zinc-700 shadow-2xl rounded-md py-1 min-w-[160px]"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <div className="px-3 py-1.5 text-xs text-zinc-500 font-semibold mb-1 border-b border-zinc-800">
              {contextMenu.node.name}
            </div>
            {contextMenu.node.type === 'file' && (
              <button 
                onClick={handleCopyContent}
                className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-sky-500 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Copy size={12} /> Copy Content
              </button>
            )}
            <button 
              onClick={handleCopyPath}
              className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-sky-500 hover:text-white flex items-center gap-2 transition-colors"
            >
              <File size={12} /> Copy Path
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
