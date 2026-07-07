import React from 'react';
import LucideReact from 'lucide-react';

const { ArrowRight } = LucideReact;

const data = {
  title: 'Generated Page',
  description: 'This is a generated page',
};

const SubComponent = () => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

function GeneratedPage() {
  return (
    <div>
      <SubComponent />
      <ArrowRight size={24} />
    </div>
  );
}

export default GeneratedPage;