import React, { useState, useEffect, useRef } from 'react';

export default function InteractiveDemo() {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } 
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <section className="py-24 px-6 lg:px-12 bg-neutral-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-300">Experience NoirFlow in Action</h2>
        <p className="text-lg md:text-xl mb-12 text-gray-400">See how effortlessly you can manage your projects and collaborate with your team.</p>
        <div ref={progressBarRef} className="relative w-full h-12 bg-neutral-800 rounded-full overflow-hidden shadow-inner cursor-pointer">
          <div
            className="absolute top-0 left-0 h-full bg-gray-300 rounded-full transition-all duration-700 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-neutral-950 font-bold text-xl">
            {progress < 100 ? `${progress}%` : 'Demo Loaded!'}
          </div>
        </div>
        <p className="mt-6 text-gray-500 text-sm italic">Click the progress bar to simulate loading.</p>
      </div>
    </section>
  );
}