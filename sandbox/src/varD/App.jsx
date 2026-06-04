import React, { useState } from 'react';
import { ArrowRight, Star, Check, Menu, X } from 'lucide-react';
import DashboardHeader from './components/DashboardHeader';
import MetricTiles from './components/MetricTiles';
import TrendGraphCard from './components/TrendGraphCard';
import UserDemographicsCard from './components/UserDemographicsCard';
import FeatureAdoptionCard from './components/FeatureAdoptionCard';
import DataExportModule from './components/DataExportModule';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-slate-800 min-h-screen text-zinc-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Lato:wght@300;400;500;600&display=swap');
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif; }
      `}</style>
      <DashboardHeader mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MetricTiles />
      <TrendGraphCard />
      <UserDemographicsCard />
      <FeatureAdoptionCard />
      <DataExportModule />
    </div>
  );
}