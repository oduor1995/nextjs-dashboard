import React, { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
  // State to store the current theme
  const [darkMode, setDarkMode] = useState(() => {
    // Check for theme preference at the first load
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('theme') === 'dark' ? true : false;
    }
    return false;
  });

  // Effect to apply the theme class to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="rounded-lg bg-gray-200 p-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeToggle;
