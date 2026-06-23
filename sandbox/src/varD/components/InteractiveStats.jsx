import React, { useState, useEffect } from 'react';

export default function InteractiveStats() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div className="container mx-auto p-12 pt-24 md:p-24 lg:px-32 xl:px-40">
      <h2 className="text-2xl lg:text-3xl font-bold text-zinc-100 mb-4">Interactive Stats</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:space-x-8">
        <div className="lg:w-1/2">
          <h3 className="text-xl text-zinc-100 font-bold mb-2">Number of Users</h3>
          <p className="text-zinc-100 text-3xl font-bold">{count}</p>
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-xl text-zinc-100 font-bold mb-2">Number of Transactions</h3>
          <p className="text-zinc-100 text-3xl font-bold">{count * 2}</p>
        </div>
      </div>
    </div>
  );
}