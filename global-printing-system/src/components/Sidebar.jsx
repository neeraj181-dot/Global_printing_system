import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'My Orders', path: '/orders', icon: '📦' },
  ];

  return (
    <aside className="w-80 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col relative z-20">
      {/* Logo Section */}
      <div className="p-10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/20">
            <span className="text-3xl">🖨️</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              Global<span className="gradient-text">Print</span>
            </h1>
            <div className="flex items-center gap-1.5 opacity-50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">v2.4.0 High-Perf</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Main Engine</p>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-red-600/20 text-white border-2 border-red-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border-2 border-transparent'
              }`
            }
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-bold text-sm tracking-tight">{item.name}</span>
            </div>
            <span className={`w-2 h-2 rounded-full ${item.path === window.location.pathname ? 'bg-red-500' : 'bg-transparent'}`} />
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-6">
        <div className="bg-white/5 rounded-3xl p-6 border border-white/10 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-black text-lg shadow-2xl shadow-red-500/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate text-white tracking-tight">{user?.name}</p>
              <p className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-widest">Professional Account</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-3 h-12 text-[10px] font-black text-slate-400 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-xl transition-all border border-white/10 hover:border-red-500/30 flex items-center justify-center gap-2"
          >
            TERMINATE SESSION
            <span>→</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
