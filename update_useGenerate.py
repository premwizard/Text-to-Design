import re
import os

filepath = 'client/src/hooks/useGenerate.js'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# Add variations state
state_old = """  const [code, setCode]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [statusText, setStatusText] = useState('');
  const [generationId, setGenerationId] = useState(0);
  const [plan, setPlan] = useState(null);
  const [timelineStep, setTimelineStep] = useState('');"""

state_new = """  const [code, setCode]       = useState(''); // For backward compatibility/edits
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [statusText, setStatusText] = useState('');
  const [generationId, setGenerationId] = useState(0);
  const [plan, setPlan] = useState(null);
  const [timelineStep, setTimelineStep] = useState('');
  const [variations, setVariations] = useState({}); // { varId: { plan, code, status, timelineStep } }"""

code = code.replace(state_old, state_new)

# Reset state in generate
reset_old = """    setLoading(true);
    setError('');
    setCode('');
    setPlan(null);
    setTimelineStep('');
    setStatusText('Generating layout code...');
    setGenerationId(prev => prev + 1);"""

reset_new = """    setLoading(true);
    setError('');
    setCode('');
    setPlan(null);
    setTimelineStep('');
    setVariations({});
    setStatusText('Generating layout code...');
    setGenerationId(prev => prev + 1);"""

code = code.replace(reset_old, reset_new)

# SSE parsing block
parse_old = """            if parsed.type === "fallback") {
              setStatusText(parsed.message || "Using backup AI model...");
              fullCodeAccumulator = "";
              setCode("");
            }
            if (parsed.type === "timeline") {
              setTimelineStep(parsed.step);
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
                fullCodeAccumulator = "";
                setCode("");
              }
            }
            if (parsed.chunk) {
              fullCodeAccumulator += parsed.chunk;
              setCode(prev => prev + parsed.chunk);
            }"""

# I need to match the whole try catch block to be safe. Let's do a regex replacement for the try catch block.
# Actually I'll just write a script to replace the try catch inside SSE.

search_pattern = r'          try {\n            const parsed = JSON\.parse\(payload\);.*?          } catch \{\n            // Silently skip malformed SSE lines\n          \}'
new_try = """          try {
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
              fullCodeAccumulator = "";
              setCode("");
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
                fullCodeAccumulator = "";
                setCode("");
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
          }"""

code = re.sub(search_pattern, new_try, code, flags=re.DOTALL)

# Update return statement
ret_old = "return { code, setCode, generate, fix, loading, error, statusText, generationId, plan, timelineStep };"
ret_new = "return { code, setCode, generate, fix, loading, error, statusText, generationId, plan, timelineStep, variations, setVariations };"
code = code.replace(ret_old, ret_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)
print("Updated useGenerate.js")
