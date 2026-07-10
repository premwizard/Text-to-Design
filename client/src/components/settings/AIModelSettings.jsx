/* eslint-disable no-unused-vars, no-empty, no-self-assign */
import React, { useState } from 'react';
import { Bot, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'gemini', status: 'online' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'gemini', status: 'online' },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'groq', status: 'online' },
  { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', provider: 'groq', status: 'rate-limited' },
];

export function AIModelSettings() {
  const [provider, setProvider] = useState('gemini');
  const [primary, setPrimary] = useState('gemini-2.5-flash');
  const [fallback, setFallback] = useState('llama-3.3-70b');
  const [testing, setTesting] = useState(false);

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => setTesting(false), 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">AI Models</h2>
        <p className="text-sm text-zinc-400">Configure your LLM providers and fallbacks.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-6">
        
        {/* Provider Selection */}
        <div>
          <label className="text-sm font-semibold text-white mb-3 block">Active Provider</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="provider" 
                checked={provider === 'gemini'} 
                onChange={() => setProvider('gemini')}
                className="w-4 h-4 text-violet-500 bg-zinc-800 border-zinc-700 focus:ring-violet-500 focus:ring-2"
              />
              <span className="text-sm text-zinc-300">Google Gemini</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="provider" 
                checked={provider === 'groq'} 
                onChange={() => setProvider('groq')}
                className="w-4 h-4 text-violet-500 bg-zinc-800 border-zinc-700 focus:ring-violet-500 focus:ring-2"
              />
              <span className="text-sm text-zinc-300">Groq Fast AI</span>
            </label>
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* Primary Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white block">Primary Model</label>
            <div className="relative">
              <select 
                value={primary}
                onChange={e => setPrimary(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                {MODELS.map(m => <option key={m.id} value={m.id} className="bg-zinc-900">{m.name}</option>)}
              </select>
            </div>
            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs text-emerald-400 font-medium tracking-wide">Online</span>
            </div>
          </div>

          {/* Fallback Model */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white block">Fallback Model</label>
            <div className="relative">
              <select 
                value={fallback}
                onChange={e => setFallback(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                {MODELS.map(m => <option key={m.id} value={m.id} className="bg-zinc-900">{m.name}</option>)}
              </select>
            </div>
            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs text-emerald-400 font-medium tracking-wide">Online</span>
            </div>
          </div>
        </div>

        {/* Test Connection */}
        <div className="pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-3 text-sm">
            <Bot size={20} className="text-violet-400" />
            <span className="text-zinc-300">API Connection Status</span>
          </div>
          <button 
            onClick={handleTest}
            disabled={testing}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            {testing ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <PlayCircle size={16} />
            )}
            {testing ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

      </div>
    </div>
  );
}
