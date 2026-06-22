import { useState, useCallback } from 'react';
import { normalizeApiBaseUrl } from '../lib/urlHelpers';

// Use Vite proxy in dev (relative path), fall back to env var for production
const API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com');

export function useGenerate() {
  const [code, setCode]       = useState(''); // For backward compatibility/edits
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [statusText, setStatusText] = useState('');
  const [generationId, setGenerationId] = useState(0);
  const [plan, setPlan] = useState(null);
  const [timelineStep, setTimelineStep] = useState('');
  const [variations, setVariations] = useState({}); // { varId: { plan, code, status, timelineStep } }

  const generate = useCallback(async (prompt, currentCode = null) => {
    setLoading(true);
    setError('');
    setCode('');
    setPlan(null);
    setTimelineStep('');
    setVariations({});
    setStatusText('Generating layout code...');
    setGenerationId(prev => prev + 1);

    try {
      const response = await fetch(`${API_BASE}/stream-jsx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, current_code: currentCode }),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}: ${response.statusText}`);
      }

      const reader  = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullCodeAccumulator = '';
      let done   = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;

        buffer += decoder.decode(value, { stream: true });

        // Split on newlines — SSE uses \n\n between events
        const lines = buffer.split('\n');
        // Keep the last (possibly incomplete) chunk in the buffer
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const payload = trimmed.slice(6).trim();

          if (payload === '[DONE]') {
            done = true;   // signal outer while to stop
            try {
              // Extract JSON and log files
              let cleaned = fullCodeAccumulator.trim();
              cleaned = cleaned.replace(/^```(?:json|jsx|javascript|js|react|tsx|ts)?\s*\n?/i, '');
              cleaned = cleaned.replace(/\n?```\s*$/, '');
              const startIdx = cleaned.indexOf('{');
              const endIdx = cleaned.lastIndexOf('}');
              if (startIdx !== -1 && endIdx !== -1) {
                const parsedFull = JSON.parse(cleaned.substring(startIdx, endIdx + 1));
              }
            } catch (e) {
            }
            break;
          }

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              setError(parsed.error);
              done = true;
              break;
            }
            
            const vid = parsed.variation_id;
            
            if (parsed.type === "plans") {
                const initialVars = {};
                parsed.plans.forEach(p => {
                    const id = p.id;
                    initialVars[id] = { plan: p, code: '', status: 'waiting', timelineStep: '' };
                });
                setVariations(initialVars);
            }
            if (parsed.type === "fallback") {
              setStatusText(parsed.message || "Using backup AI model...");
              if (vid) {
                  setVariations(prev => ({
                      ...prev,
                      [vid]: { ...prev[vid], code: '' }
                  }));
              } else {
                  fullCodeAccumulator = "";
                  setCode("");
              }
            }
            if (parsed.type === "emergency") {
              setError(parsed.message || "AI providers are temporarily busy.");
              done = true;
              break;
            }
            if (parsed.type === "timeline") {
              if (vid) {
                  setVariations(prev => ({ ...prev, [vid]: { ...prev[vid], timelineStep: parsed.step } }));
              } else {
                  setTimelineStep(parsed.step);
              }
            }
            if (parsed.type === "plan") {
              setPlan(parsed.plan);
            }
            if (parsed.status) {
              if (parsed.status === "building") {
                setStatusText("Building and verifying...");
              } else if (parsed.status === "fixing") {
                setStatusText(`Fixing build error in ${parsed.file || 'unknown'} (Attempt ${parsed.attempt}/10)...`);
              } else if (parsed.status === "fallback_restart") {
                setStatusText("Primary AI model is busy. Switching to backup model...");
                if (vid) {
                    setVariations(prev => ({
                        ...prev,
                        [vid]: { ...prev[vid], code: '' }
                    }));
                } else {
                    fullCodeAccumulator = "";
                    setCode("");
                }
              }
            }
            if (parsed.chunk) {
              if (vid) {
                  setVariations(prev => ({
                      ...prev,
                      [vid]: {
                          ...prev[vid],
                          code: (prev[vid]?.code || '') + parsed.chunk,
                          status: 'generating'
                      }
                  }));
              } else {
                  fullCodeAccumulator += parsed.chunk;
                  setCode(prev => prev + parsed.chunk);
              }
            }
            if (parsed.type === "variation_complete") {
              if (vid) {
                  setVariations(prev => ({
                      ...prev,
                      [vid]: {
                          ...prev[vid],
                          status: 'complete'
                      }
                  }));
                  // Fire save-files for this variation to build it in sandbox
                  // We get the latest code from React state, wait, we can't reliably read state in SSE loop.
                  // But the code accumulates in fullCodeAccumulator? No, fullCodeAccumulator isn't per-variation!
                  // We should fire save-files from a useEffect in Home.jsx when a variation hits 'complete'.
              }
            }
          } catch {
            // Silently skip malformed SSE lines
          }
        }
      }

    } catch (err) {
      console.error('Stream failed:', err);
      setError(err.message || 'Streaming failed — check that the backend is running.');
    } finally {
      setLoading(false);
      setStatusText('');
    }
  }, []);

  const fix = useCallback(async (brokenCode, errorMessage) => {
    setLoading(true);
    setError('');
    // Intentionally not clearing code here, so we keep the old code until the fix stream starts
    setStatusText('Analyzing and fixing runtime error...');
    setGenerationId(prev => prev + 1);

    try {
      const response = await fetch(`${API_BASE}/fix-jsx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ broken_code: brokenCode, error: errorMessage }),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}: ${response.statusText}`);
      }

      const reader  = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullCodeAccumulator = '';
      let done   = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const payload = trimmed.slice(6).trim();

          if (payload === '[DONE]') {
            done = true;
            // The fixed code is just a single component string, not full JSON.
            // Wait, the fix endpoint returns a chunk of the repaired component.
            // If the backend returns just the component, how does Home.jsx integrate it?
            // Home.jsx needs to know WHEN it's done. We can resolve a promise.
            break;
          }

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              setError(parsed.error);
              done = true;
              break;
            }
            
            const vid = parsed.variation_id;
            
            if (parsed.type === "plans") {
                const initialVars = {};
                parsed.plans.forEach(p => {
                    const id = p.id;
                    initialVars[id] = { plan: p, code: '', status: 'waiting', timelineStep: '' };
                });
                setVariations(initialVars);
            }
            if (parsed.type === "fallback") {
              setStatusText(parsed.message || "Using backup AI model...");
              if (vid) {
                  setVariations(prev => ({
                      ...prev,
                      [vid]: { ...prev[vid], code: '' }
                  }));
              } else {
                  fullCodeAccumulator = "";
                  setCode("");
              }
            }
            if (parsed.type === "emergency") {
              setError(parsed.message || "AI providers are temporarily busy.");
              done = true;
              break;
            }
            if (parsed.type === "timeline") {
              if (vid) {
                  setVariations(prev => ({ ...prev, [vid]: { ...prev[vid], timelineStep: parsed.step } }));
              } else {
                  setTimelineStep(parsed.step);
              }
            }
            if (parsed.type === "plan") {
              setPlan(parsed.plan);
            }
            if (parsed.status) {
              if (parsed.status === "building") {
                setStatusText("Building and verifying...");
              } else if (parsed.status === "fixing") {
                setStatusText(`Fixing build error in ${parsed.file || 'unknown'} (Attempt ${parsed.attempt}/10)...`);
              } else if (parsed.status === "fallback_restart") {
                setStatusText("Primary AI model is busy. Switching to backup model...");
                if (vid) {
                    setVariations(prev => ({
                        ...prev,
                        [vid]: { ...prev[vid], code: '' }
                    }));
                } else {
                    fullCodeAccumulator = "";
                    setCode("");
                }
              }
            }
            if (parsed.chunk) {
              if (vid) {
                  setVariations(prev => ({
                      ...prev,
                      [vid]: {
                          ...prev[vid],
                          code: (prev[vid]?.code || '') + parsed.chunk,
                          status: 'generating'
                      }
                  }));
              } else {
                  fullCodeAccumulator += parsed.chunk;
                  setCode(prev => prev + parsed.chunk);
              }
            }
            if (parsed.type === "variation_complete") {
              if (vid) {
                  setVariations(prev => ({
                      ...prev,
                      [vid]: {
                          ...prev[vid],
                          status: 'complete'
                      }
                  }));
                  // Fire save-files for this variation to build it in sandbox
                  // We get the latest code from React state, wait, we can't reliably read state in SSE loop.
                  // But the code accumulates in fullCodeAccumulator? No, fullCodeAccumulator isn't per-variation!
                  // We should fire save-files from a useEffect in Home.jsx when a variation hits 'complete'.
              }
            }
          } catch {
            // Silently skip malformed SSE lines
          }
        }
      }

      return fullCodeAccumulator;
    } catch (err) {
      console.error('Fix stream failed:', err);
      setError(err.message || 'Auto-fix failed.');
      return null;
    } finally {
      setLoading(false);
      setStatusText('');
    }
  }, []);

  return { code, setCode, generate, fix, loading, error, statusText, generationId, plan, timelineStep, variations, setVariations };
}
