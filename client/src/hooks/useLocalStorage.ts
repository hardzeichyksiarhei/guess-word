import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    
    if (item) return JSON.parse(item);
    return initialValue || {};
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  }, [key, value]);

  return [value, setValue];
};
