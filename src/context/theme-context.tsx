"use client";

/**
 * @file theme-context.tsx
 * @description Contexto de gestión de tema (Dark Mode / Light Mode).
 * Implementa persistencia en localStorage, sincronización con clases DOM (`dark`),
 * telemetría estructurada y salvaguarda contra hydration mismatch.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { logger } from "@/lib/telemetry/logger";
import { rateLimiter } from "@/lib/security";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Lectura de preferencia previa guardada o default a dark mode
    const storedTheme = localStorage.getItem("rachel-portfolio-theme") as Theme | null;
    const initialTheme = storedTheme ? storedTheme : "dark";
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);

    logger.log("INFO", "THEME_INITIALIZED", { activeTheme: initialTheme });
  }, []);

  const toggleTheme = () => {
    // Aplicar simulación de rate limiting para evitar spam abusivo de toggling
    const rateCheck = rateLimiter.checkLimit("theme_toggle", { windowMs: 2000, maxRequests: 8 });
    if (!rateCheck.allowed) {
      logger.log("WARN", "THEME_TOGGLE_THROTTLED", { message: "Demasiados cambios en breve intervalo." });
      return;
    }

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("rachel-portfolio-theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    logger.log("INFO", "THEME_CHANGED", { newTheme: nextTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Evitar parpadeos de estilos antes de montar */}
      <div className={mounted ? "contents" : "opacity-0"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser utilizado dentro de un ThemeProvider");
  }
  return context;
}
