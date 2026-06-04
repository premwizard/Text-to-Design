import React from 'react';

export default function DetailedTable() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', revenue: 100 },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', revenue: 200 },
    { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com', revenue: 300 }
  ];

  return (
    <div className="bg-zinc-800 py-4 px-6 rounded-lg mt-4 lg:mt-6 xl:mt-8">
      <h2 className="text-lg font-medium text-gray-200">Detailed Table</h2>
      <table className="w-full text-gray-200">
        <thead>
          <tr>
            <th className="py-2 lg:py-4">Name</th>
            <th className="py-2 lg:py-4">Email</th>
            <th className="py-2 lg:py-4">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 lg:py-4">{item.name}</td>
              <td className="py-2 lg:py-4">{item.email}</td>
              <td className="py-2 lg:py-4">${item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}