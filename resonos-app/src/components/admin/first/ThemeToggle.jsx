import React, { useState, useEffect } from "react";

const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      className={`admin theme-toggle-btn ${className || ''}`}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;
