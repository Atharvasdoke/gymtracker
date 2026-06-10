import { useState, useEffect } from 'react';
import { SPLITS as defaultSplits } from '../data/splits';

const STORAGE_KEY = 'gym_tracker_data';
const USER_KEY = 'gym_tracker_user';
const SPLITS_KEY = 'gym_tracker_splits';

export function useGymData() {
  const [userName, setUserName] = useState(() => {
    return window.localStorage.getItem(USER_KEY) || '';
  });

  const saveUserName = (name) => {
    setUserName(name);
    window.localStorage.setItem(USER_KEY, name);
  };

  const [history, setHistory] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error(error);
    }
  }, [history]);

  const [splits, setSplits] = useState(() => {
    try {
      const item = window.localStorage.getItem(SPLITS_KEY);
      return item ? JSON.parse(item) : defaultSplits;
    } catch (error) {
      console.error(error);
      return defaultSplits;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(SPLITS_KEY, JSON.stringify(splits));
    } catch (error) {
      console.error(error);
    }
  }, [splits]);

  const addWorkout = (workout) => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      const currentHistory = item ? JSON.parse(item) : [];
      const newHistory = [workout, ...currentHistory];
      setHistory(newHistory);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error(error);
    }
  };

  const addExerciseToSplit = (splitName, exerciseName) => {
    setSplits(prev => {
      const currentExercises = prev[splitName] || [];
      if (currentExercises.includes(exerciseName)) return prev;
      return {
        ...prev,
        [splitName]: [...currentExercises, exerciseName]
      };
    });
  };

  return { history, addWorkout, userName, saveUserName, splits, addExerciseToSplit };
}
