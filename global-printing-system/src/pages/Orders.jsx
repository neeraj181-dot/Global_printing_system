import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { orderAPI } from '../services/api';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-500 text-white', icon: '✅', label: 'Completed' };
      case 'printing':
        return { color: 'bg-blue-500 text-white', icon: '🖨️', label: 'Printing' };
      case 'queued':
        return { color: 'bg-amber-500 text-white', icon: '⏳', label: 'Queued' };
      default:
        return { color: 'bg-gray-500 text-white', icon: '⚠️', label: status };
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
      
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter mb-3">
                My <span className="gradient-text">Orders</span>
              </h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Track your printing orders and queue status
              </p>
            </div>
            <div className="glass-card px-6 py-4 rounded-3xl shadow-xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-red-500/20">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Orders</p>
                <p className="text-2xl font-black text-white">{orders.length}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-white/10 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="glass-card rounded-[3rem] p-16 text-center border-2 border-red-500/20 shadow-2xl">
              <span className="text-6xl mb-4 block">⚠️</span>
              <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Error Loading Orders</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{error}</p>
              <button onClick={fetchOrders} className="btn-primary">
                Retry
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="glass-card rounded-[3rem] p-20 text-center border border-white/10 shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-500/20">
                <span className="text-5xl">📦</span>
              </div>
              <h3 className="text-4xl font-black text-white mb-3 tracking-tighter">No Orders Yet</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Start by creating your first print order</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary h-16 px-12 text-lg font-black tracking-widest uppercase rounded-2xl"
              >
                Create Order
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => {
                const status = getStatusConfig(order.status);

                return (
                  <div
                    key={order._id}
                    className="glass-card rounded-[3rem] shadow-2xl border border-white/10 p-10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* File Preview Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-28 bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-2xl border border-white/10">
                          <span className="text-4xl mb-2">📄</span>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            .{order.fileName.split('.').pop()}
                          </p>
                        </div>
                      </div>

                      {/* Order Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${status.color} flex items-center gap-2`}>
                            <span>{status.icon}</span>
                            {status.label}
                          </span>
                          
                          <span className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 border-2 border-purple-500/30 flex items-center gap-2">
                            <span>🎯</span>
                            Queue #{order.queueNumber}
                          </span>
                          
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <span>📅</span>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-white truncate mb-6 tracking-tight">
                          {order.fileName}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="font-bold text-slate-300 text-xs font-mono">
                              {order._id.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Pages</p>
                            <p className="font-bold text-slate-300 flex items-center gap-2">
                              <span>📑</span>
                              {order.pages} ({order.effectivePages} effective)
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Copies</p>
                            <p className="font-bold text-slate-300">
                              {order.copies}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Print Type</p>
                            <p className="font-bold text-slate-300 uppercase">
                              {order.printType === 'bw' ? '⚫ B&W' : '🎨 Color'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Paper Size</p>
                            <p className="font-bold text-slate-300">
                              {order.paperSize}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Double-sided</p>
                            <p className="font-bold text-slate-300">
                              {order.doubleSided ? '✅ Yes' : '❌ No'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Binding</p>
                            <p className="font-bold text-slate-300">
                              {order.binding ? '✅ Yes' : '❌ No'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="lg:w-44 flex flex-col items-end justify-between border-l-2 border-white/10 pl-8">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Price</p>
                          <p className="text-4xl font-black gradient-text">₹{order.totalPrice}</p>
                          <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-1">No GST</p>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 text-white rounded-xl text-xs font-black tracking-widest uppercase hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
                          View Details
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Orders;
