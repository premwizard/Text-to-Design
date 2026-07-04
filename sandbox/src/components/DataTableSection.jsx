import React, { useState, useEffect } from 'react';

function DataTableSection() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
  ]);

  return (
    <section className="bg-white py-10 md:py-12 lg:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-4">Data Table</h2>
        <table className="w-full table-auto border-collapse border border-zinc-100">
          <thead className="bg-zinc-100">
            <tr>
              <th className="py-2 px-4 text-left text-zinc-900">ID</th>
              <th className="py-2 px-4 text-left text-zinc-900">Name</th>
              <th className="py-2 px-4 text-left text-zinc-900">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-4 text-zinc-900">{row.id}</td>
                <td className="py-2 px-4 text-zinc-900">{row.name}</td>
                <td className="py-2 px-4 text-zinc-900">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DataTableSection;