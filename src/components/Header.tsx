"use client";

/**
 * @file Header.tsx
 * @description Sección 1 Obligatoria: Header.
 * - Muestra el nombre: "Rachel Sánchez"
 * - Profesión: "Programadora Web Full-Stack"
 * - Barra de navegación fluida con enlaces a las secciones en orden
 * - Botón interactivo para alternar entre Dark Mode y Light Mode con micro-animación GSAP
 */

import React, { useRef, useEffect, useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import gsap from "gsap";
import { logger } from "@/lib/telemetry/logger";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Animación de entrada con GSAP
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#intro" },
    { name: "Conocimientos", href: "#skills" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full glass-panel border-b border-sky-500/10 shadow-sm transition-all"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Identidad de Marca: Nombre y Profesión */}
        <a
          href="#intro"
          className="group flex items-center gap-3 text-left focus:outline-none focus:ring-1 focus:ring-sky-400 rounded-lg p-1 transition-transform active:scale-95"
          onClick={() => logger.log("INFO", "HEADER_LOGO_CLICKED")}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 shadow-sm group-hover:border-sky-500/50 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
                Rachel Sánchez
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium tracking-wide text-sky-400">
              Programadora Web Full-Stack
            </p>
          </div>
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-slate-300 hover:text-sky-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 hover:after:w-full after:transition-all after:duration-300"
              onClick={() => logger.log("INFO", "NAV_LINK_CLICKED", { target: link.name })}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Acciones: Botón de Contacto Rápido y Menú Hamburguesa */}
        <div className="flex items-center gap-3">
          {/* Botón de Contacto Rápido */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Contáctame
          </a>

          {/* Botón móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-200 hover:bg-slate-800 focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-sky-500/20 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                logger.log("INFO", "MOBILE_NAV_CLICKED", { target: link.name });
              }}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500"
          >
            Contáctame
          </a>
        </div>
      )}
    </header>
  );
};
