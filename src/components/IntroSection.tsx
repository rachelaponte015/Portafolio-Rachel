"use client";

/**
 * @file IntroSection.tsx
 * @description Sección 2 Obligatoria: Intro sobre Rachel Sánchez.
 * - Breve presentación personal, motivaciones, visión técnica y proyectos que apasiona construir.
 * - Fotografía de perfil ubicada en la carpeta public (`/profile.jpg`).
 * - Animaciones GSAP de entrada fluida y badges de especialidad.
 */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Code, Shield, Sparkles, Download, CheckCircle2 } from "lucide-react";
import { logger } from "@/lib/telemetry/logger";

export const IntroSection: React.FC = () => {
  const introContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación fluida de revelado para el contenido
      gsap.fromTo(
        textContentRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        imageCardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)", delay: 0.3 }
      );
    }, introContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={introContainerRef}
      className="relative pt-10 pb-20 md:py-24 overflow-hidden bg-grid-pattern"
    >
      {/* Acentos de fondo sutiles y elegantes (sin exceso de neon) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Texto de Presentación */}
          <div ref={textContentRef} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill de Disponibilidad sobrio */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide border border-sky-500/20 bg-sky-500/5 text-sky-700 dark:text-sky-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Disponible para nuevos proyectos
            </div>

            {/* Título Principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
              Hola, soy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400">
                Rachel Sánchez
              </span>
            </h1>

            {/* Subtítulo de Rol */}
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-sky-400">
              Programadora Web Full-Stack
            </p>

            {/* Descripción */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Me apasiona crear aplicaciones web modernas, robustas y de alto rendimiento. Mi
              enfoque une la precisión del diseño frontend intuitivo con arquitecturas backend
              escalables, limpias y eficientes, transformando ideas en soluciones digitales confiables.
            </p>

            {/* Botones de Llamada a la Acción */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => logger.log("INFO", "HERO_EXPLORE_PROJECTS_CLICK")}
                className="inline-flex items-center gap-2 px-5.5 py-3 rounded-xl font-semibold text-xs tracking-wide text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/25 hover:shadow-sky-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explorar Proyectos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={() => logger.log("INFO", "HERO_CONTACT_CLICK")}
                className="inline-flex items-center gap-2 px-5.5 py-3 rounded-xl font-semibold text-xs tracking-wide text-slate-200 glass-panel hover:bg-sky-500/10 border-slate-700 hover:border-sky-400 transition-all transform hover:-translate-y-0.5"
              >
                <span>Conversemos</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta con Fotografía de Perfil con tamaño equilibrado */}
          <div ref={imageCardRef} className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-[305px] sm:max-w-[325px] w-full">
              {/* Marco suave sin sobreexceso de brillo */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-sky-500/25 to-blue-600/15 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Contenedor de la foto */}
              <div className="relative glass-panel rounded-2xl overflow-hidden p-3 shadow-xl bg-slate-900/90 border border-slate-800">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-800">
                  <Image
                    src="/profile.jpg"
                    alt="Rachel Sánchez - Programadora Web Full-Stack"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    priority
                    className="object-cover object-top filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Badge superpuesto en la foto */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                        Desarrolladora Web
                      </p>
                      <p className="text-xs font-semibold text-white">Rachel Sánchez</p>
                    </div>
                    <div className="p-1.5 rounded-md bg-sky-500/20 text-sky-400">
                      <Code className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
