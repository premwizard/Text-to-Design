import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const stats = [
  { label: "Projects Completed", value: 50, icon: Star },
  { label: "Satisfied Clients", value: 35, icon: Star },
  { label: "Awards Won", value: 8, icon: Star },
  { label: "Years of Experience", value: 7, icon: Star },
];

const ImpactStats = () => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [inView, setInView] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      stats.forEach(stat => {
        setAnimatedValues(prev => ({ ...prev, [stat.label]: 0 }));
        const interval = setInterval(() => {
          setAnimatedValues(currentValues => {
            const currentValue = currentValues[stat.label] || 0;
            if (currentValue < stat.value) {
              const increment = Math.ceil((stat.value - currentValue) / 50);
              return { ...currentValues, [stat.label]: currentValue + increment };
            } else {
              clearInterval(interval);
              return { ...currentValues, [stat.label]: stat.value };
            }
          });
        }, 30);
        return () => clearInterval(interval);
      });
    }
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-slate-900/50">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(76,29,143,0.4) 0%, rgba(147,36,140,0.5) 50%, rgba(17,24,39,1) 100%)',
        }}
      ></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-fuchsia-400 drop-shadow-lg">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-fuchsia-500/20 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-5xl font-extrabold text-fuchsia-500 mb-3 flex items-center justify-center">
                {stat.icon && <stat.icon size={48} className="mr-2" />}
                <span className="animate-counter-display">
                    {(animatedValues[stat.label] || 0).toLocaleString()}
                </span>
              </div>
              <p className="text-lg font-medium text-slate-300 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;