import React from 'react';

export default function ManifestoText() {
  const manifestoTitle = "Our Philosophy";
  const manifestoPoints = [
    "We believe in the power of intention. Every pixel, every interaction, serves a purpose.",
    "Authenticity over trends. We build lasting brands, not fleeting fads.",
    "Embrace the edge. The uncomfortable, the unexpected – that's where true innovation lies.",
    "Clarity in chaos. We bring order to complex digital landscapes.",
    "Impact is the metric. We design for results, not just aesthetics."
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="lg:col-span-1">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-yellow-400 uppercase">
            {manifestoTitle}
          </h2>
        </div>
        <div className="lg:col-span-1">
          <div className="space-y-8">
            {manifestoPoints.map((point, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-6 py-2">
                <p className="text-lg leading-relaxed text-gray-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}