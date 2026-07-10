import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function Features() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Features
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1510771463146-e89d6ac7f2fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Feature 1"
              />
            </div>
            <div className="flex-1 bg-white p-6">
              <h3 className="text-xl font-medium text-slate-900">
                Feature 1
              </h3>
              <p className="mt-4 text-lg text-slate-900">
                Description of feature 1.
              </p>
              <ul className="mt-4 list-none">
                <li className="flex items-start">
                  <Check className="block h-5 w-5 text-indigo-500" aria-hidden="true" />
                  <p className="ml-3 text-lg text-slate-900">Benefit 1</p>
                </li>
                <li className="flex items-start mt-4">
                  <Check className="block h-5 w-5 text-indigo-500" aria-hidden="true" />
                  <p className="ml-3 text-lg text-slate-900">Benefit 2</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1510771463146-e89d6ac7f2fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Feature 2"
              />
            </div>
            <div className="flex-1 bg-white p-6">
              <h3 className="text-xl font-medium text-slate-900">
                Feature 2
              </h3>
              <p className="mt-4 text-lg text-slate-900">
                Description of feature 2.
              </p>
              <ul className="mt-4 list-none">
                <li className="flex items-start">
                  <Check className="block h-5 w-5 text-indigo-500" aria-hidden="true" />
                  <p className="ml-3 text-lg text-slate-900">Benefit 1</p>
                </li>
                <li className="flex items-start mt-4">
                  <Check className="block h-5 w-5 text-indigo-500" aria-hidden="true" />
                  <p className="ml-3 text-lg text-slate-900">Benefit 2</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1510771463146-e89d6ac7f2fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Feature 3"
              />
            </div>
            <div className="flex-1 bg-white p-6">
              <h3 className="text-xl font-medium text-slate-900">
                Feature 3
              </h3>
              <p className="mt-4 text-lg text-slate-900">
                Description of feature 3.
              </p>
              <ul className="mt-4 list-none">
                <li className="flex items-start">
                  <Check className="block h-5 w-5 text-indigo-500" aria-hidden="true" />
                  <p className="ml-3 text-lg text-slate-900">Benefit 1</p>
                </li>
                <li className="flex items-start mt-4">
                  <Check className="block h-5 w-5 text-indigo-500" aria-hidden="true" />
                  <p className="ml-3 text-lg text-slate-900">Benefit 2</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;