import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USERS, SPLITS } from '../data/splits';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(USERS[0]);
  
  const handleStartWorkout = (splitName) => {
    navigate('/workout', { state: { user: selectedUser, splitName, exercises: SPLITS[splitName] } });
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-textMain">{today}</h1>
        <p className="text-textMuted text-lg">What are you training today?</p>
      </div>

      {/* User Selection */}
      <div className="bg-surface p-4 rounded-2xl shadow-lg border border-slate-700/50 space-y-3">
        <label className="block text-sm font-semibold text-textMuted uppercase tracking-wider">
          Who is lifting?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {USERS.map((user) => (
            <button
              key={user}
              onClick={() => setSelectedUser(user)}
              className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                selectedUser === user
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                  : 'bg-slate-800 text-textMuted hover:bg-slate-700 hover:text-textMain'
              }`}
            >
              {user}
            </button>
          ))}
        </div>
      </div>

      {/* Split Selection */}
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(SPLITS).map((splitName) => (
          <button
            key={splitName}
            onClick={() => handleStartWorkout(splitName)}
            className="group relative overflow-hidden bg-surface p-6 rounded-2xl shadow-lg border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-xl font-bold text-textMain group-hover:text-primary transition-colors">
              {splitName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
