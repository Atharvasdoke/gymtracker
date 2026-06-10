import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Check, Trash2, AlertTriangle } from 'lucide-react';
import { useGymData } from '../hooks/useGymData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName, saveUserName, splits, clearAllData } = useGymData();
  const [isEditingName, setIsEditingName] = useState(!userName);
  const [tempName, setTempName] = useState(userName);
  const [showClearWarning, setShowClearWarning] = useState(false);
  
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

  const handleClearData = () => {
    clearAllData();
    setShowClearWarning(false);
    setIsEditingName(true);
    setTempName('');
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8">
      <div className="text-center space-y-3 mt-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 drop-shadow-sm">{today}</h1>
        <p className="text-primary font-medium tracking-wide">What are you training today?</p>
      </div>

      {/* User Name Section */}
      <div className="relative overflow-hidden bg-surface/40 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/5 space-y-3 flex items-center justify-between group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {isEditingName ? (
          <div className="flex-1 flex gap-3 relative z-10">
            <input
              type="text"
              placeholder="Enter your name..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 bg-black/20 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-textMain transition-all shadow-inner"
              autoFocus
            />
            <button
              onClick={handleSaveName}
              className="bg-primary text-white px-6 rounded-2xl font-semibold hover:bg-primaryHover transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center justify-center"
            >
              <Check size={22} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 relative z-10">
              <span className="block text-xs font-bold text-textMuted/70 uppercase tracking-[0.2em] mb-1">
                Lifting as
              </span>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primaryHover">{userName}</span>
            </div>
            <button
              onClick={() => setIsEditingName(true)}
              className="relative z-10 p-3 text-textMuted hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-white/10"
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
            className={`group relative overflow-hidden bg-surface/40 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/5 transition-all duration-500 ${
              userName ? 'hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]' : 'opacity-40 cursor-not-allowed grayscale'
            }`}
          >
            {userName && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
              </>
            )}
            <span className={`relative z-10 text-xl font-bold tracking-wide transition-colors duration-300 ${
              userName ? 'text-textMain/90 group-hover:text-white' : 'text-textMuted'
            }`}>
              {splitName}
            </span>
          </button>
        ))}
      </div>

      {/* Clear Data Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={() => setShowClearWarning(true)}
          className="flex items-center gap-2 text-xs font-semibold text-textMuted hover:text-red-400 transition-colors px-4 py-2 rounded-full bg-surface/20 border border-white/5 hover:border-red-500/30 hover:bg-red-500/10"
        >
          <Trash2 size={14} /> Clear All Data
        </button>
      </div>

      {/* Warning Modal */}
      {showClearWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-white">Clear All Data?</h3>
              <p className="text-textMuted text-sm leading-relaxed">
                This will permanently delete your username, custom splits, and all your workout history. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowClearWarning(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-2xl transition-all border border-white/5 hover:border-white/10 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] active:scale-95"
              >
                Yes, Clear It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
