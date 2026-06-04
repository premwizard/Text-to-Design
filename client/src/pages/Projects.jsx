import React from 'react';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';

export default function Projects() {
  return (
    <div className="h-screen w-screen bg-app text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
      <AnimatedBackground />
      <TopNav projectName="My Projects" />
      <div className="flex-1 flex overflow-hidden relative z-10">
        <LeftSidebar />
        <div className="flex-1 overflow-y-auto p-8 bg-black/20 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-white mb-6">Your Projects</h1>
            <div className="p-12 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center">
              <p className="text-zinc-400 mb-4">You haven't saved any projects yet.</p>
              <button className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
                Create New Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
