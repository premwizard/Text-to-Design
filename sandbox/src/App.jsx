import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

function App() {
  return (
    <HashRouter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        :root {
          --primary-accent-color: #2f343a;
          --background-color: #ffffff;
          --text-color: #2f343a;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          margin: 0;
          padding: 0;
          background-color: var(--background-color);
          color: var(--text-color);
        }
      `}</style>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;