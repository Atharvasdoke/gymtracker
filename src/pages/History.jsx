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
    <div className="space-y-6 animate-in slide-in-from-left-8 duration-500 pb-28 pt-4">
      <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 sticky top-0 bg-background/80 backdrop-blur-xl py-4 z-20 border-b border-white/5 shadow-sm">
        Activity Feed
      </h1>

      <div className="space-y-5">
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
              className="group bg-surface/30 backdrop-blur-sm rounded-3xl p-6 shadow-md border border-white/5 space-y-4 transition-all duration-300 hover:bg-surface/50 hover:border-white/10 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primaryHover opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-extrabold text-xl text-textMain/90 tracking-wide">{workout.user}</h3>
                  <p className="text-xs font-medium text-textMuted uppercase tracking-widest mt-1">{date}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-inner">
                    {workout.splitName}
                  </div>
                  <button 
                    onClick={() => handleCopy(workout, date)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-textMuted/80 hover:text-white transition-all bg-black/20 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-transparent hover:border-white/10 active:scale-95"
                  >
                    {copiedId === workout.id ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                    {copiedId === workout.id ? <span className="text-primary">Copied!</span> : 'Copy'}
                  </button>
                </div>
              </div>

              {workout.splitName !== 'Rest' && workout.exercises?.length > 0 && (
                <div className="space-y-3 pt-2">
                  {workout.exercises.map((ex, idx) => (
                    <div key={idx} className="bg-black/20 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="font-bold text-sm text-textMain/90 mb-3 tracking-wide">{ex.name}</div>
                      <div className="space-y-2 pl-3 border-l-2 border-primary/30">
                        {ex.sets.map((set, sIdx) => (
                          <div key={sIdx} className="text-xs flex gap-3 items-center">
                            <span className="w-12 text-textMuted/70 font-bold uppercase tracking-wider">S {sIdx + 1}</span>
                            <span className="text-textMain font-semibold bg-white/5 px-2 py-0.5 rounded-md">{set.weight || '0'}</span>
                            <span className="text-textMuted/50 font-light">×</span>
                            <span className="text-textMain font-semibold bg-white/5 px-2 py-0.5 rounded-md">{set.reps || '0'}</span>
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
