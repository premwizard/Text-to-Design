import { useState, useCallback } from 'react';
import { normalizeApiBaseUrl } from '../lib/urlHelpers';

// Use Vite proxy in dev (relative path), fall back to env var for production
let API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com');
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  API_BASE = 'http://localhost:5173';
}

export function useGenerate() {
  const [code, setCode]       = useState(''); // For backward compatibility/edits
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [statusText, setStatusText] = useState('');
  const [generationId, setGenerationId] = useState(0);
  const [plan, setPlan] = useState(null);
  const [timelineStep, setTimelineStep] = useState('');
  const [variations, setVariations] = useState({}); // { varId: { plan, code, status, timelineStep } }
  const [agentStatus, setAgentStatus] = useState('idle');
  const [sessionId, setSessionId] = useState('');
  const [agentOutputs, setAgentOutputs] = useState({
    memory: null,
    understanding: null,
    retrieval: null,
    planning: null,
    critic: null,
    optimizing: null,
    edit_planning: null,
    intent_classification: null,
    patch_generation: null,
    render: null,
    screenshot: null,
    vision: null,
    vision_recheck: null,
    final_update: null
  });

  const generate = useCallback(async (prompt, currentCode = null, userId = null, generationMode = 'single_mode', variationCount = 1) => {
    setLoading(true);
    setError('');
    setCode('');
    setPlan(null);
    setTimelineStep('');
    setVariations({});
    setAgentStatus('idle');
    setAgentOutputs({
      memory: null,
      understanding: null,
      retrieval: null,
      planning: null,
      critic: null,
      optimizing: null,
      edit_planning: null,
      intent_classification: null,
      patch_generation: null,
      render: null,
      screenshot: null,
      vision: null,
      vision_recheck: null,
      final_update: null
    });
    setStatusText('Generating layout code...');
    setGenerationId(prev => prev + 1);

    try {
      const response = await fetch(`${API_BASE}/stream-jsx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          current_code: currentCode, 
          user_id: userId,
          generation_mode: generationMode,
          variation_count: variationCount
        }),
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
            if (parsed.type === "agent_start") {
              setAgentStatus(parsed.agent);
              setStatusText(parsed.message || `Running ${parsed.agent} agent...`);
            }
            if (parsed.type === "agent_complete") {
              setAgentOutputs(prev => ({ ...prev, [parsed.agent]: parsed.output }));
            }
            if (parsed.type === "agent_timeline") {
              setStatusText(parsed.message || parsed.step);
            }
            if (parsed.type === "final_code") {
              setCode(parsed.code);
              fullCodeAccumulator = parsed.code;
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
            if (parsed.type === "session_created") {
              setSessionId(parsed.session_id);
            }
            if (parsed.status) {
              if (parsed.status === "building") {
                setStatusText("Building and verifying...");
              } else if (parsed.status === "fixing") {
                setStatusText(`Fixing build error in ${parsed.file || 'unknown'} (Attempt ${parsed.attempt}/10)...`);
              }
            }
            if (parsed.chunk) {
              fullCodeAccumulator += parsed.chunk;
              setCode(prev => prev + parsed.chunk);
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

  const editUI = useCallback(async (userId, sessionId, editPrompt, currentCode, designMetadata = null) => {
    setLoading(true);
    setError('');
    setTimelineStep('');
    setAgentStatus('idle');
    setAgentOutputs({
      memory: null,
      understanding: null,
      retrieval: null,
      planning: null,
      critic: null,
      optimizing: null,
      edit_planning: null,
      intent_classification: null,
      patch_generation: null,
      render: null,
      screenshot: null,
      vision: null,
      vision_recheck: null,
      final_update: null
    });
    setStatusText('Classifying design edits...');
    setGenerationId(prev => prev + 1);

    try {
      const response = await fetch(`${API_BASE}/edit-ui`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          session_id: sessionId,
          edit_prompt: editPrompt,
          current_code: currentCode,
          design_metadata: designMetadata
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}: ${response.statusText}`);
      }

      const reader  = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let done = false;

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
            break;
          }

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              setError(parsed.error);
              done = true;
              break;
            }
            if (parsed.type === "agent_start") {
              setAgentStatus(parsed.agent);
              setStatusText(parsed.message || `Executing ${parsed.agent}...`);
            }
            if (parsed.type === "agent_complete") {
              setAgentOutputs(prev => ({ ...prev, [parsed.agent]: parsed.output }));
            }
            if (parsed.type === "timeline") {
              setTimelineStep(parsed.step);
            }
            if (parsed.type === "final_code") {
              setCode(parsed.code);
            }
          } catch {
            // Silently skip malformed SSE lines
          }
        }
      }

    } catch (err) {
      console.error('Edit stream failed:', err);
      setError(err.message || 'Edit streaming failed.');
    } finally {
      setLoading(false);
      setStatusText('');
    }
  }, []);

  const fix = useCallback(async (brokenCode, errorMessage) => {
    setLoading(true);
    setError('');
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
            break;
          }

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              setError(parsed.error);
              done = true;
              break;
            }
            if (parsed.chunk) {
              fullCodeAccumulator += parsed.chunk;
              setCode(prev => prev + parsed.chunk);
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

  return { code, setCode, generate, editUI, fix, loading, error, statusText, generationId, plan, timelineStep, variations, setVariations, agentStatus, setAgentStatus, agentOutputs, setAgentOutputs, sessionId, setSessionId };
}
