import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      // Error already logged in AuthContext
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <nav className="px-6 py-4 border-b border-white/10 bg-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Phish<span className="text-cyan-400">Guard</span> AI
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        <aside className="w-64 border-r border-white/10 bg-gray-800 p-6">
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive('/dashboard')
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/scan"
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive('/scan')
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Scan URL
            </Link>
            <Link
              to="/reports"
              className={`block px-4 py-3 rounded-lg transition-colors ${
                isActive('/reports')
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Reports
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
