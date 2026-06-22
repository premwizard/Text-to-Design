import React, { useState } from 'react';

export default function InteractiveStats() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto p-4 lg:p-8 flex flex-col items-center">
      <h2 className="text-3xl mb-4">Metrics That Matter</h2>
      <button className="bg-purple-500 hover:opacity-90 transition-all duration-200 cursor-pointer text-zinc-100 py-2 px-4 rounded" onClick={() => setCount(count + 1)}>Increase Count</button>
      <p className="text-5xl font-bold mt-4">{count}</p>
    </div>
  );
}