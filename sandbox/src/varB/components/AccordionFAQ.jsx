import React, { useState } from 'react';
import { Check } from 'lucide-react';

const faqs = [
  {
    question: "What is SynergyHub?",
    answer: "SynergyHub is a comprehensive online platform designed to enhance team collaboration and productivity by integrating project management, communication, and document sharing tools into a single, intuitive interface."
  },
  {
    question: "Is SynergyHub suitable for small teams?",
    answer: "Absolutely! SynergyHub is designed to scale from small startups to large enterprises. Our flexible plans cater to teams of all sizes, ensuring you only pay for what you need."
  },
  {
    question: "How does SynergyHub handle security?",
    answer: "We prioritize the security of your data. SynergyHub employs industry-standard encryption, regular backups, and robust access controls to ensure your information is safe and secure."
  },
  {
    question: "Can I integrate SynergyHub with other tools?",
    answer: "Yes, SynergyHub offers a growing list of integrations with popular tools like Slack, Google Workspace, Microsoft 365, and many more. Check our integrations page for the latest list."
  }
];

export default function AccordionFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Get the answers to common questions about SynergyHub.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-clay-sm p-6">
              <button
                className="w-full text-left text-2xl font-semibold flex justify-between items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <span className="text-blue-500 text-3xl transition-transform duration-200 ease-in-out">
                  {activeIndex === index ? '-' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 mt-4' : 'max-h-0'}`}
              >
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg text-gray-600 mb-8">Reach out to our support team and we'll be happy to assist you.</p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:opacity-90 transition-all duration-200 cursor-pointer">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}