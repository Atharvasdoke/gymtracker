import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Plus, Check, Save } from 'lucide-react';
import { useGymData } from '../hooks/useGymData';

export default function Workout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addWorkout } = useGymData();

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
    setExercises((prev) => [
      ...prev,
      { id: Date.now(), name: newExerciseName.trim(), sets: [] },
    ]);
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
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-300 pb-20">
      <div className="flex justify-between items-center bg-surface p-4 rounded-2xl shadow-sm border border-slate-700/50">
        <div>
          <h2 className="text-xl font-bold text-primary">{splitName} Day</h2>
          <p className="text-sm text-textMuted">Logging for {user}</p>
        </div>
        <button
          onClick={handleSaveWorkout}
          className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <Save size={18} />
          Save
        </button>
      </div>

      <div className="space-y-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-surface p-4 rounded-2xl shadow-sm border border-slate-700/50 space-y-4">
            <h3 className="font-semibold text-lg text-textMain">{ex.name}</h3>
            
            <div className="space-y-2">
              {ex.sets.map((set, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-sm text-textMuted font-medium">{idx + 1}</span>
                  <input
                    type="number"
                    placeholder="kg/lbs"
                    value={set.weight}
                    onChange={(e) => updateSet(ex.id, idx, 'weight', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:border-primary text-textMain placeholder-slate-500"
                  />
                  <span className="text-textMuted">x</span>
                  <input
                    type="number"
                    placeholder="reps"
                    value={set.reps}
                    onChange={(e) => updateSet(ex.id, idx, 'reps', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:border-primary text-textMain placeholder-slate-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => addSet(ex.id)}
              className="flex items-center gap-2 text-sm text-primary hover:text-primaryHover font-medium py-1 transition-colors"
            >
              <Plus size={16} /> Add Set
            </button>
          </div>
        ))}

        {/* Add Custom Exercise */}
        {showAddExercise ? (
          <div className="bg-surface p-4 rounded-2xl border border-primary/50 space-y-3">
            <input
              type="text"
              placeholder="Exercise name..."
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-primary text-textMain"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddExercise}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-medium"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddExercise(false)}
                className="flex-1 bg-slate-700 text-textMain py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddExercise(true)}
            className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl text-textMuted hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={20} /> Add Custom Exercise
          </button>
        )}
      </div>
    </div>
  );
}
