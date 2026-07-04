import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  CircleDashed,
  LayoutTemplate,
  Palette,
  Type,
  Layers,
  ChevronRight,
  Sparkles,
  Component,
  AlertTriangle,
  Terminal,
  Cpu,
  Award,
  Settings,
  Check,
  RefreshCw,
  Search,
  Database,
  Sliders,
  UserCheck,
  Image,
  Eye,
  Tablet,
  Smartphone,
  Monitor,
  TrendingUp,
  History
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { normalizeApiBaseUrl } from '../../lib/urlHelpers';

let API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL || 'https://text-to-design.onrender.com');
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  API_BASE = 'http://localhost:5173';
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const GENERATE_STEPS = [
  { id: 'memory', label: 'Memory Retrieval', desc: 'Loading personalized design profile and user preferences' },
  { id: 'understanding', label: 'Understanding Prompt', desc: 'Analyzing intent and blending design memory' },
  { id: 'retrieval', label: 'Retrieving Design', desc: 'Searching Design Knowledge Base for matched layouts' },
  { id: 'planning', label: 'Planning Design', desc: 'Structuring layout architecture and styling system' },
  { id: 'generating', label: 'Generating Components', desc: 'Creating React + Tailwind layout component-by-component' },
  { id: 'critic', label: 'Reviewing UI', desc: 'Evaluating visual quality, hierarchy, and usability metrics' },
  { id: 'optimizing', label: 'Optimizing Design', desc: 'Applying design edits, enhancing colors and interactions' }
];

const EDIT_STEPS = [
  { id: 'edit_planning', label: 'Edit Prompt Analysis', desc: 'Parsing conversational layout changes' },
  { id: 'intent_classification', label: 'Intent Classification', desc: 'Determining update class and planning files' },
  { id: 'patch_generation', label: 'JSX Patch Generation', desc: 'Applying minimal edits to component files' },
  { id: 'render', label: 'Sandbox Re-render', desc: 'Writing changes and building web preview' },
  { id: 'final_update', label: 'Final Update', desc: 'Committing project files snapshot' }
];

