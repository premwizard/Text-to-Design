import React, { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "Neon Bloom Installation",
    description: "A mesmerizing blend of digital and physical art, creating an immersive neon garden experience.",
    imageUrl: "https://images.unsplash.com/photo-1589476554012-85223d38b67f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    tech: ["GLSL", "Three.js", "React", "Node.js"],
    link: "#"
  },
  {
    id: 2,
    title: "Cosmic Echoes",
    description: "An interactive audio-visualizer that translates sound waves into stunning nebulae and galaxy formations.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    tech: ["Web Audio API", "P5.js", "React"],
    link: "#"
  }
];

const SplitProjectView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const currentProject = projects[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(217,7,217,0.4) 50%, rgba(236,72,153,0.3) 100%)',
        }}
      ></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-fuchsia-400 drop-shadow-lg">Featured Projects</h2>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative rounded-xl overflow-hidden shadow-2xl border-2 border-fuchsia-500/30 transform transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              src={currentProject.imageUrl}
              alt={currentProject.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">{currentProject.title}</h3>
              <p className="text-slate-300 mb-4">{currentProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProject.tech.map((t, index) => (
                  <span key={index} className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 text-xs rounded-full border border-fuchsia-500/40">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={currentProject.link}
                className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold flex items-center gap-1 transition-all duration-200"
              >
                View Project <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className={`transition-all duration-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-4xl font-bold mb-4 text-fuchsia-400 drop-shadow-lg">{currentProject.title}</h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">{currentProject.description}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {currentProject.tech.map((t, index) => (
                  <span key={index} className="px-4 py-2 bg-fuchsia-500/20 text-fuchsia-300 text-sm rounded-lg border border-fuchsia-500/40">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 bg-fuchsia-500 text-white font-semibold rounded-lg shadow-md hover:bg-fuchsia-600 hover:opacity-90 transition-all duration-200 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg shadow-md hover:bg-slate-600 hover:opacity-90 transition-all duration-200 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitProjectView;