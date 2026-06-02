import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const steps = [
  { num: "01", title: "Describe Idea", desc: "Write a prompt detailing your desired application." },
  { num: "02", title: "AI Planning", desc: "Our models architect the component structure." },
  { num: "03", title: "Generate Code", desc: "React and Tailwind code is synthesized instantly." },
  { num: "04", title: "Live Preview", desc: "Interact with the generated app in the browser." },
  { num: "05", title: "Export", desc: "Download the source code and deploy." }
];

export function HowItWorks() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { 
          scaleX: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );

      // Node pop-ins
      gsap.fromTo('.step-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={containerRef} className="w-full py-32 px-6 overflow-hidden bg-transparent">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">How It Works</h2>
          <p className="text-zinc-400 text-xl font-medium">From natural language to production code in 5 simple steps.</p>
        </div>

        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800/50 -translate-y-1/2 hidden md:block" />
          
          {/* Animated Fill Line */}
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 origin-left -translate-y-1/2 hidden md:block shadow-[0_0_20px_rgba(56,189,248,0.5)]" 
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="step-node flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#09090b]/80 backdrop-blur-xl border border-zinc-700 text-2xl font-bold flex items-center justify-center mb-8 shadow-2xl relative transition-all duration-500 hover:border-sky-400 hover:text-sky-400 hover:scale-110">
                  {step.num}
                  {/* Subtle pulse behind the node */}
                  <div className="absolute inset-0 rounded-2xl bg-sky-500/20 blur-xl -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-3">{step.title}</h3>
                <p className="text-base text-zinc-400 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
