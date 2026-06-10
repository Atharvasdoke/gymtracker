import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Plus, Check, Save } from 'lucide-react';
import { useGymData } from '../hooks/useGymData';

export default function Workout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addWorkout, addExerciseToSplit } = useGymData();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { user, splitName, exercises: initialExercises } = location.state;

  // State: array of { id, name, sets: [{ weight, reps }] }
  const [exercises, setExercises] = useState(
    initialExercises.map((name, i) => ({
      id: i,
      name,
      sets: [],
    }))
  );
  
  const [newExerciseName, setNewExerciseName] = useState('');
  const [showAddExercise, setShowAddExercise] = useState(false);

  const addSet = (exerciseId) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: [...ex.sets, { weight: '', reps: '' }] }
          : ex
      )
    );
  };

  const updateSet = (exerciseId, setIndex, field, value) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        return { ...ex, sets: newSets };
      })
    );
  };

  const handleAddExercise = () => {
    if (!newExerciseName.trim()) return;
    const name = newExerciseName.trim();
    setExercises((prev) => [
      ...prev,
      { id: Date.now(), name, sets: [] },
    ]);
    addExerciseToSplit(splitName, name);
    setNewExerciseName('');
    setShowAddExercise(false);
  };

  const handleSaveWorkout = () => {
    const workout = {
      id: Date.now(),
      user,
      splitName,
      date: new Date().toISOString(),
      exercises: exercises.filter(ex => ex.sets.length > 0 || splitName === 'Rest'),
    };
    addWorkout(workout);
    navigate('/history');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500 pb-28 pt-4">
      <div className="sticky top-4 z-20 flex justify-between items-center bg-surface/60 backdrop-blur-xl p-5 rounded-3xl shadow-lg border border-white/10">
        <div>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryHover tracking-tight">{splitName} Day</h2>
          <p className="text-xs font-medium text-textMuted uppercase tracking-widest mt-1">Logging for {user}</p>
        </div>
        <button
          onClick={handleSaveWorkout}
          className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-5 py-3 rounded-2xl font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95"
        >
          <Save size={18} />
          Save
        </button>
      </div>

      <div className="space-y-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="relative group bg-surface/30 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-white/5 space-y-5 transition-all duration-300 hover:bg-surface/50 hover:border-white/10 hover:shadow-xl">
            <h3 className="font-bold text-xl text-textMain/90 tracking-wide">{ex.name}</h3>
            
            <div className="space-y-3">
              {ex.sets.map((set, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-8 text-xs text-textMuted/70 font-bold uppercase tracking-wider">S {idx + 1}</span>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="kg/lbs"
                      value={set.weight}
                      onChange={(e) => updateSet(ex.id, idx, 'weight', e.target.value)}
                      className="w-full bg-black/20 border-b-2 border-transparent focus:border-primary rounded-xl p-3 text-sm focus:outline-none text-textMain placeholder-textMuted/50 transition-all font-medium"
                    />
                  </div>
                  <span className="text-textMuted/50 font-light">×</span>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="reps"
                      value={set.reps}
                      onChange={(e) => updateSet(ex.id, idx, 'reps', e.target.value)}
                      className="w-full bg-black/20 border-b-2 border-transparent focus:border-primary rounded-xl p-3 text-sm focus:outline-none text-textMain placeholder-textMuted/50 transition-all font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => addSet(ex.id)}
              className="flex items-center justify-center w-full gap-2 text-sm text-primary/80 hover:text-primary hover:bg-primary/10 font-bold py-3 rounded-xl transition-all border border-transparent hover:border-primary/20"
            >
              <Plus size={18} /> Add Set
            </button>
          </div>
        ))}

        {/* Add Custom Exercise */}
        {showAddExercise ? (
          <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] space-y-4 animate-in zoom-in-95 duration-200">
            <input
              type="text"
              placeholder="Exercise name..."
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-textMain transition-all shadow-inner font-medium"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddExercise}
                className="flex-1 bg-primary text-white py-3 rounded-2xl font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all active:scale-95"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddExercise(false)}
                className="flex-1 bg-white/5 text-textMain py-3 rounded-2xl font-bold hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddExercise(true)}
            className="w-full py-6 border-2 border-dashed border-white/10 rounded-3xl text-textMuted/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-bold tracking-wide shadow-sm"
          >
            <Plus size={22} /> Add Custom Exercise
          </button>
        )}
      </div>
    </div>
  );
}
