import React from 'react';
import { Star, Code, Lightbulb } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl">
        {/* Left Section: Image or Illustration */}
        <div className="relative hidden lg:flex justify-center items-center h-full">
          <div className="relative w-full h-full aspect-square max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
              alt="Creative design process"
              className="rounded-2xl object-cover object-center shadow-lg w-full h-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-purple-500 p-4 rounded-full shadow-xl animate-pulse">
              <Star className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Right Section: About Me Content */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 text-gray-800">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 drop-shadow-sm">About Me</h2>
          
          <p className="text-lg leading-relaxed mb-6">
            Hello! I'm Alex Rivera, the creative force behind <span className="font-bold text-purple-500">ArtisanAlloy</span>. With a passion for crafting digital experiences that resonate, I merge aesthetic design with robust functionality to deliver solutions that are both beautiful and effective.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            My journey in design and development began with a fascination for how technology can shape human interaction. Over the past 8 years, I've honed my skills in UI/UX design, front-end development, and visual storytelling, working with startups and established brands alike.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            I believe in a collaborative approach, transforming client visions into tangible, user-centric products. My goal is to not just build websites or apps, but to create intuitive digital ecosystems that elevate brands and engage audiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex items-center text-lg font-medium text-gray-700">
              <Code className="text-purple-500 mr-3" size={24} />
              Clean Code Architect
            </div>
            <div className="flex items-center text-lg font-medium text-gray-700">
              <Lightbulb className="text-purple-500 mr-3" size={24} />
              Innovative Solutions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}