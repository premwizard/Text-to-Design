import React from 'react';

export default function InteractiveProcess() {
  return (
    <section className="flex flex-col items-center py-12">
      <h2 className="text-4xl font-bold mb-4">How it works</h2>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center">
        <div className="lg:w-1/3 mb-4 lg:mr-4">
          <h3 className="text-3xl font-bold mb-2">Step 1: Sign up</h3>
          <p className="text-lg text-center">Create an account to get started with CodeForge.</p>
        </div>
        <div className="lg:w-1/3 mb-4 lg:mx-4">
          <h3 className="text-3xl font-bold mb-2">Step 2: Choose a plan</h3>
          <p className="text-lg text-center">Select a plan that suits your needs and budget.</p>
        </div>
        <div className="lg:w-1/3 mb-4 lg:ml-4">
          <h3 className="text-3xl font-bold mb-2">Step 3: Start coding</h3>
          <p className="text-lg text-center">Begin using CodeForge to streamline your development process.</p>
        </div>
      </div>
    </section>
  );
}