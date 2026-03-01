import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const recentOrders = [
    { id: 'ORD-001', customer: 'Rahul Sharma', amount: 450, status: 'completed', date: '2024-03-01' },
    { id: 'ORD-002', customer: 'Priya Patel', amount: 280, status: 'processing', date: '2024-03-01' },
    { id: 'ORD-003', customer: 'Amit Kumar', amount: 650, status: 'pending', date: '2024-02-29' },
    { id: 'ORD-004', customer: 'Sneha Reddy', amount: 320, status: 'completed', date: '2024-02-29' },
    { id: 'ORD-005', customer: 'Vikram Singh', amount: 890, status: 'processing', date: '2024-02-28' },
  ];

  const users = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', orders: 45, spent: 12500, status: 'active' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', orders: 32, spent: 8900, status: 'active' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', orders: 28, spent: 7600, status: 'active' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', orders: 19, spent: 5200, status: 'inactive' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'processing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                ⚙️
              </div>
              <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Manage users, orders, and system settings
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  👥
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  +24
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">1,247</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  📊
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  +18%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">3,842</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  💰
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                  +32%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">₹2,45,680</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  🖨️
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Active Printers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📦 Orders
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              👥 Users
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span>📋</span> Recent Orders
                </h3>
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">₹{order.amount}</p>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span>⚡</span> Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl hover:shadow-lg transition-all border-2 border-blue-200 dark:border-blue-800 hover:scale-105">
                    <div className="text-4xl mb-3">➕</div>
                    <p className="font-semibold text-gray-900 dark:text-white">Add User</p>
                  </button>
                  <button className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl hover:shadow-lg transition-all border-2 border-green-200 dark:border-green-800 hover:scale-105">
                    <div className="text-4xl mb-3">📊</div>
                    <p className="font-semibold text-gray-900 dark:text-white">View Reports</p>
                  </button>
                  <button className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl hover:shadow-lg transition-all border-2 border-purple-200 dark:border-purple-800 hover:scale-105">
                    <div className="text-4xl mb-3">⚙️</div>
                    <p className="font-semibold text-gray-900 dark:text-white">Settings</p>
                  </button>
                  <button className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl hover:shadow-lg transition-all border-2 border-orange-200 dark:border-orange-800 hover:scale-105">
                    <div className="text-4xl mb-3">🖨️</div>
                    <p className="font-semibold text-gray-900 dark:text-white">Manage Printers</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">All Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 font-semibold">Order ID</th>
                      <th className="text-left py-4 px-4 font-semibold">Customer</th>
                      <th className="text-left py-4 px-4 font-semibold">Date</th>
                      <th className="text-left py-4 px-4 font-semibold">Amount</th>
                      <th className="text-left py-4 px-4 font-semibold">Status</th>
                      <th className="text-left py-4 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="py-4 px-4 font-semibold">{order.id}</td>
                        <td className="py-4 px-4">{order.customer}</td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{order.date}</td>
                        <td className="py-4 px-4 font-bold">₹{order.amount}</td>
                        <td className="py-4 px-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-semibold">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">User Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 font-semibold">Name</th>
                      <th className="text-left py-4 px-4 font-semibold">Email</th>
                      <th className="text-left py-4 px-4 font-semibold">Orders</th>
                      <th className="text-left py-4 px-4 font-semibold">Total Spent</th>
                      <th className="text-left py-4 px-4 font-semibold">Status</th>
                      <th className="text-left py-4 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="py-4 px-4 font-semibold">{user.name}</td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                        <td className="py-4 px-4">{user.orders}</td>
                        <td className="py-4 px-4 font-bold">₹{user.spent.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-700 font-semibold mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-700 font-semibold">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
