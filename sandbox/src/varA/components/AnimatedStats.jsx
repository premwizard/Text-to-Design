import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Clock, Shield } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the item is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="bg-cyan-500/20 text-cyan-500 p-3 rounded-full inline-flex mb-6 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
          <Icon className="h-8 w-8" />
        </div>
        <p className="font-space-grotesk text-5xl font-bold text-white mb-2 leading-none">
          {count}{label.includes('Increased') ? '%' : '+'}
        </p>
        <p className="text-gray-300 text-lg">
          {label}
        </p>
      </div>
    </div>
  );
};

export default function AnimatedStats() {
  const stats = [
    { icon: TrendingUp, value: 40, label: 'Increased Productivity' },
    { icon: Users, value: 100000, label: 'Active Users Globally' },
    { icon: Clock, value: 25, label: 'Time Saved Weekly' },
    { icon: Shield, value: 99, label: 'Uptime Reliability' },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500 blur-[120px] bottom-0 right-1/4 transform translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Results That Speak for Themselves
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
          See how OrbitFlow is driving tangible improvements for teams worldwide.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}