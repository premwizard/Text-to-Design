import sys
import os
import re

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.project_runner import cleanGeneratedCode

app_code = """import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import BentoFeatures from './components/BentoFeatures';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col p-4 sm:p-6 lg:p-8">
      <Navbar />
      <Sidebar />
      <HeroSection />
      <BentoFeatures />
      <Footer />
    </div>
  );
}
"""

print("Original code length:", len(app_code))
cleaned = cleanGeneratedCode(app_code)
print("Cleaned code length:", len(cleaned))
print("Cleaned code content:")
print(cleaned)
