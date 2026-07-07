import React from 'react';

function PricingSection() {
  return (
    <section className="bg-white py-12 md:py-24 lg:py-48">
      <div className="container mx-auto p-12 md:p-24 lg:p-48">
        <h2 className="text-4xl text-indigo-500 font-bold mb-4">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-xl text-slate-900 font-bold mb-2">Basic</h3>
            <p className="text-lg text-slate-900 mb-4">$9.99/month</p>
            <ul>
              <li className="text-lg text-slate-900 mb-2">Feature 1</li>
              <li className="text-lg text-slate-900 mb-2">Feature 2</li>
            </ul>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-xl text-slate-900 font-bold mb-2">Premium</h3>
            <p className="text-lg text-slate-900 mb-4">$19.99/month</p>
            <ul>
              <li className="text-lg text-slate-900 mb-2">Feature 1</li>
              <li className="text-lg text-slate-900 mb-2">Feature 2</li>
              <li className="text-lg text-slate-900 mb-2">Feature 3</li>
            </ul>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-xl text-slate-900 font-bold mb-2">Enterprise</h3>
            <p className="text-lg text-slate-900 mb-4">Custom pricing</p>
            <ul>
              <li className="text-lg text-slate-900 mb-2">Feature 1</li>
              <li className="text-lg text-slate-900 mb-2">Feature 2</li>
              <li className="text-lg text-slate-900 mb-2">Feature 3</li>
            </ul>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;