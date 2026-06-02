import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function InteractiveDemo() {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const codeLinesRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pinning and entering animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(leftPanelRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(rightPanelRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Typing simulation on scroll
      gsap.fromTo(codeLinesRef.current,
        { width: "0%" },
        { 
          width: "100%", 
          duration: 0.5, 
          stagger: 0.2, 
          ease: "steps(12)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
          }
        }
      );

      // Parallax mock browser
      gsap.to(rightPanelRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="demo" ref={containerRef} className="w-full py-32 px-6 relative z-10 max-w-[1600px] mx-auto">
      
      <div className="text-center mb-24 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">From Prompt to Production</h2>
        <p className="text-zinc-400 text-xl font-medium">Watch our AI generate a complete dashboard layout in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Prompt Panel */}
        <div ref={leftPanelRef} className="lg:col-span-4 bg-[#09090b]/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-500 transform origin-left transition-transform duration-1000 group-hover:scale-x-100" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-950/80 p-5 rounded-xl border border-zinc-800/50 text-base font-mono text-zinc-300 shadow-inner">
              <span className="text-sky-400">Prompt:</span> Create a modern SaaS dashboard with a sidebar, realtime charts, and a user activity log. Use dark theme.
            </div>
            <button className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-6 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Generate UI
            </button>
          </div>
        </div>

        {/* Right: Code / Preview Panel */}
        <div ref={rightPanelRef} className="lg:col-span-8 bg-[#09090b]/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl h-[600px] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          {/* Mock Browser Header */}
          <div className="bg-zinc-900/80 border-b border-zinc-800 px-4 py-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>
            <div className="flex-1 bg-zinc-800/50 rounded-md text-center py-1 text-xs text-zinc-500 font-mono flex items-center justify-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              localhost:5173
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 relative flex flex-col md:flex-row gap-6">
            
            {/* Fake Code Stream */}
            <div className="flex-1 font-mono text-xs md:text-sm text-zinc-400 space-y-2 opacity-50 relative">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0c0e] z-10 pointer-events-none" />
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[0] = el}>import React from 'react';</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[1] = el}>import &#123; Sidebar, Header, Chart &#125; from './components';</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[2] = el}><br/></div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[3] = el}>export default function Dashboard() &#123;</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[4] = el}>&nbsp;&nbsp;return (</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[5] = el}>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="flex h-screen bg-zinc-950"&gt;</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[6] = el}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Sidebar /&gt;</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[7] = el}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="flex-1 flex flex-col"&gt;</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[8] = el}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Header /&gt;</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[9] = el}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;main className="p-6"&gt;</div>
               <div className="whitespace-nowrap overflow-hidden" ref={el => codeLinesRef.current[10] = el}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Chart data=&#123;realtimeData&#125; /&gt;</div>
            </div>

            {/* Fake Rendered UI Overlaying */}
            <div className="absolute inset-4 md:right-4 md:left-auto md:w-1/2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-[fade-in_2s_ease-out_1.5s_both]">
               <div className="h-12 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-950/50">
                 <div className="w-24 h-4 bg-zinc-800 rounded-full" />
                 <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-sky-500 rounded-full" />
                 </div>
               </div>
               <div className="flex-1 p-4 flex gap-4">
                 <div className="w-16 h-full bg-zinc-800/50 rounded-lg" />
                 <div className="flex-1 flex flex-col gap-4">
                   <div className="flex gap-4">
                     <div className="h-24 flex-1 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-lg border border-zinc-800/50" />
                     <div className="h-24 flex-1 bg-zinc-800/50 rounded-lg border border-zinc-800/50" />
                   </div>
                   <div className="flex-1 bg-zinc-800/30 rounded-lg border border-zinc-800/50 relative overflow-hidden">
                     <svg className="absolute bottom-0 w-full h-full text-sky-500/20 preserve-aspect-ratio-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                       <path d="M0 100 L 0 50 Q 25 20 50 60 T 100 30 L 100 100 Z" fill="currentColor" />
                     </svg>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
