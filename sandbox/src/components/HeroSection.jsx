import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from 'lucide-react';

function HeroSection() {
  const heroImage = "https://images.unsplash.com/photo-1656675511558-4a4f0a9c5e5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  return (
    <section className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-slate-900">
          Launch Your Business into the Future
        </h1>
        <p className="text-lg text-slate-600">
          ApexLaunch is a powerful platform that helps you launch your business into the future.
        </p>
        <Link to="/features" className="bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-4 rounded-md">
          Learn More
        </Link>
      </div>
      <div className="hidden lg:block">
        <img src={heroImage} alt="Hero Image" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}

export default HeroSection;