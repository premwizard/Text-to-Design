import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
const ORBIT_RINGS = [
  { radius: 110, speed: 18,  tilt: 15,  color: 'rgba(56,189,248,0.6)',   glow: 'rgba(56,189,248,0.12)',  nodeCount: 3, nodeSize: 4 },
  { radius: 165, speed: -26, tilt: -22, color: 'rgba(129,140,248,0.5)',  glow: 'rgba(129,140,248,0.10)', nodeCount: 2, nodeSize: 5 },
  { radius: 225, speed: 38,  tilt: 38,  color: 'rgba(192,132,252,0.4)',  glow: 'rgba(192,132,252,0.08)', nodeCount: 4, nodeSize: 3 },
  { radius: 290, speed: -50, tilt: -10, color: 'rgba(34,211,238,0.3)',   glow: 'rgba(34,211,238,0.06)',  nodeCount: 2, nodeSize: 6 },
  { radius: 360, speed: 65,  tilt: 55,  color: 'rgba(167,139,250,0.2)',  glow: 'rgba(167,139,250,0.04)', nodeCount: 3, nodeSize: 4 },
];

const PARTICLE_COUNT = 60;
const NODE_COUNT      = 18;
const CONNECTION_DIST = 200;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function rand(min, max) { return Math.random() * (max - min) + min; }

function buildParticles(cx, cy) {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: cx + rand(-500, 500),
    y: cy + rand(-500, 500),
    vx: rand(-0.15, 0.15),
    vy: rand(-0.15, 0.15),
    size: rand(1, 3.5),
    opacity: rand(0.15, 0.7),
    hue: [200, 220, 260, 280, 180][Math.floor(rand(0, 5))],
  }));
}

