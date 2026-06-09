import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useGymData } from '../hooks/useGymData';

export default function History() {
  const { history } = useGymData();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (workout, dateString) => {
    let text = `${workout.user} - ${workout.splitName} (${dateString})\n`;
    if (workout.splitName === 'Rest') {
      text += "Rest Day\n";
    } else {
      workout.exercises.forEach((ex) => {
        text += `\n${ex.name}:\n`;
        ex.sets.forEach((set, i) => {
          const w = set.weight ? `${set.weight}` : '0';
          const r = set.reps ? `${set.reps}` : '0';
          text += `  Set ${i + 1}: ${w} x ${r}\n`;
        });
      });
    }
    
    navigator.clipboard.writeText(text);
    setCopiedId(workout.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-textMuted text-2xl mb-2">
          💤
        </div>
        <h2 className="text-xl font-semibold text-textMain">No workouts yet</h2>
        <p className="text-textMuted">Time to hit the gym!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-left-8 duration-300 pb-20">
      <h1 className="text-2xl font-bold text-textMain sticky top-0 bg-background/80 backdrop-blur-md py-2 z-10">
        Activity Feed
      </h1>

      <div className="space-y-4">
        {history.map((workout) => {
          const date = new Date(workout.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={workout.id}
              className="bg-surface rounded-2xl p-5 shadow-sm border border-slate-700/50 space-y-3"
            >
              <div className="flex justify-between items-start border-b border-slate-700 pb-3">
                <div>
                  <h3 className="font-bold text-lg text-primary">{workout.user}</h3>
                  <p className="text-sm text-textMuted">{date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {workout.splitName}
                  </div>
                  <button 
                    onClick={() => handleCopy(workout, date)}
                    className="flex items-center gap-1 text-xs text-textMuted hover:text-primary transition-colors bg-slate-800 px-2 py-1 rounded-md"
                  >
                    {copiedId === workout.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === workout.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {workout.splitName !== 'Rest' && workout.exercises?.length > 0 && (
                <div className="space-y-4 pt-2">
                  {workout.exercises.map((ex, idx) => (
                    <div key={idx} className="text-sm bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                      <div className="font-semibold text-textMain mb-2">{ex.name}</div>
                      <div className="space-y-1 pl-2 border-l-2 border-slate-700/50">
                        {ex.sets.map((set, sIdx) => (
                          <div key={sIdx} className="text-textMuted flex gap-2">
                            <span className="w-12">Set {sIdx + 1}:</span>
                            <span className="text-textMain font-medium">{set.weight || '0'}</span>
                            <span>×</span>
                            <span className="text-textMain font-medium">{set.reps || '0'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
