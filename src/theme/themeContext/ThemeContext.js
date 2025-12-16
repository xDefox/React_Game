// context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext(); 

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'light';
    setMode(savedMode);
  }, []);

// ThemeContext.js - добавь console.log
const toggleTheme = () => {
  console.log('toggleTheme called. Current mode:', mode);
  const newMode = mode === 'light' ? 'dark' : 'light';
  console.log('Setting new mode:', newMode);
  setMode(newMode);
  localStorage.setItem('theme', newMode);
};

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};