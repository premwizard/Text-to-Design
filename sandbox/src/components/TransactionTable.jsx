import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { CTAButton } from './CTAButton';

const TransactionTable = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const transactions = [
    {
      id: 1,
      date: '2024-03-10',
      type: 'Income',
      amount: '$1,234.56',
      status: 'success',
    },
    {
      id: 2,
      date: '2024-03-09',
      type: 'Expense',
      amount: '-$543.21',
      status: 'error',
    },
    {
      id: 3,
      date: '2024-03-08',
      type: 'Transfer',
      amount: '$1,000.00',
      status: 'warning',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6 text-zinc-400 dark:text-zinc-600">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-4">
        Transaction History
      </h2>
      <CTAButton
        variant="outline"
        onClick={handleCollapse}
        className="mb-4 mr-4"
      >
        {collapsed ? (
          <CheckCircleIcon className="mr-2" />
        ) : (
          <XCircleIcon className="mr-2" />
        )}
        Show/Hide
      </CTAButton>
      <div className={`transition-all duration-300 ${collapsed ? 'hidden' : ''}`}>
        <Table className="border-collapse border border-gray-100 dark:border-zinc-800">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index} className="hover:bg-zinc-700 dark:hover:bg-zinc-900">
                <Td>{transaction.date}</Td>
                <Td className={`text-${transaction.status === 'success' ? 'green-500' : transaction.status === 'error' ? 'red-500' : 'yellow-500'}`}>
                  {transaction.type}
                </Td>
                <Td>
                  {transaction.amount}
                </Td>
                <Td className={`text-${transaction.status === 'success' ? 'green-500' : transaction.status === 'error' ? 'red-500' : 'yellow-500'}`}>
                  <span className={`inline-block rounded-full px-2 py-1 text-${transaction.status === 'success' ? 'green-500' : transaction.status === 'error' ? 'red-500' : 'yellow-500'} ${transaction.status === 'success' ? 'bg-green-500' : transaction.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {transaction.status}
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;