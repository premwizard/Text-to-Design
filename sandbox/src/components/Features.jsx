import React from 'react';
import FeatureCard from './FeatureCard';

function Features() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-slate-900">
        Powerful Features
      </h2>
      <div className="flex flex-wrap justify-center">
        <FeatureCard title="Easy Setup" description="Get started in minutes with our easy setup process." icon={<ArrowRight />} />
        <FeatureCard title="Customizable" description="Customize your experience to fit your needs." icon={<Settings />} />
        <FeatureCard title="Secure" description="Your data is secure with our top-notch security measures." icon={<Lock />} />
      </div>
    </section>
  );
}

export default Features;