import React from 'react';

const GradientFooter = () => {
  return (
    <footer className="relative py-16 md:py-24 overflow-hidden text-center bg-gradient-to-br from-slate-800 to-slate-900">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background: 'linear-gradient(45deg, rgba(217,7,217,0.3) 0%, rgba(139,92,246,0.4) 50%, rgba(236,72,153,0.3) 100%)',
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-4xl font-bold mb-6 text-fuchsia-400 drop-shadow-lg">Let's Create Something Vivid</h3>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Ready to bring your vision to life with a splash of color and a touch of magic? Get in touch to discuss your next project.</p>
        <button className="px-10 py-4 bg-fuchsia-500 text-white font-bold text-lg rounded-xl shadow-xl hover:bg-fuchsia-600 hover:opacity-90 transition-all duration-200 cursor-pointer">
          Contact Me
        </button>
        <div className="mt-16 pt-8 border-t border-fuchsia-500/30 text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Vivid Spectra Artistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default GradientFooter;