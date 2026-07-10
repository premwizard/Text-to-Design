import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="lg:col-start-2">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              <span className="block">Transform Your Business</span>
              <span className="block text-indigo-500">With NexusApp</span>
            </h1>
            <p className="mt-4 text-lg text-slate-900">
              NexusApp is a powerful tool that helps you streamline your workflow and increase productivity.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600"
              >
                Get Started
                <ArrowRight className="block h-5 w-5 ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="flex justify-center">
              <img
                className="block h-64 w-64 rounded-full"
                src="https://images.unsplash.com/photo-1510771463146-e89d6ac7f2fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="NexusApp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;