import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { name: "Pipelines Processed", value: "5M+", suffix: "/month" },
  { name: "Data Sources Integrated", value: "200+", suffix: "+" },
  { name: "Active Users", value: "50K+", suffix: "+" },
  { name: "Customer Satisfaction", value: "98%", suffix: "" },
];

export default function AnimatedStats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
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

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-950">
      <div className="container mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-5xl lg:text-6xl font-bold mb-2 text-cyan-500 relative">
                <span className="sr-only">{stat.value}</span>
                {inView && (
                  <AnimatedCounter
                    from={0}
                    to={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                    duration={2000}
                  />
                )}
                {!inView && <span>{stat.value.charAt(0)}...</span>} 
              </h3>
              <p className="text-lg font-semibold text-gray-200 uppercase tracking-wider">{stat.name}</p>
              {stat.suffix && <span className="text-sm text-gray-400 ml-1">{stat.suffix}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple Animated Counter Component
function AnimatedCounter({ from, to, duration }) {
  const [count, setCount] = useState(from);
  const intervalRef = useRef();

  useEffect(() => {
    const stepTime = duration / (to - from);
    intervalRef.current = setInterval(() => {
      setCount(prevCount => {
        if (prevCount >= to) {
          clearInterval(intervalRef.current);
          return to;
        }
        return prevCount + 1;
      });
    }, stepTime);

    return () => clearInterval(intervalRef.current);
  }, [from, to, duration]);

  return <>{count}</>;
}