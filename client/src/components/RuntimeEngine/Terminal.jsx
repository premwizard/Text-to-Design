import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export function Terminal({ logs }) {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm
    const term = new XTerm({
      theme: {
        background: '#09090b', // zinc-950
        foreground: '#e4e4e7', // zinc-200
        cursor: '#38bdf8', // sky-400
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 12,
      convertEol: true,
      cursorBlink: true,
    });
    
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    
    // Use requestAnimationFrame to ensure the DOM has settled before fitting
    requestAnimationFrame(() => {
      try {
        if (terminalRef.current && terminalRef.current.clientWidth > 0) {
          fitAddon.fit();
        }
      } catch (e) {
        console.warn("xterm initial fit failed", e);
      }
    });
    
    xtermRef.current = term;

    // Use ResizeObserver instead of window resize event to catch panel resizing
    const resizeObserver = new ResizeObserver(() => {
      try {
        if (terminalRef.current && terminalRef.current.clientWidth > 0 && terminalRef.current.clientHeight > 0) {
          fitAddon.fit();
        }
      } catch (e) {
        // ignore resize errors if container is hidden or too small
      }
    });
    
    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  // Write incoming logs to terminal
  useEffect(() => {
    if (xtermRef.current && logs) {
      xtermRef.current.write(logs);
    }
  }, [logs]);

  return (
    <div className="w-full h-full bg-zinc-950 p-2 overflow-hidden flex flex-col">
      <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider px-2">Terminal</div>
      <div ref={terminalRef} className="flex-1 w-full h-full" />
    </div>
  );
}
