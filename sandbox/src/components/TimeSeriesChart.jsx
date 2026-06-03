import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

export default function TimeSeriesChart() {
  // Simulate chart data points - in a real app, this would be a charting library
  const dataPoints = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 50) + 50);
  const maxValue = Math.max(...dataPoints);

  return (
    <section
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 lg:p-8 font-inter h-96 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-space-grotesk text-white flex items-center">
          <TrendingUp className="mr-3 text-emerald-500" size={24} />
          Monthly Revenue Trends
        </h2>
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <ArrowUp size={16} />
          <span>+12.5% vs Last Month</span>
        </div>
      </div>

      <div className="flex-1 relative pb-6">
        {/* Simulated Y-axis labels */}
        <div className="absolute left-0 top-0 h-full w-8 flex flex-col justify-between text-xs text-gray-500 py-2">
          <span>$100K</span>
          <span>$75K</span>
          <span>$50K</span>
          <span>$25K</span>
          <span>$0</span>
        </div>

        {/* Simulated chart area */}
        <div className="relative h-full w-full pl-10 pr-2">
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute w-full h-[1px] bg-white/5" style={{ bottom: `${i * 25}%` }}></div>
          ))}

          {/* Data points and line - simplified representation */}
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {dataPoints.map((value, index) => (
              <div
                key={index}
                className="w-4 bg-emerald-500/50 rounded-t-sm group relative hover:shadow-xl transition-all duration-200"
                style={{ height: `${(value / 100) * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-1 text-xs bg-zinc-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  ${value}K
                </div>
              </div>
            ))}
          </div>

          {/* A smoothed line would be drawn by an actual charting library */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
            <polyline 
              fill="url(#chartGradient)"
              stroke="#10b981"
              strokeWidth="2"
              points={dataPoints.map((value, index) => {
                const x = (index / (dataPoints.length - 1)) * 100;
                const y = 100 - (value / maxValue) * 100;
                return `${x},${y}`;
              }).join(' ')}
            />
          </svg>

        </div>
      </div>

      {/* Simulated X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-10">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </section>
  );
}