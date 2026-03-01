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
    { name: 'Dashboard', path: '/dashboard', icon: '📊', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'My Orders', path: '/orders', icon: '📦', gradient: 'from-purple-500 to-pink-500' },
  ];

  return (
    <aside className="w-72 bg-slate-900/90 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col shadow-2xl">
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🖨️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Global Print
            </h1>
            <p className="text-xs text-gray-400 font-medium">Premium Service</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg scale-105'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white hover:scale-102'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-2xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className="font-semibold">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-4 mb-3 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border-2 border-red-500/20 hover:border-red-500/40"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
