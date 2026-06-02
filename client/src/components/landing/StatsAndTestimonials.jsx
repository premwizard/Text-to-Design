import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  { text: "This literally saved me 40 hours of frontend work this week.", author: "Sarah J.", role: "Full Stack Engineer" },
  { text: "The code quality is indistinguishable from a senior React dev.", author: "Mike T.", role: "CTO @ TechFlow" },
  { text: "I can't believe it handles Tailwind classes so perfectly.", author: "Elena R.", role: "UI/UX Designer" },
  { text: "The auto-healing feature is absolute black magic.", author: "David K.", role: "Indie Hacker" },
  { text: "This is exactly what v0 and Lovable should have been.", author: "Alex M.", role: "Founding Engineer" }
];

export function StatsAndTestimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Counter animation
      const counters = gsap.utils.toArray('.counter-val');
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          },
          onUpdate: function() {
            counter.innerHTML = Math.ceil(this.targets()[0].innerHTML).toLocaleString();
          }
        });
      });

      // Infinite Marquee
      gsap.to('.marquee-track', {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-40 bg-transparent overflow-hidden">
      
      {/* Stats */}
      <div className="max-w-[1600px] mx-auto px-6 mb-40 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        <div>
          <div className="text-7xl md:text-8xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="counter-val" data-target="15000">0</span><span className="text-sky-400">+</span>
          </div>
          <div className="text-zinc-500 font-bold tracking-widest text-lg uppercase">Projects Generated</div>
        </div>
        <div>
          <div className="text-7xl md:text-8xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="counter-val" data-target="850">0</span><span className="text-sky-400">+</span>
          </div>
          <div className="text-zinc-500 font-bold tracking-widest text-lg uppercase">Active Developers</div>
        </div>
        <div>
          <div className="text-7xl md:text-8xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="counter-val" data-target="3000000">0</span><span className="text-sky-400">+</span>
          </div>
          <div className="text-zinc-500 font-bold tracking-widest text-lg uppercase">Lines of Code Written</div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10" />
        
        <div className="marquee-track flex gap-8 w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[450px] bg-[#09090b]/80 border border-zinc-800/80 p-10 rounded-[30px] backdrop-blur-md shadow-xl hover:border-sky-500/30 transition-colors">
              <div className="text-sky-400 text-6xl leading-none mb-6">"</div>
              <p className="text-xl text-zinc-300 mb-8 font-medium leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-lg">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-zinc-100 text-lg">{t.author}</div>
                  <div className="text-sm text-zinc-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
