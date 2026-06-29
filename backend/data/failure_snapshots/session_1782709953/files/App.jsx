import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import FilterControls from './components/FilterControls';
import SummaryCards from './components/SummaryCards';
import ChartsSection from './components/ChartsSection';
import DataTable from './components/DataTable';
import DetailedInsights from './components/DetailedInsights';

function App() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
      `}</style>
      <div className="flex min-h-screen bg-white text-zinc-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <DashboardHeader />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 xl:w-1/3">
                <FilterControls />
              </div>
              <div className="w-full md:w-1/2 xl:w-2/3">
                <SummaryCards />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 xl:w-1/2">
                <ChartsSection />
              </div>
              <div className="w-full md:w-1/2 xl:w-1/2">
                <DetailedInsights />
              </div>
            </div>
            <DataTable />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;