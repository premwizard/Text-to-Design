import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Code2, Wand2, Zap, LayoutDashboard, MonitorPlay, Settings2 } from 'lucide-react';

const features = [
  {
    title: "Instant React Generation",
    description: "Write a prompt, get production-ready React components instantly.",
    icon: <Code2 className="text-sky-400" size={56} />,
    span: "col-span-1 md:col-span-2 row-span-2",
    parallax: -10
  },
  {
    title: "Tailwind CSS Styling",
    description: "Pixel-perfect designs using native Tailwind utility classes.",
    icon: <Wand2 className="text-indigo-400" size={56} />,
    span: "col-span-1 row-span-1",
    parallax: 20
  },
  {
    title: "Self-Healing AI Pipeline",
    description: "Auto-detects and fixes JSX runtime errors on the fly.",
    icon: <Zap className="text-amber-400" size={56} />,
    span: "col-span-1 row-span-1",
    parallax: -20
  },
  {
    title: "Live Interactive Preview",
    description: "Test your generated apps directly in the browser.",
    icon: <MonitorPlay className="text-emerald-400" size={56} />,
    span: "col-span-1 md:col-span-2 row-span-1",
    parallax: 10
  },
  {
    title: "Modular Components",
    description: "Smart code splitting into reusable React components.",
    icon: <LayoutDashboard className="text-pink-400" size={56} />,
    span: "col-span-1 row-span-2",
    parallax: -15
  },
  {
    title: "Customizable Design Systems",
    description: "Define your own brand colors, fonts, and spacing.",
    icon: <Settings2 className="text-violet-400" size={56} />,
    span: "col-span-1 md:col-span-2 row-span-1",
    parallax: 15
  }
];

export function CapabilitiesBento() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo('.bento-item', 
        { y: 100, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Parallax Depth Animation
      const cards = gsap.utils.toArray('.bento-item');
      cards.forEach((card, index) => {
        gsap.to(card, {
          yPercent: features[index].parallax,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="w-full py-32 px-6">
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Everything You Need. <span className="text-zinc-600">Zero Setup.</span></h2>
        <p className="text-zinc-400 text-xl font-medium">A complete toolkit for modern frontend development, supercharged by AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6 max-w-[1400px] mx-auto">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className={`bento-item group relative bg-[#09090b]/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-10 flex flex-col justify-between overflow-hidden hover:border-zinc-600 transition-colors shadow-2xl ${feature.span}`}
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-6 relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">{feature.title}</h3>
              <p className="text-lg text-zinc-400 font-medium leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
