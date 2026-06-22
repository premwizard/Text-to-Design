import React, { useState, useEffect, useRef } from 'react';

export default function InteractiveDemo() {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);

  const demoSteps = [
    { title: "Create a Project", description: "Set up your project boards and timelines in seconds.", imgSrc: "/images/demo-step-1.png" },
    { title: "Invite Your Team", description: "Collaborate in real-time with seamless communication tools.", imgSrc: "/images/demo-step-2.png" },
    { title: "Track Progress", description: "Monitor your team's progress with insightful analytics.", imgSrc: "/images/demo-step-3.png" },
    { title: "Achieve Goals", description: "SynergyHub helps you hit your targets faster.", imgSrc: "/images/demo-step-4.png" },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter >= 5) { // Show each step for 5 seconds
      setStep(prev => (prev + 1) % demoSteps.length);
      setCounter(0);
    }
  }, [counter]);

  const currentStep = demoSteps[step];

  const handleNextStep = () => {
    clearInterval(intervalRef.current);
    setStep(prev => (prev + 1) % demoSteps.length);
    setCounter(0);
    intervalRef.current = setInterval(() => { // Restart interval for the new step
      setCounter(prev => prev + 1);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">See SynergyHub in Action</h2>
          <p className="text-lg text-gray-600">Experience a fluid and intuitive workflow designed to boost your team's output.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative p-8 rounded-3xl shadow-clay-xl border-2 border-gray-100">
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-md mb-8">
              <img src={currentStep.imgSrc} alt={currentStep.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">{currentStep.title}</h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{currentStep.description}</p>
            <div className="flex justify-center space-x-4 mt-8">
              <button 
                onClick={handleNextStep} 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:opacity-90 transition-all duration-200 cursor-pointer"
              >
                Next Step
              </button>
              <button className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white hover:opacity-90 transition-all duration-200 cursor-pointer">
                Live Demo
              </button>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Ready to transform your workspace?</h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">Join thousands of teams worldwide who are already leveraging SynergyHub to achieve peak productivity and seamless collaboration.</p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:opacity-90 transition-all duration-200 cursor-pointer">
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}