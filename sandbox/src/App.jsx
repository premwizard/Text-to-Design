import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); body { font-family: 'Plus Jakarta Sans', sans-serif; }`}</style>
      <Navbar />
      <HeroSection />
      <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard title="Real React Compiler" description="Compiled via Vite dev server, allowing real imports and actual package resolving." />
        <FeatureCard title="Vite Hot Module Reloading" description="Changes inside the source code panel immediately hot-reload the live iframe preview." />
        <FeatureCard title="Multi-File Projects" description="Generates custom navbar, hero sections, and cards in clean individual components." />
      </div>
    </div>
  );
}