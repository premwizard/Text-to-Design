import React, { useState } from 'react';

export default function FAQSection() {
  const [isOpen, setIsOpen] = useState({});
  const faqs = [
    { id: 1, question: 'What is CodeForge?', answer: 'CodeForge is a suite of tools designed to help developers streamline their development process.' },
    { id: 2, question: 'How much does CodeForge cost?', answer: 'Our plans start at $19.99 per month.' },
    { id: 3, question: 'Is CodeForge secure?', answer: 'Yes, we take security very seriously and have implemented measures to protect your data.' }
  ];

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <div key={faq.id} className="mb-4">
          <button className="flex justify-between w-full text-left py-4 hover:opacity-90 transition-all duration-200 cursor-pointer" onClick={() => setIsOpen((prev) => ({ ...prev, [faq.id]: !prev[faq.id] }))}> 
            {faq.question}
            <span className={`text-red-600 ${isOpen[faq.id] ? 'rotate-180' : ''}`}>{'>>'}</span>
          </button>
          {isOpen[faq.id] && (
            <p className="text-lg mb-4">{faq.answer}</p>
          )}
        </div>
      ))}
    </section>
  );
}