import React from 'react';

function BentoFeatures() {
  const features = [
    {
      title: 'Advanced Analytics',
      description: 'Gain deep insights with powerful data analysis tools and interactive dashboards.',
      icon: '📊',
    },
    {
      title: 'Seamless Integration',
      description: 'Connect effortlessly with your existing systems and workflows.',
      icon: '🔗',
    },
    {
      title: 'Real-time Reporting',
      description: 'Access up-to-the-minute reports to make informed decisions faster.',
      icon: '⏱️',
    },
    {
      title: 'Scalable Solutions',
      description: 'Our platform grows with your business, from startups to enterprises.',
      icon: '📈',
    },
    {
      title: 'Secure Data Handling',
      description: 'Your data is protected with industry-leading security protocols.',
      icon: '🔒',
    },
    {
      title: 'User-Friendly Interface',
      description: 'Intuitive design ensures a smooth and efficient user experience.',
      icon: '✨',
    },
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-slate-900 mb-12 md:mb-16 lg:mb-20 leading-tight">
          Discover Our <span className="text-blue-600">Core Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col items-start space-y-4"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl mb-2" role="img" aria-label={feature.title}>
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoFeatures;