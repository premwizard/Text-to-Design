import React, { useState } from 'react';
import { Wand2, Image, MessageSquare, Code, Settings } from 'lucide-react';

export default function GenerationPanel() {
  const [activeTab, setActiveTab] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'text', name: 'Text', icon: MessageSquare },
    { id: 'image', name: 'Image', icon: Image },
    { id: 'code', name: 'Code', icon: Code },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleGenerate = () => {
    setIsLoading(true);
    setOutput('');
    // Simulate API call
    setTimeout(() => {
      let generatedContent = "";
      if (activeTab === 'text') {
        generatedContent = `Generated Article Draft based on: "${prompt}"\n\nIntroduction: This is an AI-generated introductory paragraph exploring the topic provided. The AI has analyzed various sources to synthesize a coherent opening.\n\nBody: Further elaboration on key aspects, offering insights and structured arguments. The depth and style are tailored to the input prompt, aiming for relevance and engagement.\n\nConclusion: A concise summary of the points discussed, potentially suggesting future directions or a call to action.`;
      } else if (activeTab === 'image') {
        generatedContent = `Image generated for: "${prompt}"\n[A placeholder for an AI-generated image preview URL or a visual component would go here. For example, a small thumbnail or description.]`;
      } else if (activeTab === 'code') {
        generatedContent = `// AI-generated code snippet for: "${prompt}"\nfunction generateSolution(input) {\n  // Complex logic based on your prompt\n  console.log('Generating solution for:', input);\n  return 'console.log("Hello from CognitoFlow AI Code!");';\n}`;
      } else if (activeTab === 'settings') {
        generatedContent = 'Please go to your account dashboard to adjust advanced generation settings.';
      }
      setOutput(generatedContent);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg md:max-w-xl bg-zinc-800 bg-opacity-40 border border-zinc-700/60 rounded-3xl p-6 shadow-xl backdrop-blur-lg">
      <div className="flex mb-6 border-b border-zinc-700/60">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-3 text-lg font-medium transition-all duration-200
              ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
          >
            <tab.icon size={20} className="mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab !== 'settings' && (
          <div className="relative">
            <textarea
              className="w-full p-4 h-32 bg-zinc-700 bg-opacity-60 border border-zinc-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 resize-none"
              placeholder={`Enter your ${activeTab} generation prompt here...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className={`mt-4 w-full flex items-center justify-center px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-200 cursor-pointer
                ${isLoading || !prompt.trim() ? 'bg-blue-600/50 text-gray-400 cursor-not-allowed' : 'bg-blue-400 text-white hover:opacity-90'}`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Wand2 className="mr-2" size={20} />
              )}
              {isLoading ? 'Generating...' : `Generate ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-4 text-gray-300">
            <h3 className="text-2xl font-bold text-gray-50 mb-4">Generation Settings</h3>
            <p className="mb-2">Here you can fine-tune your AI models. Available options vary by subscription tier.</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><span className="font-medium text-blue-300">Creativity Level:</span> <input type="range" min="0" max="100" value="70" className="w-full accent-blue-400" /></li>
                <li><span className="font-medium text-blue-300">Output Length:</span> <select className="bg-zinc-700 bg-opacity-60 border border-zinc-600 rounded-lg p-2 focus:ring-blue-400 focus:border-blue-400 ml-2"> <option>Short</option><option>Medium</option><option>Long</option> </select></li>
                <li><span className="font-medium text-blue-300">Tone:</span> <select className="bg-zinc-700 bg-opacity-60 border border-zinc-600 rounded-lg p-2 focus:ring-blue-400 focus:border-blue-400 ml-2"> <option>Professional</option><option>Casual</option><option>Academic</option> </select></li>
            </ul>
            <button className="mt-6 w-full px-6 py-3 bg-blue-400 text-white rounded-full text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer">
              Save Settings
            </button>
          </div>
        )}

        {output && (
          <div className="mt-6 p-4 bg-zinc-700 bg-opacity-60 border border-zinc-600 rounded-xl text-gray-200 leading-relaxed overflow-auto max-h-60">
            <h4 className="font-semibold text-blue-300 mb-2">Generated Output:</h4>
            <p className="whitespace-pre-wrap text-gray-300">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}