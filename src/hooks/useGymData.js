import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gym_tracker_data';
const USER_KEY = 'gym_tracker_user';

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

  return { history, addWorkout, userName, saveUserName };
}
