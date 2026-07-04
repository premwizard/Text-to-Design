import React, { useState, useEffect } from 'react';

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        const data = [
          { id: 1, date: '2023-01-01', amount: 100.0, type: 'Credit', description: 'Online Purchase' },
          { id: 2, date: '2023-01-02', amount: 200.0, type: 'Debit', description: 'Subscription Renewal' },
          { id: 3, date: '2023-01-03', amount: 300.0, type: 'Credit', description: 'Salary Deposit' },
          { id: 4, date: '2023-01-04', amount: 50.0, type: 'Debit', description: 'Coffee Shop' },
          { id: 5, date: '2023-01-05', amount: 150.0, type: 'Credit', description: 'Refund' },
        ];
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.date.includes(searchTerm) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-slate-900 mb-10 md:mb-12 lg:mb-16 leading-tight">
        Your Recent <span className="text-blue-600">Transactions</span>
      </h2>
      <div className="mb-8 flex justify-center">
        <input
          type="search"
          placeholder="Search by date, type, or description..."
          className="w-full max-w-lg py-3 px-5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search transactions"
        />
      </div>

      {loading && (
        <div className="text-center text-slate-600 text-lg md:text-xl py-8">
          Loading transactions...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 text-lg md:text-xl py-8">
          Error: {error}
        </div>
      )}

      {!loading && !error && (transactions.length === 0 ? (
        <div className="text-center text-slate-600 text-lg md:text-xl py-8">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-slate-200">
          <table className="min-w-full bg-white divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-base text-slate-800">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-slate-900">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-base font-medium ${
                      transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-slate-800">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TransactionTable;