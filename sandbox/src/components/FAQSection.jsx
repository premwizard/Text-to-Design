import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What kind of content can CognitoFlow generate?',
      answer: 'CognitoFlow is capable of generating a wide range of content, including articles, blog posts, marketing copy, social media captions, code snippets, high-resolution images, and even conceptual designs. Our multi-modal AI adapts to your creative needs.'
    },
    {
      question: 'How does CognitoFlow ensure content quality and originality?',
      answer: 'Our advanced AI models are trained on vast, diverse datasets and are designed to produce original, high-quality content. We also incorporate mechanisms to check for plagiarism and ensure the output is contextually relevant and coherent. Users can further refine outputs with detailed prompts and iterative generation.'
    },
    {
      question: 'Is my data and generated content secure?',
      answer: 'Absolutely. We prioritize the security and privacy of your data. All interactions and generated content are encrypted, and we adhere to strict data protection protocols. Your inputs and outputs are private to your account.'
    },
    {
      question: 'Can I integrate CognitoFlow with my existing tools?',
      answer: 'Yes, CognitoFlow offers a robust API for seamless integration with your existing platforms, workflows, and applications. Our Pro and Enterprise plans include full API access, allowing for automated content generation and more.'
    },
    {
      question: 'What is a \"generation credit\" and how is it used?',
      answer: 'A generation credit represents a unit of AI processing power. Different types and complexities of generations (e.g., a short text snippet vs. a detailed image) consume varying amounts of credits. You can track your credit usage in your dashboard, and more credits can be purchased or obtained with higher-tier plans.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-50 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16">
          Have more questions? We've compiled answers to the most common queries about CognitoFlow.
        </p>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-zinc-800 bg-opacity-40 border border-zinc-700/60 rounded-xl shadow-md backdrop-blur-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none hover:bg-zinc-700/50 transition-all duration-200 rounded-xl"
              >
                <span className="text-xl font-semibold text-gray-50">{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={`text-blue-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2">
                  <p className="text-lg text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}