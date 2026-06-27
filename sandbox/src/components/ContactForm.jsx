import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API or email service
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
  };

  return (
    <section className="bg-gray-900 text-gray-300 py-20 px-4 font-['Inter']">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Information Column */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold text-indigo-400 mb-6 font-['Outfit', sans-serif]">Get in Touch</h2>
            <p className="text-lg text-gray-400 mb-8">
              Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>

            <div className="mb-8 flex items-start space-x-4">
              <Mail className="h-8 w-8 text-indigo-500 flex-shrink-0 transition-colors duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 font-['Outfit', sans-serif]">Email</h3>
                <p className="text-gray-400">info@auracreative.dev</p>
              </div>
            </div>

            <div className="mb-8 flex items-start space-x-4">
              <Phone className="h-8 w-8 text-indigo-500 flex-shrink-0 transition-colors duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 font-['Outfit', sans-serif]">Phone</h3>
                <p className="text-gray-400">+1 (123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-8 w-8 text-indigo-500 flex-shrink-0 transition-colors duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1 font-['Outfit', sans-serif]">Location</h3>
                <p className="text-gray-400">123 Creative Way, Innovation City, CA 90210</p>
              </div>
            </div>

            {/* Subtle Gradient Background for this section */}
            <div className="mt-12 h-48 rounded-2xl shadow-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-center p-6">
              <p className="text-gray-400 font-['Inter']">
                We are passionate about turning your ideas into stunning digital realities.
              </p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2 bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl border border-gray-700 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-300 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 font-['Inter']">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-none transition-all duration-300 ease-in-out"
                ></textarea>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;