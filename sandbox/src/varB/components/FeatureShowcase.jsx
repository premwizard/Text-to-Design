import React from 'react';
import { Zap, Shield, BarChart2, Globe, CreditCard, Code } from 'lucide-react';

const features = [
  {
    icon: <Zap size={48} className="text-blue-500" />,
    title: 'Instant Global Payments',
    description: 'Process transactions across borders in milliseconds with our optimized infrastructure. No delays, just pure speed.',
  },
  {
    icon: <Shield size={48} className="text-blue-500" />,
    title: 'Advanced Fraud Protection',
    description: 'Leverage AI-powered detection systems to safeguard every transaction and protect your business from illicit activities.',
  },
  {
    icon: <BarChart2 size={48} className="text-blue-500" />,
    title: 'Real-time Analytics Dashboard',
    description: 'Gain deep insights into your financial data with customizable dashboards and detailed reporting tools for informed decisions.',
  },
  {
    icon: <Globe size={48} className="text-blue-500" />,
    title: 'Multi-Currency Support',
    description: 'Expand your reach with support for over 150 currencies, offering your customers seamless payment experiences worldwide.',
  },
  {
    icon: <CreditCard size={48} className="text-blue-500" />,
    title: 'Flexible Payment Methods',
    description: 'Integrate various payment options including credit cards, digital wallets, and local bank transfers to cater to all users.',
  },
  {
    icon: <Code size={48} className="text-blue-500" />,
    title: 'Developer-Friendly API',
    description: 'Our robust and well-documented API allows for easy integration into existing systems, empowering your development team.',
  },
];

export default function FeatureShowcase() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 bottom-10 left-1/4"></div>
      </div>
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">Elevate Your Business with ChronoPay</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">Discover the core features that make ChronoPay the leading payment platform for modern enterprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/30"
            >
              <div className="mb-6 flex justify-center items-center w-20 h-20 rounded-full bg-blue-500/10 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3 text-center h3">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}