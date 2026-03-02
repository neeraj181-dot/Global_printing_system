import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { ShieldAlert, Mail, Lock, ArrowRight, Loader2, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await authAPI.adminLogin({ email, password });
      login(data, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Access Denied. Credentials Invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.1),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass-card rounded-[3rem] p-12 lg:p-16 border border-white/5 shadow-2xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/5">
              <ShieldAlert className="text-red-500 w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic">Admin <span className="text-red-600">Secure</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Restricted Infrastructure Port</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Root Identifier</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-700"
                  placeholder="admin@system.internal"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Override Key</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full h-18 bg-red-600 hover:bg-red-700 text-white text-lg font-black tracking-widest uppercase rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-red-900/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Bypass Authorization
                  <Key size={20} />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-center text-slate-500 font-black uppercase tracking-widest leading-relaxed">
              ⚠️ Warning: All administrative actions are logged and encrypted. Unauthorized access will trigger a security isolation event.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
