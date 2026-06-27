import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortfolioGrid from './components/PortfolioGrid';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white text-zinc-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; }
        .animate-noise { animation: noise 10s infinite steps(10);
        }
        @keyframes noise { 0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Navbar brandName="Aura Creative" />
      <main>
        <HeroSection />
        <PortfolioGrid />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;