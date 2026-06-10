import { Outlet, NavLink } from 'react-router-dom';
import { Home, Clock } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen pb-24 relative overflow-hidden">
      {/* Top Header */}
      <header className="p-6 text-center font-bold text-2xl tracking-tight bg-gradient-to-r from-primary to-primaryHover bg-clip-text text-transparent drop-shadow-sm">
        Gym Tracker
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-5">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-50 pointer-events-none">
        <nav className="w-full max-w-sm bg-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl pointer-events-auto">
          <div className="flex justify-around">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 ${
                  isActive ? 'text-primary bg-primary/10 scale-105' : 'text-textMuted hover:text-textMain hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Home size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-[10px] font-medium tracking-wide">Home</span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_2px_rgba(6,182,212,0.5)]" />
                  )}
                </>
              )}
            </NavLink>
            
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 ${
                  isActive ? 'text-primary bg-primary/10 scale-105' : 'text-textMuted hover:text-textMain hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Clock size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-[10px] font-medium tracking-wide">History</span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_2px_rgba(6,182,212,0.5)]" />
                  )}
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
