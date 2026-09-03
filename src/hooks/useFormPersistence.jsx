import { useState, useEffect } from 'react';

export const useFormPersistence = (key, initialData) => {
  const [data, setData] = useState(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
    return initialData;
  });

  useEffect(() => {
    try {
      if (data && Object.values(data).some(val => val !== '')) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, [data, key]);

  const clearData = () => {
    localStorage.removeItem(key);
    setData(initialData);
  };

  return [data, setData, clearData];
};