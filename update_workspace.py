import re

filepath = 'client/src/components/workspace/WorkspacePanel.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the panel sizes to 10/30/60
size_old = """          {/* Panel 1: Project Explorer */}
          <Panel defaultSize={20} minSize={15}>
            <ProjectExplorer 
              files={files} 
              selectedFile={selectedFile} 
              onSelectFile={handleSelectFile} 
            />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-sky-500/50 transition-colors cursor-col-resize" />

          {/* Panel 2: File Viewer */}
          <Panel defaultSize={35} minSize={20}>
            <FileViewer 
              filename={selectedFile} 
              content={files ? files[selectedFile] : null} 
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-sky-500/50 transition-colors cursor-col-resize" />

          {/* Panel 3: Live Preview */}
          <Panel defaultSize={45} minSize={30}>"""

size_new = """          {/* Panel 1: Project Explorer (10%) */}
          <Panel defaultSize={15} minSize={10} collapsible>
            <div className="h-full border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl">
              <ProjectExplorer 
                files={files} 
                selectedFile={selectedFile} 
                onSelectFile={handleSelectFile} 
              />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-1.5 bg-transparent hover:bg-violet-500/50 transition-colors cursor-col-resize flex items-center justify-center">
            <div className="w-0.5 h-8 bg-zinc-700 rounded-full" />
          </PanelResizeHandle>

          {/* Panel 2: File Viewer / Code (30%) */}
          <Panel defaultSize={30} minSize={20}>
            <div className="h-full border-r border-white/5 bg-[#0a0a0c] backdrop-blur-xl shadow-2xl relative">
              {/* Fake Tab Bar */}
              <div className="flex items-center h-10 border-b border-white/5 px-2 bg-zinc-950/50">
                <div className="px-4 py-1.5 bg-white/5 text-zinc-100 text-xs font-semibold rounded-t-md border-b-2 border-violet-500 flex items-center gap-2">
                  <span className="text-violet-400">{'< >'}</span> Code
                </div>
                <div className="px-4 py-1.5 text-zinc-500 hover:text-zinc-300 text-xs font-semibold cursor-pointer flex items-center gap-2">
                  <span className="text-emerald-400/70">§</span> Design Plan
                </div>
              </div>
              <div className="h-[calc(100%-40px)]">
                <FileViewer 
                  filename={selectedFile} 
                  content={files ? files[selectedFile] : null} 
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-transparent hover:bg-violet-500/50 transition-colors cursor-col-resize flex items-center justify-center">
            <div className="w-0.5 h-8 bg-zinc-700 rounded-full" />
          </PanelResizeHandle>

          {/* Panel 3: Live Preview (55%) */}
          <Panel defaultSize={55} minSize={40}>"""
          
code = code.replace(size_old, size_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)
print("Updated WorkspacePanel.jsx")
