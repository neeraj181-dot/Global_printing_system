import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { orderAPI } from '../services/api';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getUserOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'printing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ready':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Orders</span> 📦
            </h1>
            <p className="text-gray-400 text-lg">
              Track and manage your printing orders
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-20 text-center">
              <div className="text-7xl mb-4">📭</div>
              <h3 className="text-3xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-gray-400 text-lg">Start by creating your first print order!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-3xl">📄</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{order.fileName}</h3>
                          <p className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <p className="text-xs text-gray-400 mb-1">Pages</p>
                          <p className="font-semibold text-white">{order.totalPages} pages</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <p className="text-xs text-gray-400 mb-1">Type</p>
                          <p className="font-semibold text-white">{order.printType === 'color' ? 'Color' : 'B&W'}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <p className="text-xs text-gray-400 mb-1">Copies</p>
                          <p className="font-semibold text-white">{order.copies}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <p className="text-xs text-gray-400 mb-1">Pickup Time</p>
                          <p className="font-semibold text-white">{order.pickupTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          ₹{order.finalAmount}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <span className={`text-xs font-semibold px-4 py-2 rounded-lg border-2 ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus.toUpperCase()}
                        </span>
                        <span className={`text-xs font-semibold px-4 py-2 rounded-lg border-2 ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;
