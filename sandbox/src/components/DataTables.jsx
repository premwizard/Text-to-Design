import React, { useState } from 'react';
import { Table, List, ShoppingBag, Users, Globe } from 'lucide-react';

export default function DataTables() {
  const [activeTab, setActiveTab] = useState('products');

  const productData = [
    { id: '#001', name: 'Premium Analytics Suite', category: 'Software', sales: '$250K', units: '520', status: 'Active' },
    { id: '#002', name: 'Data Visualization Pack', category: 'Add-on', sales: '$180K', units: '780', status: 'Active' },
    { id: '#003', name: 'Cloud Integration Module', category: 'Service', sales: '$120K', units: '300', status: 'Inactive' },
    { id: '#004', name: 'AI Prediction Engine', category: 'Software', sales: '$300K', units: '450', status: 'Active' },
    { id: '#005', name: 'Custom Report Builder', category: 'Add-on', sales: '$90K', units: '610', status: 'Active' },
  ];

  const customerData = [
    { id: 'C001', name: 'Alice Smith', email: 'alice@example.com', totalOrders: '12', lastOrder: '2023-11-15', status: 'Active' },
    { id: 'C002', name: 'Bob Johnson', email: 'bob@example.com', totalOrders: '8', lastOrder: '2023-11-20', status: 'Active' },
    { id: 'C003', name: 'Charlie Brown', email: 'charlie@example.com', totalOrders: '5', lastOrder: '2023-10-01', status: 'Churned' },
    { id: 'C004', name: 'Diana Prince', email: 'diana@example.com', totalOrders: '20', lastOrder: '2023-12-01', status: 'Active' },
    { id: 'C005', name: 'Clark Kent', email: 'clark@example.com', totalOrders: '3', lastOrder: '2023-09-22', status: 'Active' },
  ];

  const transactionData = [
    { id: 'T001', customer: 'Alice Smith', item: 'Premium Suite', amount: '$499', date: '2023-11-15', status: 'Completed' },
    { id: 'T002', customer: 'Bob Johnson', item: 'Data Pack', amount: '$199', date: '2023-11-20', status: 'Completed' },
    { id: 'T003', customer: 'Diana Prince', item: 'AI Engine', amount: '$599', date: '2023-12-01', status: 'Completed' },
    { id: 'T004', customer: 'Clark Kent', item: 'Report Builder', amount: '$99', date: '2023-09-22', status: 'Pending' },
    { id: 'T005', customer: 'Alice Smith', item: 'Cloud Module', amount: '$299', date: '2023-10-05', status: 'Completed' },
  ];

  const renderTable = () => {
    if (activeTab === 'products') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="font-medium border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4">Product ID</th>
                <th scope="col" className="px-6 py-4">Product Name</th>
                <th scope="col" className="px-6 py-4">Category</th>
                <th scope="col" className="px-6 py-4">Total Sales</th>
                <th scope="col" className="px-6 py-4">Units Sold</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-emerald-300">{item.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-white">{item.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">{item.category}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-emerald-400">{item.sales}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.units}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'customers') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="font-medium border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4">Customer ID</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Total Orders</th>
                <th scope="col" className="px-6 py-4">Last Order</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-emerald-300">{item.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-white">{item.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">{item.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.totalOrders}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">{item.lastOrder}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'transactions') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="font-medium border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4">Transaction ID</th>
                <th scope="col" className="px-6 py-4">Customer</th>
                <th scope="col" className="px-6 py-4">Item</th>
                <th scope="col" className="px-6 py-4">Amount</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-emerald-300">{item.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-white">{item.customer}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">{item.item}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-emerald-400">{item.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">{item.date}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <section
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 lg:p-8 font-inter flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-space-grotesk text-white flex items-center">
          <Table className="mr-3 text-emerald-500" size={24} />
          Detailed Data Views
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
              ${activeTab === 'products' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-white/5 text-gray-400 border border-white/10'}
              hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-200`}
          >
            <ShoppingBag size={18} />
            Products
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
              ${activeTab === 'customers' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-white/5 text-gray-400 border border-white/10'}
              hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-200`}
          >
            <Users size={18} />
            Customers
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
              ${activeTab === 'transactions' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-white/5 text-gray-400 border border-white/10'}
              hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-200`}
          >
            <List size={18} />
            Transactions
          </button>
        </div>
      </div>

      {renderTable()}
    </section>
  );
}