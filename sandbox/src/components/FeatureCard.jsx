import React from 'react';
import { ArrowRight, Settings, Lock } from 'lucide-react';

function FeatureCard({ title, description, icon }) {
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <h3 className="text-lg font-bold text-slate-900">
          {title}
        </h3>
        <p className="text-lg text-slate-600">
          {description}
        </p>
        <div className="flex justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;