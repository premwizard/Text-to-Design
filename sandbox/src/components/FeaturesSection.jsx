import React from 'react';
import { Check } from 'lucide-react';

function FeaturesSection() {
  return (
    <section className="bg-white py-12 md:py-24 lg:py-48">
      <div className="container mx-auto p-12 md:p-24 lg:p-48">
        <h2 className="text-4xl text-indigo-500 font-bold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-xl text-slate-900 font-bold mb-2">Feature 1</h3>
            <p className="text-lg text-slate-900 mb-4">Description of feature 1.</p>
            <ul>
              <li className="flex items-center mb-2">
                <Check size={20} className="text-indigo-500 mr-2" />
                <span className="text-lg text-slate-900">Benefit 1</span>
              </li>
              <li className="flex items-center mb-2">
                <Check size={20} className="text-indigo-500 mr-2" />
                <span className="text-lg text-slate-900">Benefit 2</span>
              </li>
            </ul>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-xl text-slate-900 font-bold mb-2">Feature 2</h3>
            <p className="text-lg text-slate-900 mb-4">Description of feature 2.</p>
            <ul>
              <li className="flex items-center mb-2">
                <Check size={20} className="text-indigo-500 mr-2" />
                <span className="text-lg text-slate-900">Benefit 1</span>
              </li>
              <li className="flex items-center mb-2">
                <Check size={20} className="text-indigo-500 mr-2" />
                <span className="text-lg text-slate-900">Benefit 2</span>
              </li>
            </ul>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-xl text-slate-900 font-bold mb-2">Feature 3</h3>
            <p className="text-lg text-slate-900 mb-4">Description of feature 3.</p>
            <ul>
              <li className="flex items-center mb-2">
                <Check size={20} className="text-indigo-500 mr-2" />
                <span className="text-lg text-slate-900">Benefit 1</span>
              </li>
              <li className="flex items-center mb-2">
                <Check size={20} className="text-indigo-500 mr-2" />
                <span className="text-lg text-slate-900">Benefit 2</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;