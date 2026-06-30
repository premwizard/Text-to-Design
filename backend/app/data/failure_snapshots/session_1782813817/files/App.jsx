import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BentoFeatures from './components/BentoFeatures';

function App() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

          body {
            font-family: 'Inter', sans-serif;
            background-color: #020617; /* bg-slate-950 */
            color: #f4f4f5; /* text-zinc-100 */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Space Grotesk', sans-serif;
          }

          /* Basic Blob Animation for HeroSection */
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }

          .animate-blob {
            animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>
      <div className="min-h-screen bg-slate-950 text-zinc-100 antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <BentoFeatures />
        </main>
      </div>
    </>
  );
}

export default App;