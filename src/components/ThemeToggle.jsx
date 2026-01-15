import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or System Preference
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`
        relative flex items-center p-1 rounded-full w-14 h-8 
        transition-colors duration-500 ease-in-out shadow-inner border
        ${isDark ? "bg-slate-800 border-slate-700" : "bg-blue-100 border-blue-200"}
        focus:outline-none cursor-pointer
      `}
      aria-label="Toggle Theme"
    >
      {/* Sliding Circle (Thumb) */}
      <span
        className={`
          absolute left-1 bg-white rounded-full w-6 h-6 shadow-md z-10
          flex items-center justify-center transform transition-transform duration-500
          ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)" }} // Elastic bounce
      >
        {/* Icons inside the thumb for morphing effect */}
        <Sun
          size={14}
          className={`absolute text-amber-500 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          size={14}
          className={`absolute text-indigo-600 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;