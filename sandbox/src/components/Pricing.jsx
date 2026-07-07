import React from 'react';
import PricingPlan from './PricingPlan';

function Pricing() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-slate-900">
        Pricing Plans
      </h2>
      <div className="flex flex-wrap justify-center">
        <PricingPlan title="Basic" price="$9.99" features="10 GB Storage, 1 User" icon={<DollarSign />} />
        <PricingPlan title="Premium" price="$19.99" features="50 GB Storage, 5 Users" icon={<DollarSign />} />
        <PricingPlan title="Enterprise" price="$49.99" features="100 GB Storage, 10 Users" icon={<DollarSign />} />
      </div>
    </section>
  );
}

export default Pricing;