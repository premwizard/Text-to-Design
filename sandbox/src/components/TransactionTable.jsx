import React, { useState, useEffect } from 'react';
import { AiOutlineInfoCircle } from 'lucide-react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2024-02-16',
      type: 'Incoming',
      amount: 120.5,
      status: 'Pending',
    },
    {
      id: 2,
      date: '2024-02-15',
      type: 'Outgoing',
      amount: 35.2,
      status: 'Success',
    },
    {
      id: 3,
      date: '2024-02-14',
      type: 'Incoming',
      amount: 90.8,
      status: 'Failed',
    },
  ]);

  const handleSort = (field) => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (field === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (field === 'type') {
        return a.type.localeCompare(b.type);
      } else if (field === 'amount') {
        return a.amount - b.amount;
      } else if (field === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
    setTransactions(sortedTransactions);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Transaction History</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-indigo-400 font-bold py-2 px-4 rounded-md"
          onClick={() => setTransactions([])}
        >
          Clear Transactions
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-800">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th
                className="py-2 px-4 text-sm font-bold border border-gray-800"
                onClick={() => handleSort('date')}
              >
                Date
              </th>
              <th
                className="py-2 px-4 text-sm font-bold border border-gray-800"
                onClick={() => handleSort('type')}
              >
                Type
              </th>
              <th
                className="py-2 px-4 text-sm font-bold border border-gray-800"
                onClick={() => handleSort('amount')}
              >
                Amount
              </th>
              <th
                className="py-2 px-4 text-sm font-bold border border-gray-800"
                onClick={() => handleSort('status')}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-gray-700">
                <td className="py-2 px-4 border border-gray-800">{transaction.date}</td>
                <td className="py-2 px-4 border border-gray-800">
                  {transaction.type === 'Incoming' ? (
                    <span className="bg-green-500 text-white py-1 px-2 rounded-md">
                      {transaction.type}
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white py-1 px-2 rounded-md">
                      {transaction.type}
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-800">
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border border-gray-800">
                  <span
                    className={`bg-${transaction.status === 'Pending' ? 'yellow-500' : transaction.status === 'Success' ? 'green-500' : 'red-500'} text-white py-1 px-2 rounded-md`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-gray-400 text-sm mt-4">
        <span>
          <AiOutlineInfoCircle className="mr-2" />
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TransactionTable;