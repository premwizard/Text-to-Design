import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { Footer } from '../components/landing/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const glowRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    // Mouse follow effect for the global glow
    const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e) => {
      // Offset by half the width/height of the glow orb
      xTo(e.clientX - 400);
      yTo(e.clientY - 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-app text-zinc-100 min-h-screen font-sans selection:bg-sky-500/30 overflow-hidden w-full">
      
      {/* --- GLOBAL LIVING BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layer 1: Subtle dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-60" />

        {/* Layer 2: Mouse-follow ambient glow (subtle, not competing with AICore) */}
        <div ref={glowRef} className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/6 via-sky-500/4 to-transparent rounded-full blur-[120px] opacity-60" />

        {/* Layer 3: Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] object-cover" />
      </div>


      {/* --- CONTENT --- */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />
        <HeroSection />
        <Footer />
      </div>
    </div>
  );
}
