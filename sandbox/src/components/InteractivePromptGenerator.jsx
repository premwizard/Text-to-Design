import React, { useState } from 'react';
import { Image, Wand2, RefreshCw, Download, Star } from 'lucide-react';

export default function InteractivePromptGenerator() {
  const [prompt, setPrompt] = useState('A futuristic city skyline at sunset, cyberpunk aesthetic, highly detailed, volumetric lighting.');
  const [generatedImage, setGeneratedImage] = useState('https://source.unsplash.com/random/800x600/?cyberpunk-city,ai-art');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const handleGenerate = () => {
    setIsLoading(true);
    // Simulate API call for generation
    setTimeout(() => {
      const newImageSeed = Math.floor(Math.random() * 1000);
      setGeneratedImage(`https://source.unsplash.com/random/800x600/?${prompt.split(' ').join('-')},ai-art,${newImageSeed}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section id="generate" className="py-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4 font-space-grotesk">Craft Your Vision Instantly</h2>
        <p className="text-lg text-gray-300 font-inter max-w-3xl mx-auto">Input your prompt, select your preferred styles, and let SynthAI bring your imagination to life with stunning visuals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Prompt and Controls Section */}
        <div className="flex flex-col gap-6">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-50 mb-4 font-space-grotesk">Enter Your Prompt</h3>
            <textarea
              className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none font-inter"
              placeholder="Describe what you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin mr-2" size={20} />
              ) : (
                <Wand2 className="mr-2" size={20} />
              )}
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-50 mb-4 font-space-grotesk">Generation Settings</h3>
            <div className="mb-4">
              <label htmlFor="style" className="block text-gray-300 text-sm font-medium mb-2 font-inter">Style Preset</label>
              <select
                id="style"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-inter appearance-none pr-8"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23a1a1aa' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em'}}
              >
                <option value="Photorealistic">Photorealistic</option>
                <option value="Abstract">Abstract Art</option>
                <option value="Cyberpunk">Cyberpunk</option>
                <option value="Fantasy">Fantasy Art</option>
                <option value="Anime">Anime Style</option>
              </select>
            </div>

            <div>
              <label htmlFor="aspectRatio" className="block text-gray-300 text-sm font-medium mb-2 font-inter">Aspect Ratio</label>
              <select
                id="aspectRatio"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-inter appearance-none pr-8"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23a1a1aa' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em'}}
              >
                <option value="1:1">Square (1:1)</option>
                <option value="16:9">Widescreen (16:9)</option>
                <option value="9:16">Portrait (9:16)</option>
                <option value="3:2">Classic (3:2)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generated Output Section */}
        <div className="relative flex items-center justify-center p-4 min-h-[300px] lg:min-h-full">
          <div className="w-full h-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden group">
            {isLoading ? (
              <div className="flex flex-col items-center text-gray-400">
                <RefreshCw className="animate-spin mb-4" size={48} />
                <p className="text-lg font-inter">Conjuring your masterpiece...</p>
              </div>
            ) : (
              <img
                src={generatedImage}
                alt="Generated AI Image"
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {!isLoading && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-xl">
                <div className="flex space-x-4">
                  <button className="p-3 bg-blue-500 text-white rounded-full hover:opacity-80 transition-all duration-200 cursor-pointer">
                    <Download size={24} />
                  </button>
                  <button className="p-3 bg-white/20 text-white rounded-full hover:opacity-80 transition-all duration-200 cursor-pointer">
                    <Star size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}