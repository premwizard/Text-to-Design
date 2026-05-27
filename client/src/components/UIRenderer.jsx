import React from 'react';
import Hero from './Hero';
import Navbar from './Navbar';
import Cards from './Cards';
import Form from './Form';
import Footer from './Footer';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Features from './Features';
import Stats from './Stats';

const componentMap = {
  hero: Hero,
  navbar: Navbar,
  cards: Cards,
  form: Form,
  footer: Footer,
  pricing: Pricing,
  testimonials: Testimonials,
  features: Features,
  stats: Stats,
};

function UIRenderer({ data }) {
  if (!data || !Array.isArray(data.components) || data.components.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-slate-50 text-slate-700 shadow-sm animate-fade-in" style={{ minHeight: '160px' }}>
        <p className="text-base">No UI components are available for this prompt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {data.components.map((component, index) => {
        const typeKey = String(component.type || '').toLowerCase();
        const Component = componentMap[typeKey];

        if (!Component) {
          return (
            <div
              key={index}
              className="p-6 rounded-3xl border border-rose-200 bg-rose-50 text-rose-700 animate-fade-in"
            >
              <p className="font-semibold">Unsupported component type: {component.type || 'unknown'}</p>
              <p className="text-sm mt-2 text-rose-600">This component type is not currently supported by the renderer.</p>
            </div>
          );
        }

        return <Component key={index} {...(component.props || {})} />;
      })}
    </div>
  );
}

export default UIRenderer;
