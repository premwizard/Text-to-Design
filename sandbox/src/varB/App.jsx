import React from 'react';
import HeroWithImage from './components/HeroWithImage';
import ProjectMasonry from './components/ProjectMasonry';
import ProcessTimeline from './components/ProcessTimeline';
import ClientLogos from './components/ClientLogos';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-800 min-h-screen text-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; }
      `}</style>
      <HeroWithImage />
      <ProjectMasonry />
      <ProcessTimeline />
      <ClientLogos />
      <Footer />
    </div>
  );
}