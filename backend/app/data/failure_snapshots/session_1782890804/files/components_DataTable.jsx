import React from 'react';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-zinc-800 text-zinc-200 rounded-md shadow-sm p-4 border border-zinc-700">
        <p className="text-center text-zinc-400">No data available.</p>
      </div>
    );
  }

  const headers = Object.keys(data[0]).filter(key => key !== 'id');

  return (
    <div className="bg-zinc-800 text-zinc-200 rounded-md shadow-sm border border-zinc-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead className="bg-zinc-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                >
                  {header.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-700 transition-colors duration-200">
                {headers.map((header) => (
                  <td
                    key={`${row.id}-${header}`}
                    className="px-4 py-2 whitespace-nowrap text-sm text-zinc-300"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Basic Pagination Placeholder */}
      <div className="px-4 py-2 border-t border-zinc-700 bg-zinc-700 text-xs text-zinc-400 flex justify-between items-center">
        <span>Showing 1 to {data.length} of {data.length} results</span>
        <div className="flex space-x-1">
          <button className="px-2 py-1 rounded-md hover:bg-zinc-600 transition-colors duration-200">Previous</button>
          <button className="px-2 py-1 rounded-md bg-zinc-600 text-white">1</button>
          <button className="px-2 py-1 rounded-md hover:bg-zinc-600 transition-colors duration-200">Next</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;