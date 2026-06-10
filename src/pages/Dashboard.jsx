import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Check } from 'lucide-react';
import { useGymData } from '../hooks/useGymData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName, saveUserName, splits } = useGymData();
  const [isEditingName, setIsEditingName] = useState(!userName);
  const [tempName, setTempName] = useState(userName);
  
  const handleStartWorkout = (splitName) => {
    if (!userName) {
      alert("Please enter your name first!");
      setIsEditingName(true);
      return;
    }
    navigate('/workout', { state: { user: userName, splitName, exercises: splits[splitName] } });
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      saveUserName(tempName.trim());
      setIsEditingName(false);
    }
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

      {/* User Name Section */}
      <div className="bg-surface p-4 rounded-2xl shadow-lg border border-slate-700/50 space-y-3 flex items-center justify-between">
        {isEditingName ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Enter your name..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-primary text-textMain"
              autoFocus
            />
            <button
              onClick={handleSaveName}
              className="bg-primary text-white p-3 rounded-lg font-medium hover:bg-primaryHover transition-colors"
            >
              <Check size={20} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <span className="block text-sm font-semibold text-textMuted uppercase tracking-wider">
                Lifting as
              </span>
              <span className="text-xl font-bold text-primary">{userName}</span>
            </div>
            <button
              onClick={() => setIsEditingName(true)}
              className="p-2 text-textMuted hover:text-primary transition-colors bg-slate-800 rounded-lg"
            >
              <Edit2 size={18} />
            </button>
          </>
        )}
      </div>

      {/* Split Selection */}
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(splits).map((splitName) => (
          <button
            key={splitName}
            onClick={() => handleStartWorkout(splitName)}
            className={`group relative overflow-hidden bg-surface p-6 rounded-2xl shadow-lg border border-slate-700/50 transition-all duration-300 ${
              userName ? 'hover:border-primary/50 hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {userName && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            <span className={`relative text-xl font-bold transition-colors ${
              userName ? 'text-textMain group-hover:text-primary' : 'text-textMuted'
            }`}>
              {splitName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
