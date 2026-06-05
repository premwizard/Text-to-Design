import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function StickyCta() {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 py-16 md:py-20 lg:py-24 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-blob-reverse top-1/4 left-1/4"></div>
        <div className="absolute w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-blob-reverse animation-delay-2000 bottom-1/4 right-1/4"></div>
      </div>
      <style jsx>{`
        @keyframes blob-reverse {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-reverse { animation: blob-reverse 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight h2">
          Ready to Power Your Business?
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mb-10 opacity-90">
          Join thousands of successful businesses leveraging ChronoPay for secure, efficient, and scalable payment processing. It's time to transform your financial operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-lg">
            Start Your Free Trial <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="flex items-center justify-center px-8 py-4 border border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 cursor-pointer shadow-lg">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}