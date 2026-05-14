"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "light"}
    >
      <span className={theme === "dark" ? "active" : undefined}>D</span>
      <span className={theme === "light" ? "active" : undefined}>L</span>
    </button>
  );
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themechange", callback);
  };
}

function getThemeSnapshot(): Theme {
  const savedTheme = window.localStorage.getItem("theme");
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}