export function DesignPlanPanel({ plan, timelineStep, agentStatus = 'idle', agentOutputs = {} }) {
  const [debugMode, setDebugMode] = useState(false);
  const [activeDebugTab, setActiveDebugTab] = useState('memory');
  const [timestamp, setTimestamp] = useState(Date.now());
  const [adkMetrics, setAdkMetrics] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${API_BASE}/adk-metrics`);
        if (response.ok && active) {
          const data = await response.json();
          setAdkMetrics(data);
        }
      } catch (err) {
        console.error("Failed to fetch ADK metrics:", err);
      }
    };
    
    fetchMetrics();
    let timer;
    if (agentStatus !== 'idle') {
      timer = setInterval(fetchMetrics, 15000);
    }
    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, [agentStatus]);

  // Force cache-busting on screenshots when new agent status outputs occur
  useEffect(() => {
    setTimestamp(Date.now());
  }, [agentStatus, agentOutputs.screenshot]);

  // Detect active mode: generation vs edit
  const isEditMode = [
    'edit_planning', 'intent_classification', 'patch_generation', 
    'render', 'final_update'
  ].includes(agentStatus) || agentOutputs.edit_planning !== null;

  const stepsList = isEditMode ? EDIT_STEPS : GENERATE_STEPS;

  // Map backend agentStatus to step index
  const getStepIndex = (status) => {
    if (isEditMode) {
      switch (status) {
        case 'edit_planning': return 0;
        case 'intent_classification': return 1;
        case 'patch_generation': return 2;
        case 'render': return 3;
        case 'final_update': return 4;
        case 'done': return 5;
        default: return 0;
      }
    } else {
      switch (status) {
        case 'memory': return 0;
        case 'understanding': return 1;
        case 'retrieval': return 2;
        case 'planning': return 3;
        case 'generating': return 4;
        case 'critic': return 5;
        case 'optimizing': return 6;
        case 'done': return 7;
        default: return 0;
      }
    }
  };

  const currentStepIdx = getStepIndex(agentStatus);

  const getAgentStepStatus = (stepId, index) => {
    if (currentStepIdx > index) return 'completed';
    if (agentStatus === stepId) return 'active';
    return 'pending';
  };

  const renderJSON = (data) => {
    if (!data) return 'Waiting for agent execution...';
    return JSON.stringify(data, null, 2);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-[#08080a] text-zinc-150 overflow-hidden min-w-[500px] h-full font-sans select-text">
      {/* LEFT SIDEBAR: Pipeline Step Indicators */}
      <div className="w-full lg:w-96 border-r border-zinc-800/80 bg-zinc-950/60 p-6 flex flex-col shrink-0 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Cpu className="text-violet-400 w-5 h-5 animate-pulse" />
            <h2 className="font-semibold tracking-tight text-zinc-100 text-xs uppercase tracking-wider">
              {isEditMode ? 'UI Edit Pipeline' : 'RAG Multi-Agent Pipeline'}
            </h2>
          </div>
          
          <button
            onClick={() => setDebugMode(!debugMode)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
              debugMode 
                ? "bg-violet-500/10 border-violet-500/40 text-violet-400 shadow-md shadow-violet-500/5" 
                : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
            )}
          >
            <Terminal size={12} />
            Debug Mode
          </button>
        </div>

        {/* Steps Pipeline */}
        <div className="relative flex-1">
          <div className="absolute top-4 bottom-8 left-[11px] w-px bg-zinc-800/80" />
          
          <div className="space-y-8 relative">
            {stepsList.map((step, idx) => {
              const status = getAgentStepStatus(step.id, idx);
              
              return (
                <div key={step.id} className="flex gap-4 relative group">
                  <div className="relative flex items-center justify-center shrink-0 z-10 mt-0.5">
                    {status === 'completed' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/10">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    ) : status === 'active' ? (
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center ring-1 ring-violet-500/60 relative shadow-lg shadow-violet-500/10">
                        <div className="absolute inset-0 rounded-full border border-violet-400 border-t-transparent animate-spin" />
                        <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-zinc-900/60 flex items-center justify-center ring-1 ring-zinc-850">
                        <CircleDashed className="w-3.5 h-3.5 text-zinc-650" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <p className={cn(
                      "text-sm font-semibold transition-colors duration-300",
                      status === 'completed' ? "text-zinc-400" :
                      status === 'active' ? "text-violet-300 font-bold" : "text-zinc-650"
                    )}>
                      {step.label}
                    </p>
                    <p className={cn(
                      "text-xs mt-1 transition-colors duration-300",
                      status === 'active' ? "text-zinc-400" : "text-zinc-600 font-medium"
                    )}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT WORKSPACE DISPLAY */}
      <div className="flex-1 overflow-y-auto relative bg-[#09090b]">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-[#09090b] pointer-events-none" />
        
        <div className="relative z-10 p-8 max-w-5xl mx-auto min-h-full flex flex-col justify-center">
          
          {debugMode ? (
            /* ==========================================
               DEBUG DASHBOARD (RAW AGENT MESSAGES)
               ========================================== */
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col h-[650px] bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden text-left"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/40">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-violet-400" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Orchestration Logs</span>
                </div>
                <span className="text-[10px] bg-violet-500/10 border border-violet-500/30 text-violet-400 px-2.5 py-0.5 rounded-full font-bold">
                  DEBUGGING ACTIVE
                </span>
              </div>

              {/* Debug Tab Selectors */}
              <div className="flex border-b border-zinc-800/60 bg-zinc-950/20 px-4 overflow-x-auto whitespace-nowrap">
                {stepsList.map(step => (
                  <button
                    key={step.id}
                    onClick={() => setActiveDebugTab(step.id)}
                    className={cn(
                      "px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer inline-block",
                      activeDebugTab === step.id 
                        ? "border-violet-500 text-violet-300 font-bold bg-white/5" 
                        : "border-transparent text-zinc-550 hover:text-zinc-300"
                    )}
                  >
                    {step.label.split(' ')[0]} Agent
                  </button>
                ))}
              </div>

              {/* JSON Log Viewer */}
              <div className="flex-1 p-6 font-mono text-xs text-zinc-400 overflow-auto bg-black/40">
                <pre className="whitespace-pre-wrap leading-relaxed select-text">
                  {renderJSON(agentOutputs[activeDebugTab])}
                </pre>
              </div>
            </motion.div>
          ) : (
            /* ==========================================
               VISUAL DASHBOARDS (CREATIVE STATE RENDER)
               ========================================== */
            <>
              {/* ADK Observability Dashboard Card */}
              <div className="w-full mb-8 p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center relative">
                    <Cpu className="text-violet-400 w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] bg-violet-500/15 border border-violet-500/30 text-violet-300 px-2.5 py-0.5 rounded-full font-bold">
                      ADK ROUTED FLOW: {isEditMode ? 'EDIT PIPELINE' : 'GENERATION PIPELINE'}
                    </span>
                    <h3 className="text-base font-bold text-zinc-150 mt-1">
                      Active Agent: <span className="text-violet-300 font-mono font-semibold">{agentStatus !== 'idle' ? `${agentStatus.charAt(0).toUpperCase() + agentStatus.slice(1)}ADKAgent` : 'None (Idle)'}</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Active Tool: <span className="font-mono text-sky-400 font-semibold">{
                        agentStatus === 'memory' || agentStatus === 'retrieval' ? 'ChromaTool' :
                        agentStatus === 'generating' ? 'FileWriterTool' :
                        agentStatus === 'render' ? 'CompilerTool' :
                        agentStatus === 'patch_generation' ? 'JSXValidatorTool' :
                        agentStatus === 'final_update' ? 'HistoryManagerTool' : 'None'
                      }</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <div className="px-4 py-2 bg-zinc-950/60 border border-zinc-850 rounded-xl text-left">
                    <div className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">Vite Compile Success</div>
                    <div className="text-zinc-200 mt-0.5 font-bold font-mono text-sm">{adkMetrics?.compileSuccessRate || '90.0'}%</div>
                  </div>
                  <div className="px-4 py-2 bg-zinc-950/60 border border-zinc-850 rounded-xl text-left">
                    <div className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">Vision Score Avg</div>
                    <div className="text-zinc-200 mt-0.5 font-bold font-mono text-sm">{adkMetrics?.averageVisionScore || '8.5'}/10</div>
                  </div>
                  <div className="px-4 py-2 bg-zinc-950/60 border border-zinc-850 rounded-xl text-left">
                    <div className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold">Prompt Accuracy</div>
                    <div className="text-zinc-200 mt-0.5 font-bold font-mono text-sm">{adkMetrics?.promptAccuracy || '90.0'}%</div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
              
              {/* EDIT MODE STATE 1: EDIT PROMPT ANALYSIS */}
              {(isEditMode && (agentStatus === 'edit_planning' || agentStatus === 'intent_classification')) && (
                <motion.div 
                  key="edit_planning"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6 text-left max-w-xl mx-auto"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                    <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                      <Sliders className="w-5 h-5 text-violet-400 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Conversational Edit Planning</h2>
                      <p className="text-xs text-zinc-550">Analyzing style update instructions and code structure</p>
                    </div>
                  </div>

                  <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl shadow-xl space-y-4">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Classified Update Mode</span>
                    <h3 className="text-lg font-bold text-zinc-200 capitalize">
                      {agentOutputs.intent_classification?.editType?.replace('_', ' ') || 'ux_improvement'}
                    </h3>
                    <div className="space-y-2">
                      <span className="text-[10px] text-zinc-550 uppercase tracking-widest font-semibold block">Target Component Patches</span>
                      <div className="flex flex-wrap gap-2.5">
                        {agentOutputs.intent_classification?.affected?.map((c, i) => (
                          <span key={i} className="text-xs bg-zinc-950/60 border border-zinc-850 px-3 py-1 rounded-lg text-zinc-400 font-semibold">{c}</span>
                        )) || <span className="text-xs text-zinc-650 font-semibold">Scanning files list...</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* EDIT MODE STATE 2: JSX PATCH GENERATION & SANDBOX RE-RENDER */}
              {(isEditMode && (agentStatus === 'patch_generation' || agentStatus === 'render')) && (
                <motion.div 
                  key="patching"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-850 flex items-center justify-center shadow-2xl relative overflow-hidden ring-1 ring-violet-500/20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent" />
                    <Settings className="w-8 h-8 text-violet-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-100">Patching JSX Layout Code</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                      Modifying only the affected components and compiling preview HTML in sandbox.
                    </p>
                  </div>
                  <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-violet-500 rounded-full" style={{ animation: 'progressBar 1.5s ease-in-out infinite' }} />
                  </div>
                </motion.div>
              )}

              {/* EDIT MODE STATE 3: VISION RECHECK */}
              {(isEditMode && (agentStatus === 'vision_recheck' || agentStatus === 'final_update' || (agentOutputs.vision_recheck && currentStepIdx === 5))) && (
                <motion.div 
                  key="vision_recheck"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8 text-left w-full"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Vision Recheck & Score Delta</h2>
                      <p className="text-xs text-zinc-500 mt-0.5 font-medium">Re-evaluating visual layouts and tracking quality score improvements</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Score comparison card */}
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Rating Score Improvement</span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-4xl font-extrabold text-white">{agentOutputs.vision_recheck?.afterScore || '8.5'}</span>
                        <span className="text-xs text-zinc-550">before: {agentOutputs.vision_recheck?.beforeScore || '8.3'}</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-xl w-fit">
                        <TrendingUp size={14} /> 
                        {agentOutputs.vision_recheck?.improvementDelta >= 0 ? '+' : ''}
                        {agentOutputs.vision_recheck?.improvementDelta || '0.2'} Improvement Delta
                      </div>
                    </div>

                    {/* Sub dimensions */}
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-3.5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Visual Dimensions</span>
                      <div className="space-y-2">
                        {agentOutputs.vision_recheck?.scores && Object.entries(agentOutputs.vision_recheck.scores).map(([metric, val], idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs font-semibold text-zinc-400 capitalize">
                            <span>{metric}</span>
                            <span className="text-indigo-400 font-mono">{val}/10</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Remaining visual issues */}
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-3.5">
                      <span className="text-[10px] text-zinc-550 uppercase tracking-widest font-bold block">Remaining Anomaly Checks</span>
                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {agentOutputs.vision_recheck?.issues && agentOutputs.vision_recheck.issues.length > 0 ? (
                          agentOutputs.vision_recheck.issues.map((issue, idx) => (
                            <div key={idx} className="flex gap-2 text-[10px] text-zinc-400 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850">
                              <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                              <span className="font-semibold">{issue}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-zinc-650 font-semibold py-8 text-center">All layout defects resolved successfully!</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {agentStatus === 'vision_recheck' && (
                    <div className="flex items-center gap-3 justify-center text-zinc-500 text-sm font-medium mt-12 bg-zinc-950/40 py-3 rounded-xl border border-zinc-900 w-fit mx-auto px-6">
                      <RefreshCw className="w-4 h-4 text-violet-400 animate-spin" />
                      <span>Rechecking layout alignments...</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* GENERATE MODE STATE 1: USER MEMORY RETRIEVAL */}
              {(!isEditMode && (agentStatus === 'memory' || (agentOutputs.memory && currentStepIdx === 0))) && (
                <motion.div 
                  key="memory"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                    <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                      <UserCheck className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Personalization Memory Retrieval</h2>
                      <p className="text-xs text-zinc-500 mt-0.5 font-medium">Searching statistical profile and semantic past interactions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-3">
                      <span className="text-[10px] text-violet-400 uppercase tracking-widest font-bold block">Statistical Theme</span>
                      <h4 className="text-sm font-semibold text-zinc-200 capitalize">{agentOutputs.memory?.theme || "Default Theme"}</h4>
                      <p className="text-xs text-zinc-650 font-medium">Layout: {agentOutputs.memory?.layoutPattern?.replace(/-/g, ' ') || "Default"}</p>
                    </div>
                    
                    <div className="col-span-2 bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-3">
                      <span className="text-[10px] text-sky-400 uppercase tracking-widest font-bold block">Semantic Match History</span>
                      <div className="space-y-2 max-h-28 overflow-y-auto">
                        {agentOutputs.memory?.semanticMatches && agentOutputs.memory.semanticMatches.length > 0 ? (
                          agentOutputs.memory.semanticMatches.map((m, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850">
                              <span className="text-zinc-400 truncate w-72">Prompt: "{m.prompt}"</span>
                              <span className="text-emerald-400 font-semibold font-mono">{(m.score * 100).toFixed(0)}% Similarity</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-zinc-650 font-medium">No similar past generations found.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {agentStatus === 'memory' && (
                    <div className="flex items-center gap-3 justify-center text-zinc-500 text-sm font-medium mt-12 bg-zinc-950/40 py-3 rounded-xl border border-zinc-900 w-fit mx-auto px-6">
                      <RefreshCw className="w-4 h-4 text-violet-400 animate-spin" />
                      <span>Retrieving design memory...</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* GENERATE MODE STATE 2: UNDERSTANDING */}
              {(!isEditMode && agentStatus === 'understanding') && (
                <motion.div 
                  key="understanding"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-850 flex items-center justify-center shadow-2xl relative overflow-hidden ring-1 ring-violet-500/20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent" />
                    <Sparkles className="w-8 h-8 text-violet-400 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-100">Analyzing User Intent</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                      Decoding natural language, detecting project domains, and blending design memory.
                    </p>
                  </div>
                  <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-violet-500 rounded-full" style={{ animation: 'progressBar 1.5s ease-in-out infinite' }} />
                  </div>
                </motion.div>
              )}

              {/* GENERATE MODE STATE 3: RAG RETRIEVAL */}
              {(!isEditMode && (agentStatus === 'retrieval' || (agentOutputs.retrieval && currentStepIdx === 2))) && (
                <motion.div 
                  key="retrieval"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8 text-left w-full"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                    <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                      <Database className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Hybrid Design Retrieval (JSON + ChromaDB)</h2>
                      <p className="text-xs text-zinc-500 mt-0.5 font-medium">Combining structural templates (40%) and semantic similarity embeddings (60%)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-4">
                      <h3 className="text-xs font-bold text-zinc-350 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-violet-400" /> Rule-Based Matches (JSON)
                      </h3>
                      <div className="space-y-2.5 max-h-48 overflow-y-auto">
                        {agentOutputs.retrieval?.jsonMatches && agentOutputs.retrieval.jsonMatches.map((pat, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850 font-medium">
                            <span className="text-zinc-400 truncate w-32">{pat.id}</span>
                            <span className="text-violet-400 font-semibold font-mono">{(pat.score * 100).toFixed(0)}% Score</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-4">
                      <h3 className="text-xs font-bold text-zinc-350 flex items-center gap-2">
                        <Search className="w-4 h-4 text-sky-400" /> Semantic Matches (ChromaDB)
                      </h3>
                      <div className="space-y-2.5 max-h-48 overflow-y-auto">
                        {agentOutputs.retrieval?.semanticMatches && agentOutputs.retrieval.semanticMatches.map((pat, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850 font-medium">
                            <span className="text-zinc-400 truncate w-32">{pat.id}</span>
                            <span className="text-sky-400 font-semibold font-mono">{(pat.score * 100).toFixed(0)}% Score</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-4">
                      <h3 className="text-xs font-bold text-zinc-350 flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" /> Final Merged Ranking
                      </h3>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {agentOutputs.retrieval?.finalResults && agentOutputs.retrieval.finalResults.map((pat, idx) => (
                          <div key={idx} className="space-y-1.5 bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-850/60">
                            <div className="flex justify-between items-center text-[10px] font-semibold">
                              <span className="text-zinc-300 truncate w-32">{pat.id}</span>
                              <span className="text-emerald-400 font-mono">{(pat.final_score * 100).toFixed(0)}% Match</span>
                            </div>
                            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pat.final_score * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {agentStatus === 'retrieval' && (
                    <div className="flex items-center gap-3 justify-center text-zinc-500 text-sm font-medium mt-12 bg-zinc-950/40 py-3 rounded-xl border border-zinc-900 w-fit mx-auto px-6">
                      <RefreshCw className="w-4 h-4 text-violet-400 animate-spin" />
                      <span>Retrieving design system blueprints...</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* GENERATE MODE STATE 4: DESIGN PLANNING */}
              {(!isEditMode && (agentStatus === 'planning' || (agentOutputs.planning && currentStepIdx === 3))) && (
                <motion.div 
                  key="planning"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80 text-left">
                    <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                      <Palette className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Design Specifications Formulated</h2>
                      <p className="text-xs text-zinc-500 mt-0.5 font-medium">Parameters synthesized by the Prompt Understanding Agent</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                      <span className="text-[10px] text-violet-400 uppercase tracking-widest font-bold block mb-1">Architecture</span>
                      <h4 className="text-sm font-semibold text-zinc-300 capitalize">{agentOutputs.understanding?.pageType || "Landing Page"}</h4>
                      <p className="text-xs text-zinc-650 mt-1 font-medium">Industry: {agentOutputs.understanding?.industry || "Tech"}</p>
                    </div>
                    
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                      <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Visual Theme</span>
                      <h4 className="text-sm font-semibold text-zinc-300 capitalize">{agentOutputs.understanding?.theme || "Premium Dark"}</h4>
                      <p className="text-xs text-zinc-650 mt-1 font-medium">Style: {agentOutputs.understanding?.style?.visualStyle || "Modern"}</p>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                      <span className="text-[10px] text-sky-400 uppercase tracking-widest font-bold block mb-1">Structure Style</span>
                      <h4 className="text-sm font-semibold text-zinc-300 capitalize">Borders: {agentOutputs.understanding?.style?.borderRadius || "Large"}</h4>
                      <p className="text-xs text-zinc-650 mt-1 font-medium">Spacing: {agentOutputs.understanding?.style?.spacing || "Comfortable"}</p>
                    </div>
                  </div>

                  {agentStatus === 'planning' && (
                    <div className="flex items-center gap-3 justify-center text-zinc-500 text-sm font-medium mt-12 bg-zinc-950/40 py-3 rounded-xl border border-zinc-900 w-fit mx-auto px-6">
                      <RefreshCw className="w-4.5 h-4.5 text-violet-400 animate-spin" />
                      <span>Planning grid layout layout maps...</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* GENERATE MODE STATE 5: COMPONENT GENERATION */}
              {(!isEditMode && (agentStatus === 'generating' || (agentOutputs.planning && currentStepIdx === 4))) && (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-xl">
                        <LayoutTemplate className="w-5 h-5 text-sky-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-zinc-100">{plan?.product_name || "App Layout"} Setup</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">{plan?.tagline}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-550">Theme: {plan?.aesthetic}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-4">
                      <h3 className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-violet-400" /> Theme Configuration
                      </h3>
                      <div className="space-y-2 text-xs text-zinc-400 font-medium">
                        <div className="flex justify-between py-1 border-b border-zinc-850">
                          <span>Font Heading</span>
                          <span className="text-zinc-300">{plan?.font_heading}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-850">
                          <span>Font Body</span>
                          <span className="text-zinc-300">{plan?.font_body}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-850">
                          <span>Theme Primary</span>
                          <span className="text-zinc-300 font-mono text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded border border-violet-500/10">{plan?.primary_color}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 shadow-xl space-y-4">
                      <h3 className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                        <Component className="w-4 h-4 text-sky-400" /> Planned Components
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {plan?.sections && plan.sections.map((section, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-zinc-950/60 border border-zinc-850 p-2.5 rounded-xl">
                            <div className="w-4 h-4 rounded-full bg-violet-500/10 ring-1 ring-violet-500/20 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping" />
                            </div>
                            <span className="text-xs font-semibold text-zinc-400">components/{section}.jsx</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-center text-zinc-400 text-sm font-semibold mt-8 bg-zinc-900 border border-zinc-850 py-4.5 rounded-2xl w-full">
                    <RefreshCw className="w-4.5 h-4.5 text-sky-400 animate-spin" />
                    <span>Streaming layout components live... Preview updates instantly.</span>
                  </div>
                </motion.div>
              )}



              {/* GENERATE MODE STATE 8: UI CRITIC */}
              {(!isEditMode && (agentStatus === 'critic' || (agentOutputs.critic && currentStepIdx === 7))) && (
                <motion.div 
                  key="critic_shared"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Hybrid UI Critic Evaluation</h2>
                      <p className="text-xs text-zinc-500 mt-0.5">Automated code review of layout syntax and styling consistency</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl space-y-4">
                      <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Quality Score</span>
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="54" className="stroke-zinc-800" strokeWidth="8" fill="transparent" />
                          <circle cx="64" cy="64" r="54" className="stroke-amber-500" strokeWidth="8" fill="transparent"
                            strokeDasharray={2 * Math.PI * 54}
                            strokeDashoffset={2 * Math.PI * 54 * (1 - (agentOutputs.critic?.score || 8.0) / 10)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-4xl font-extrabold text-white font-display">
                          {agentOutputs.critic?.score || '8.2'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 tracking-wider">HARMONIC RATING</span>
                    </div>

                    <div className="col-span-2 bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" /> Merged Critique Issues
                        </h3>
                        <div className="space-y-2.5 max-h-40 overflow-y-auto">
                          {agentOutputs.critic?.issues && agentOutputs.critic.issues.map((issue, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start text-xs text-zinc-400 bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-850">
                              <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                              <span className="font-medium">{issue}</span>
                            </div>
                          ))}
                          {!agentOutputs.critic?.issues && (
                            <p className="text-xs text-zinc-650 font-medium">Running critic reports...</p>
                          )}
                        </div>
                      </div>

                      {agentStatus === 'critic' && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 bg-zinc-950 border border-zinc-850 px-4 py-2 rounded-xl w-fit">
                          <RefreshCw size={12} className="animate-spin text-amber-500" />
                          Analyzing layouts...
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* GENERATE MODE STATE 9: OPTIMIZING DESIGN */}
              {(!isEditMode && (agentStatus === 'optimizing' || agentStatus === 'done')) && (
                <motion.div 
                  key="optimizing"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-850 flex items-center justify-center shadow-2xl relative overflow-hidden ring-1 ring-emerald-500/20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
                    <Settings className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-100">Applying Optimizations</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                      Polishing visual alignment, fixing spacing concerns, adding micro-interactions, and preparing preview compilation.
                    </p>
                  </div>
                  <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full" style={{ animation: 'progressBar 1.5s ease-in-out infinite' }} />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </>
        )}

        </div>
      </div>
      
      <style>{`
        @keyframes progressBar {
          0%   { transform: scaleX(0);   transform-origin: left; }
          50%  { transform: scaleX(0.7); transform-origin: left; }
          100% { transform: scaleX(1);   transform-origin: left; }
        }
      `}</style>
    </div>
  );
}
export default DesignPlanPanel;
