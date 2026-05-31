import { useState, useCallback } from 'react';

// Use Vite proxy in dev (relative path), fall back to env var for production
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export function useGenerate() {
  const [code, setCode]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const generate = useCallback(async (prompt, currentCode = null) => {
    setLoading(true);
    setError('');
    setCode('');

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
    }
  }, []);

  return { code, setCode, generate, loading, error };
}
