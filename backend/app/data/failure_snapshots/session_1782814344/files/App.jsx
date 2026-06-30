import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

          .font-heading {
            font-family: 'Space Grotesk', sans-serif;
          }
          .font-body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <div className="font-body bg-zinc-950 text-zinc-100 min-h-screen antialiased">
        <Navbar />
        <main>
          <HeroSection />
        </main>
      </div>
    </>
  );
}

export default App;