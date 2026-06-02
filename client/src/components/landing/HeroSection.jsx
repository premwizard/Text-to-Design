import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Cpu } from 'lucide-react';
import { AICore } from './AICore';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef   = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);
  const ctaRef       = useRef(null);
  const badgeRef     = useRef(null);
  const statsRef     = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // ── Entrance timeline ──────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.5 });

      // Badge pop in
      tl.fromTo(badgeRef.current,
        { y: 20, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' }
      );

      // Title words cascade from below, each word is its own span
      tl.fromTo(titleRef.current.children,
        { y: 90, opacity: 0, rotateX: -40, filter: 'blur(8px)' },
        { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.09, ease: 'power4.out' },
        '-=0.3'
      );

      // Subtitle
      tl.fromTo(subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

      // CTA buttons
      tl.fromTo(ctaRef.current.children,
        { y: 28, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.12, ease: 'back.out(1.5)' },
        '-=0.5'
      );

      // Stats strip
      tl.fromTo(statsRef.current.children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );

      // ── ScrollTrigger parallax on content ─────────────────────────────
      gsap.to('.hero-content-inner', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'bottom top',
          scrub: 0.9,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* ── AI Core sits BEHIND everything at z-0 ── */}
      <AICore />

      {/* ── Subtle radial light behind text so it's always legible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,5,5,0.45) 0%, transparent 100%)',
        }}
      />

      {/* ── Hero Content ── */}
      <div
        className="hero-content-inner relative flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/5 backdrop-blur-md text-sm font-medium text-sky-300 mb-10 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
        >
          <Cpu size={14} className="text-sky-400" />
          <span>Powered by Advanced AI Core</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-[96px] font-black tracking-tighter text-white mb-8 leading-[1.05]"
          style={{ perspective: '1000px' }}
        >
          <span className="inline-block origin-bottom will-change-transform">Turn</span>{' '}
          <span className="inline-block origin-bottom will-change-transform">Ideas</span>{' '}
          <span className="inline-block origin-bottom will-change-transform">Into</span>{' '}
          <span className="inline-block origin-bottom will-change-transform">
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #38bdf8 0%, #818cf8 40%, #c084fc 80%, #f472b6 100%)',
              }}
            >
              Production
            </span>
          </span>{' '}
          <span className="inline-block origin-bottom will-change-transform">UI</span>{' '}
          <span className="inline-block origin-bottom will-change-transform text-zinc-500">
            Instantly.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Describe your product. Watch our advanced AI generate complete{' '}
          <span className="text-zinc-200 font-semibold">React + Tailwind</span> interfaces
          in seconds. Build faster, iterate smarter, ship today.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
          <Link
            to="/app"
            id="hero-cta-primary"
            className="group relative flex items-center justify-center gap-2 bg-white text-black px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 w-full sm:w-auto overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(255,255,255,0.18), 0 4px 24px rgba(0,0,0,0.4)' }}
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />
            <Zap size={18} className="relative z-10" />
            <span className="relative z-10">Start Building Free</span>
          </Link>

          <a
            href="#demo"
            id="hero-cta-secondary"
            className="group flex items-center justify-center gap-2 bg-zinc-900/70 text-white border border-zinc-700/60 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-zinc-800/80 transition-all hover:scale-105 w-full sm:w-auto backdrop-blur-md"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
          >
            Watch Demo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500"
        >
          {[
            { value: '12k+',  label: 'Components generated' },
            { value: '98%',   label: 'Accuracy rate' },
            { value: '<3s',   label: 'Generation time' },
            { value: '4.9★',  label: 'User rating' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="w-px h-4 bg-zinc-800" />}
              <span className="text-zinc-200 font-bold">{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade to next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          zIndex: 6,
          background: 'linear-gradient(to bottom, transparent, #050505)',
        }}
      />
    </section>
  );
}
