import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import FilterControls from './components/FilterControls';
import SummaryCards from './components/SummaryCards';
import ChartsSection from './components/ChartsSection';
import DataTable from './components/DataTable';

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
            <FilterControls />
            <SummaryCards />
            <ChartsSection />
            <DataTable />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;