function buildNodes(cx, cy) {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: cx + rand(-420, 420),
    y: cy + rand(-320, 320),
    vx: rand(-0.08, 0.08),
    vy: rand(-0.08, 0.08),
    size: rand(2, 5),
    hue: [200, 240, 270, 290][Math.floor(rand(0, 4))],
    pulse: rand(0, Math.PI * 2),
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export function AICore() {
  const canvasRef     = useRef(null);
  const coreRef       = useRef(null);
  const ringsRef      = useRef([]);
  const glowRef       = useRef(null);
  const pulseRef      = useRef(null);
  const wrapperRef    = useRef(null);
  const mouseRef      = useRef({ x: 0, y: 0, active: false });
  const frameRef      = useRef(null);
  const stateRef      = useRef({ particles: [], nodes: [], time: 0 });

  // ── Canvas Draw Loop ───────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const W      = canvas.width;
    const H      = canvas.height;
    const cx     = W / 2;
    const cy     = H / 2;
    const st     = stateRef.current;

    ctx.clearRect(0, 0, W, H);
    st.time += 0.008;

    // ── Floating Particles ─────────────────────────────────────────────────
    st.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      // Wrap
      if (p.x < -60) p.x = W + 60;
      if (p.x > W + 60) p.x = -60;
      if (p.y < -60) p.y = H + 60;
      if (p.y > H + 60) p.y = -60;

      const flicker = 0.5 + 0.5 * Math.sin(st.time * 3 + p.x * 0.1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.opacity * flicker})`;
      ctx.shadowBlur  = p.size * 4;
      ctx.shadowColor = `hsla(${p.hue}, 90%, 75%, 0.6)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // ── Neural Network Nodes + Connections ────────────────────────────────
    st.nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < cx - 480 || n.x > cx + 480) n.vx *= -1;
      if (n.y < cy - 340 || n.y > cy + 340) n.vy *= -1;
      n.pulse += 0.04;
    });

    // Connections
    for (let i = 0; i < st.nodes.length; i++) {
      for (let j = i + 1; j < st.nodes.length; j++) {
        const a = st.nodes[i];
        const b = st.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    // Nodes
    st.nodes.forEach(n => {
      const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle   = `hsla(${n.hue}, 85%, 70%, ${0.5 * pulse})`;
      ctx.shadowBlur  = n.size * 5;
      ctx.shadowColor = `hsla(${n.hue}, 85%, 70%, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // ── Energy Wave Pulses (expanding rings from core) ─────────────────────
    const maxWaves = 4;
    for (let w = 0; w < maxWaves; w++) {
      const phase   = ((st.time * 0.4 + w / maxWaves) % 1);
      const radius  = phase * 380 + 60;
      const opacity = (1 - phase) * 0.18;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
      ctx.lineWidth   = 2 - phase * 1.5;
      ctx.stroke();
    }

    // ── Mouse Reactive Glow (drawn on canvas behind core) ─────────────────
    if (mouseRef.current.active) {
      const mx    = mouseRef.current.x;
      const my    = mouseRef.current.y;
      const grad  = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
      grad.addColorStop(0,   'rgba(56,189,248,0.07)');
      grad.addColorStop(0.5, 'rgba(129,140,248,0.04)');
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    frameRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Resize Handler ─────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;
    stateRef.current.particles = buildParticles(cx, cy);
    stateRef.current.nodes     = buildNodes(cx, cy);
  }, []);

  // ── Mouse Move ─────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };

    // Subtle glow DOM node move
    if (glowRef.current) {
      const dx = (e.clientX - window.innerWidth  / 2) * 0.04;
      const dy = (e.clientY - window.innerHeight / 2) * 0.04;
      gsap.to(glowRef.current, { x: dx, y: dy, duration: 1.2, ease: 'power2.out' });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  // ── GSAP Animations ────────────────────────────────────────────────────────
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [draw, resize]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Core entrance ────────────────────────────────────────────────────
      gsap.fromTo(coreRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 2.2, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
      );

      // ── Core breathe ─────────────────────────────────────────────────────
      gsap.to(coreRef.current, {
        scale: 1.04,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // ── Orbit ring rotations ──────────────────────────────────────────────
      ringsRef.current.forEach((el, i) => {
        if (!el) return;
        const ring = ORBIT_RINGS[i];
        gsap.to(el, {
          rotation: ring.speed > 0 ? 360 : -360,
          duration: Math.abs(ring.speed),
          ease: 'none',
          repeat: -1,
        });
        // Entrance
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: 'back.out(1.4)', delay: 0.5 + i * 0.15 }
        );
      });

      // ── Pulse rings from DOM ──────────────────────────────────────────────
      if (pulseRef.current) {
        gsap.to(pulseRef.current.children, {
          scale: 1,
          opacity: 0,
          duration: 3,
          ease: 'power2.out',
          stagger: { each: 0.75, repeat: -1 },
        });
      }

      // ── ScrollTrigger — fade out as user scrolls ──────────────────────────
      gsap.to(wrapperRef.current, {
        opacity: 0,
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end:   'bottom top',
          scrub: 1.2,
        }
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // ── Build SVG orbit ellipses ───────────────────────────────────────────────
  const svgSize = 800;
  const svgCenter = svgSize / 2;

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: 'auto' }}
    >
      {/* ── Canvas Layer (particles + neural net + energy waves) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* ── SVG Orbit System ── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="max-w-[90vw] max-h-[90vw]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {ORBIT_RINGS.map((ring, i) => (
              <filter key={`gf-${i}`} id={`glow-ring-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            {/* Core inner glow */}
            <filter id="core-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#e0f2fe" stopOpacity="0.9" />
              <stop offset="35%"  stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="70%"  stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"   />
            </radialGradient>
            <radialGradient id="core-ring-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="60%"  stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Orbit Rings */}
          {ORBIT_RINGS.map((ring, i) => {
            const ry = ring.radius * Math.sin((ring.tilt * Math.PI) / 180) * 0.4 + ring.radius * 0.45;
            const nodes = Array.from({ length: ring.nodeCount }, (_, ni) => {
              const angle = (ni / ring.nodeCount) * Math.PI * 2;
              const nx = svgCenter + ring.radius * Math.cos(angle);
              const ny = svgCenter + ry * Math.sin(angle);
              return { nx, ny, angle };
            });

            return (
              <g
                key={`ring-${i}`}
                ref={el => (ringsRef.current[i] = el)}
                style={{ transformOrigin: `${svgCenter}px ${svgCenter}px` }}
              >
                {/* Ellipse track */}
                <ellipse
                  cx={svgCenter}
                  cy={svgCenter}
                  rx={ring.radius}
                  ry={ry}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="1"
                  filter={`url(#glow-ring-${i})`}
                  style={{ transform: `rotateX(${ring.tilt}deg)` }}
                />
                {/* Orbital nodes */}
                {nodes.map((n, ni) => (
                  <g key={`node-${i}-${ni}`}>
                    <circle
                      cx={n.nx}
                      cy={n.ny}
                      r={ring.nodeSize + 3}
                      fill={ring.glow}
                      filter={`url(#glow-ring-${i})`}
                    />
                    <circle
                      cx={n.nx}
                      cy={n.ny}
                      r={ring.nodeSize}
                      fill={ring.color}
                    />
                  </g>
                ))}
              </g>
            );
          })}

          {/* Core */}
          <g
            ref={coreRef}
            style={{ transformOrigin: `${svgCenter}px ${svgCenter}px` }}
          >
            {/* Outer ambient */}
            <circle cx={svgCenter} cy={svgCenter} r={88} fill="url(#core-ring-grad)" />
            {/* Mid ring */}
            <circle
              cx={svgCenter}
              cy={svgCenter}
              r={72}
              fill="none"
              stroke="rgba(56,189,248,0.25)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
            {/* Inner ring */}
            <circle
              cx={svgCenter}
              cy={svgCenter}
              r={56}
              fill="none"
              stroke="rgba(129,140,248,0.4)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
            {/* Core sphere */}
            <circle
              cx={svgCenter}
              cy={svgCenter}
              r={42}
              fill="url(#core-grad)"
              filter="url(#core-glow)"
            />
            {/* Inner highlight */}
            <circle
              cx={svgCenter - 10}
              cy={svgCenter - 10}
              r={14}
              fill="rgba(255,255,255,0.18)"
            />
            {/* Center dot */}
            <circle cx={svgCenter} cy={svgCenter} r={5} fill="rgba(255,255,255,0.9)" />

            {/* HUD cross lines */}
            <line x1={svgCenter - 60} y1={svgCenter} x2={svgCenter - 48} y2={svgCenter} stroke="rgba(56,189,248,0.5)" strokeWidth="1" />
            <line x1={svgCenter + 48} y1={svgCenter} x2={svgCenter + 60} y2={svgCenter} stroke="rgba(56,189,248,0.5)" strokeWidth="1" />
            <line x1={svgCenter} y1={svgCenter - 60} x2={svgCenter} y2={svgCenter - 48} stroke="rgba(56,189,248,0.5)" strokeWidth="1" />
            <line x1={svgCenter} y1={svgCenter + 48} x2={svgCenter} y2={svgCenter + 60} stroke="rgba(56,189,248,0.5)" strokeWidth="1" />

            {/* Corner brackets */}
            <path d={`M ${svgCenter - 70} ${svgCenter - 55} L ${svgCenter - 70} ${svgCenter - 70} L ${svgCenter - 55} ${svgCenter - 70}`} fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
            <path d={`M ${svgCenter + 55} ${svgCenter - 70} L ${svgCenter + 70} ${svgCenter - 70} L ${svgCenter + 70} ${svgCenter - 55}`} fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
            <path d={`M ${svgCenter - 70} ${svgCenter + 55} L ${svgCenter - 70} ${svgCenter + 70} L ${svgCenter - 55} ${svgCenter + 70}`} fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
            <path d={`M ${svgCenter + 55} ${svgCenter + 70} L ${svgCenter + 70} ${svgCenter + 70} L ${svgCenter + 70} ${svgCenter + 55}`} fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* ── DOM Pulse Rings ── */}
      <div
        ref={pulseRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute rounded-full border border-sky-400/20"
            style={{
              width:  `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              scale:  0.4,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* ── Mouse Reactive DOM Glow ── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          top:    '50%',
          left:   '50%',
          width:  '700px',
          height: '700px',
          marginTop:  '-350px',
          marginLeft: '-350px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 3,
        }}
      />

      {/* ── Vignette: fade edges so core pops ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.9) 100%)',
        }}
      />
    </div>
  );
}
