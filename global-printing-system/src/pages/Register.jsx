import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Printer, Mail, Lock, User, Phone, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(formData);
      navigate('/', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-crimson-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />

      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <div className="glass-card rounded-[3.5rem] p-12 lg:p-16 border border-white/10 shadow-2xl">
            <div className="text-center mb-12">
              <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                <Sparkles className="text-white w-10 h-10" />
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter mb-4 italic">Join the Network</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Premium Printing Infrastructure</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                      placeholder="Identified As"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                      placeholder="Comm Link"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                      placeholder="Signal Number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Encryption Key</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Confirm Key</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary h-18 text-lg font-black tracking-widest uppercase rounded-2xl group"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <span className="flex items-center gap-3">
                        Initialize
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>

            <p className="mt-12 text-center text-sm font-bold text-slate-500">
              Returning Member?{' '}
              <Link to="/" className="text-red-500 hover:text-red-400 transition-colors">
                Authorize Here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
