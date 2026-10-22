"use client";

/**
 * @file ProjectsSection.tsx
 * @description Sección 4 Obligatoria: Proyectos Desarrollados.
 * Muestra creativamente los 5 proyectos del curso:
 * 1. Rick and Morty API
 * 2. Formulario JS
 * 3. Cinex
 * 4. Youtube Clone
 * 5. Starlink
 * Cada tarjeta incluye:
 * - Título
 * - Descripción corta
 * - Vista previa / imagen representativa
 * - Enlace directo al repositorio de GitHub
 * - Enlace directo a la versión publicada en GitHub Pages (Demo)
 * - Animaciones GSAP y micro-interacciones de confeti
 */

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { PROJECTS_DATA, ProjectItem } from "@/data/portfolio-data";
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { logger } from "@/lib/telemetry/logger";

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsGridRef.current) {
      const cards = projectsGridRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  const triggerCelebrate = (projectTitle: string) => {
    logger.log("INFO", "PROJECT_DEMO_CLICKED", { project: projectTitle });
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#38bdf8", "#0284c7", "#22d3ee", "#ffffff"],
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-grid-pattern"
    >
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Encabezado con nueva introducción profesional */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border border-sky-500/20 bg-sky-500/5 text-sky-700 dark:text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Galería de Trabajos
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Proyectos Destacados
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Una selección de aplicaciones web interactivas enfocadas en buenas prácticas, diseño responsivo, consumo eficiente de datos y usabilidad.
          </p>
        </div>

        {/* Grilla Creativa de Proyectos */}
        <div
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
            const isFeatured = index === 0;

            return (
              <div
                key={project.id}
                className={`project-card group relative rounded-2xl glass-panel overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-sky-400/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Vista Previa / Imagen Representativa sin etiqueta en la esquina */}
                  <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradiente sutil sobre la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                    {/* Acciones flotantes rápidas al hacer hover en la imagen */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerCelebrate(project.title)}
                        title="Ver Proyecto"
                        className="p-2 rounded-full bg-sky-600 text-white shadow-md hover:bg-sky-500 transition-transform hover:scale-105 active:scale-95"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Contenido descriptivo del Proyecto */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Etiquetas de Tecnologías */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enlaces de Acción: Ver Proyecto y Repositorio */}
                <div className="p-5 sm:p-6 pt-0 flex flex-wrap items-center gap-2.5">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => triggerCelebrate(project.title)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs tracking-wide text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver Proyecto</span>
                  </a>

                  {/* Repositorio de GitHub */}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      logger.log("INFO", "PROJECT_REPO_CLICKED", { project: project.title })
                    }
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs tracking-wide text-slate-700 dark:text-slate-200 glass-panel hover:bg-sky-500/10 border-slate-300/60 dark:border-slate-700 hover:border-sky-400 transition-all transform hover:-translate-y-0.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repositorio</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
