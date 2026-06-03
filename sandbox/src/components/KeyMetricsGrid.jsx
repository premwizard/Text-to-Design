import React from 'react';
import { DollarSign, Users, TrendingUp, ShoppingCart } from 'lucide-react';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$1.2M',
    change: '+18.7%',
    trend: 'up',
    icon: DollarSign,
    description: 'Revenue across all channels'
  },
  {
    title: 'New Customers',
    value: '8,521',
    change: '+5.3%',
    trend: 'up',
    icon: Users,
    description: 'New sign-ups this quarter'
  },
  {
    title: 'Conversion Rate',
    value: '4.7%',
    change: '-1.2%',
    trend: 'down',
    icon: TrendingUp,
    description: 'Website visitor to customer conversion'
  },
  {
    title: 'Avg. Order Value',
    value: '$142.30',
    change: '+3.1%',
    trend: 'up',
    icon: ShoppingCart,
    description: 'Average value of each purchase'
  },
];

export default function KeyMetricsGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-space-grotesk text-white">{metric.title}</h3>
            <metric.icon className="text-emerald-500" size={24} />
          </div>
          <div className="flex items-end mb-2">
            <span className="text-4xl font-bold font-space-grotesk text-white mr-3">{metric.value}</span>
            <span
              className={`flex items-center text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {metric.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1 rotate-180" />}
              {metric.change}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{metric.description}</p>
        </div>
      ))}
    </section>
  );
}