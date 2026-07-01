import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardHeader from './components/DashboardHeader';
import FiltersSection from './components/FiltersSection';
import StatsCards from './components/StatsCards';
import ChartsGrid from './components/ChartsGrid';
import DataTable from './components/DataTable';

const App = () => {
  const [filters, setFilters] = useState({
    dateRange: 'Last 30 Days',
    source: 'All Sources',
    region: 'Global',
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // In a real app, you'd refetch data here based on new filters
    console.log('Applied Filters:', newFilters);
  };

  // Mock Data for the dashboard
  const statsData = [
    { id: 1, title: 'Total Revenue', value: '$12,450', change: '+5.2%', icon: 'DollarSign', trend: 'up' },
    { id: 2, title: 'New Users', value: '1,230', change: '-1.8%', icon: 'Users', trend: 'down' },
    { id: 3, title: 'Conversion Rate', value: '4.7%', change: '+0.3%', icon: 'Activity', trend: 'up' },
    { id: 4, title: 'Support Tickets', value: '85', change: '+12%', icon: 'LifeBuoy', trend: 'up' },
  ];

  const chartsData = [
    { id: 1, title: 'Revenue Over Time', type: 'Line Chart' },
    { id: 2, title: 'Users by Region', type: 'Bar Chart' },
    { id: 3, title: 'Conversion Funnel', type: 'Funnel Chart' },
    { id: 4, title: 'Product Sales', type: 'Pie Chart' },
  ];

  const tableData = [
    { id: 1, campaign: 'Q1 Marketing', clicks: 1200, conversions: 85, revenue: '$2,500' },
    { id: 2, campaign: 'Website Redesign', clicks: 980, conversions: 62, revenue: '$1,800' },
    { id: 3, campaign: 'Email Blast Jan', clicks: 1500, conversions: 110, revenue: '$3,200' },
    { id: 4, campaign: 'Social Media Push', clicks: 2100, conversions: 155, revenue: '$4,100' },
    { id: 5, campaign: 'Partnership Program', clicks: 750, conversions: 48, revenue: '$1,500' },
    { id: 6, campaign: 'Holiday Promo', clicks: 1800, conversions: 130, revenue: '$3,500' },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
          body {
            font-family: 'DM Sans', sans-serif;
            background-color: #ffffff; /* bg-white */
            color: #18181b; /* text-zinc-900 */
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      </style>
      <div className="min-h-screen bg-white">
        <Navbar brandName="DataPulse" />
        <main className="max-w-7xl mx-auto py-4 px-2 sm:px-4 lg:px-6">
          <DashboardHeader tagline="Unlock insights with intuitive analytics." />
          <FiltersSection currentFilters={filters} onFilterChange={handleFilterChange} />
          <StatsCards data={statsData} />
          <ChartsGrid data={chartsData} />
          <DataTable data={tableData} />
        </main>
      </div>
    </>
  );
};

export default App;