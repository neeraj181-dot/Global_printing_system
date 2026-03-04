import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Authentication failed. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-crimson-600/20 rounded-full blur-[120px] animate-pulse" />

      {/* Left side: Hero (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-24 relative z-10">
        <div className="max-w-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-red-500/20">
            <span className="text-5xl">🖨️</span>
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter leading-none mb-8">
            The Future of <br />
            <span className="gradient-text">Global Printing</span>
          </h1>
          <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
            Experience high-fidelity document reproduction with our premium, global processing network. Order in seconds, delivered in minutes.
          </p>
          <div className="flex gap-10">
            <div>
              <p className="text-3xl font-black text-white tracking-tighter">10k+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Happy Clients</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-black text-white tracking-tighter">0.5s</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processing Speed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-lg">
          <div className="glass-card rounded-[3.5rem] p-12 lg:p-16 border border-white/10 shadow-2xl">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure Access Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest leading-relaxed">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Digital Identity</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl">📧</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">Access Key</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl">🔒</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white font-bold outline-none focus:border-red-600/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary h-18 text-lg font-black tracking-widest uppercase rounded-2xl relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Authorize Access
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="px-6 bg-slate-900 text-slate-500">Or Continue With</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl py-4 hover:bg-white/10 transition-all group"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-white font-bold uppercase tracking-widest text-[10px]">Continue with Google</span>
              </button>
            </div>

            <p className="mt-10 text-center text-sm font-bold text-slate-500">
              New here?{' '}
              <Link to="/register" className="text-red-500 hover:text-red-400 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
