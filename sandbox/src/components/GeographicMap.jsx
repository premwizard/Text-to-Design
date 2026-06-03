import React from 'react';
import { Globe, MapPin, TrendingUp } from 'lucide-react';

export default function GeographicMap() {
  const regions = [
    { name: 'North America', value: '$450K', highlight: 'bg-emerald-500/40', top: '20%', left: '15%' },
    { name: 'Europe', value: '$320K', highlight: 'bg-emerald-500/40', top: '30%', left: '50%' },
    { name: 'Asia', value: '$280K', highlight: 'bg-emerald-500/40', top: '40%', left: '75%' },
    { name: 'South America', value: '$150K', highlight: 'bg-emerald-500/20', top: '60%', left: '25%' },
    { name: 'Africa', value: '$90K', highlight: 'bg-emerald-500/10', top: '55%', left: '45%' },
  ];

  return (
    <section
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 lg:p-8 font-inter h-96 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-space-grotesk text-white flex items-center">
          <Globe className="mr-3 text-emerald-500" size={24} />
          Global Sales Distribution
        </h2>
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <TrendingUp size={16} />
          <span>+8.1% YOY</span>
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden">
        {/* Placeholder for a world map image or SVG */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/World_map_blank_without_borders.svg/1200px-World_map_blank_without_borders.svg.png"
          alt="World Map"
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
        />
        
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* Simulated regions with tooltips */}
          {regions.map((region, index) => (
            <div
              key={index}
              className="absolute flex items-center group cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ top: region.top, left: region.left }}
            >
              <MapPin className="text-red-500 drop-shadow-lg" size={24} />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 p-2 bg-zinc-700 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {region.name}: {region.value}
              </div>
            </div>
          ))}

          {/* Larger text for general map placeholder */}
          <p className="text-gray-500 text-center font-medium">
            Interactive Map Coming Soon
          </p>
        </div>
      </div>
    </section>
  );
}