import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react-native';
import { Link } from 'react-router-dom';

const DataTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
  };

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
  ];

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (pageNumber - 1) * rowsPerPage,
    pageNumber * rowsPerPage
  );

  return (
    <div className="bg-zinc-600 p-4 md:p-6 lg:p-8 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-zinc-400 text-lg font-medium">Data Table</h2>
        <div className="flex items-center">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
            className="bg-zinc-500 p-2 pl-10 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 w-64 md:w-80 lg:w-96"
          />
          <button
            className="ml-4 bg-zinc-500 hover:bg-zinc-700 p-2 rounded-md text-zinc-200"
            onClick={handleToggle}
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-zinc-400 text-sm">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="bg-zinc-500 p-2 pl-10 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 w-32 md:w-40 lg:w-48"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-zinc-400 text-sm">Page:</label>
            <div className="flex items-center">
              <button
                className="bg-zinc-500 hover:bg-zinc-700 p-2 rounded-md text-zinc-200"
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
              >
                <ChevronDown size={20} />
              </button>
              <span className="text-zinc-200 mx-2">{pageNumber}</span>
              <button
                className="bg-zinc-500 hover:bg-zinc-700 p-2 rounded-md text-zinc-200"
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === Math.ceil(filteredData.length / rowsPerPage)}
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full table-auto">
        <thead className="bg-zinc-500 text-zinc-200">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              className={`bg-zinc-500 hover:bg-zinc-700 cursor-pointer ${
                selectedRow === row ? 'bg-zinc-700' : ''
              }`}
              onClick={() => handleRowSelect(row)}
            >
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;