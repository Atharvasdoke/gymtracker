import { Outlet, NavLink } from 'react-router-dom';
import { Home, Clock, Dumbbell } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Top Header */}
      <header className="bg-surface p-4 shadow-sm text-center font-bold text-xl text-primary">
        Gym Tracker
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto p-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-surface border-t border-slate-700 p-3 pb-safe z-50">
        <div className="flex justify-around max-w-md mx-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive ? 'text-primary' : 'text-textMuted hover:text-textMain'
              }`
            }
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive ? 'text-primary' : 'text-textMuted hover:text-textMain'
              }`
            }
          >
            <Clock size={24} />
            <span className="text-xs mt-1">History</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
