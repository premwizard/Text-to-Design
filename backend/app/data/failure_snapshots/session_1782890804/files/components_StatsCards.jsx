import React from 'react';
import * as LucideIcons from 'lucide-react'; // Import all icons from Lucide

const StatsCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
      {data.map((stat) => {
        const Icon = LucideIcons[stat.icon]; // Dynamically get icon component
        const trendColor = stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400';

        return (
          <div
            key={stat.id}
            className="bg-zinc-800 text-zinc-200 rounded-md shadow-sm p-4 border border-zinc-700 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-zinc-400">{stat.title}</h3>
              {Icon && <Icon className="h-5 w-5 text-zinc-500" />}
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className={`text-xs font-medium ${trendColor}`}>
                {stat.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;