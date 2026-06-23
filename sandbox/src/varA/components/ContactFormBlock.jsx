import React, { useState } from 'react';

export default function ContactFormBlock() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
            style={{ fontFamily: 'Playfair Display, serif' }}>
          Ready to Start a Project?
        </h2>

        <div className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-xl border border-gray-100">
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question, a project idea, or just want to say hello, feel free to reach out using the form below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              ></textarea>
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}