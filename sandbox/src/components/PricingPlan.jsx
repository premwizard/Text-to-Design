import React from 'react';
import { DollarSign } from 'lucide-react';

function PricingPlan({ title, price, features, icon }) {
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <h3 className="text-lg font-bold text-slate-900">
          {title}
        </h3>
        <p className="text-lg text-slate-600">
          {price}
        </p>
        <ul className="list-disc pl-4">
          <li>{features}</li>
        </ul>
        <div className="flex justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default PricingPlan;