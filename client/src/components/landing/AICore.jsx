import React, { useEffect, useRef, useState } from 'react';

export function AICore() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Load Three.js and Vanta.js dynamically
  useEffect(() => {
    // If they already exist on window, we're good
    if (window.THREE && window.VANTA && window.VANTA.FOG) {
      setScriptsLoaded(true);
      return;
    }

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Prevent duplicate script tags
        if (document.querySelector(`script[src="${src}"]`)) {
          // If script tag exists but isn't loaded yet, we could have a race condition,
          // but for simplicity we assume it's either loaded or loading.
          // To be safe, wait a tick if window object isn't present, but Promise chaining handles the primary load.
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load Three.js first, then Vanta
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js'))
      .then(() => {
        setScriptsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load Vanta.js scripts:", err);
      });
  }, []);

  // Initialize and destroy the Vanta effect
  useEffect(() => {
    if (!scriptsLoaded || !vantaRef.current) return;
    if (!window.VANTA || !window.VANTA.FOG) return;

    if (!vantaEffect.current) {
      vantaEffect.current = window.VANTA.FOG({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xaa744b,
        midtoneColor: 0x173841,
        lowlightColor: 0xaed24,
        baseColor: 0x51f41,
        blurFactor: 0.62,
        speed: 1.30,
        zoom: 0.90
      });
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [scriptsLoaded]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, position: 'absolute' }}
    />
  );
}
