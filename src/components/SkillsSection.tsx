"use client";

/**
 * @file SkillsSection.tsx
 * @description Sección 3 Obligatoria: Conocimientos Técnicos.
 * - Tarjetas interactivas con efectos hover y micro-interacciones GSAP.
 * - Cubre HTML, CSS, JavaScript, React, Next.js, Node.js, Git, SQL, OWASP, etc.
 * - Diseño modular y visualmente impactante.
 */

import React, { useEffect, useRef, useState } from "react";
import { SKILLS_DATA, SkillCategory } from "@/data/portfolio-data";
import {
  Code2,
  Palette,
  FileCode2,
  Atom,
  Layers,
  Sparkles,
  Server,
  Database,
  GitBranch,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import gsap from "gsap";
import { logger } from "@/lib/telemetry/logger";

// Mapa de componentes de íconos para renderizado dinámico
const iconMap: Record<string, React.ElementType> = {
  Code2,
  Palette,
  FileCode2,
  Atom,
  Layers,
  Sparkles,
  Server,
  Database,
  GitBranch,
  ShieldCheck,
};

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Animación de aparición de tarjetas al renderizar
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll(".skill-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [selectedCategory]);

  const allSkills = SKILLS_DATA.flatMap((cat) => cat.skills);
  const displayedSkills =
    selectedCategory === "all"
      ? allSkills
      : SKILLS_DATA.find((c) => c.category === selectedCategory)?.skills || allSkills;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/40 border-t border-b border-sky-500/10"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border border-sky-500/20 bg-sky-500/5 text-sky-700 dark:text-sky-300">
            Stack Tecnológico
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Conocimientos Técnicos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Herramientas y tecnologías que domino para diseñar, maquetar, programar y desplegar
            soluciones web escalables y de alto impacto.
          </p>

          {/* Filtros de Categoría */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setSelectedCategory("all");
                logger.log("INFO", "SKILL_CATEGORY_FILTER", { category: "all" });
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === "all"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "glass-panel text-slate-600 dark:text-slate-300 hover:bg-sky-500/10"
              }`}
            >
              Todas las Habilidades
            </button>
            {SKILLS_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  logger.log("INFO", "SKILL_CATEGORY_FILTER", { category: cat.category });
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat.category
                    ? "bg-sky-600 text-white shadow-sm"
                    : "glass-panel text-slate-600 dark:text-slate-300 hover:bg-sky-500/10"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Rejilla de Tarjetas de Habilidades sin etiquetas de nivel */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayedSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code2;

            return (
              <div
                key={skill.name}
                className="skill-card group relative rounded-2xl glass-panel p-5 hover:border-sky-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 cursor-default flex flex-col justify-between"
                onMouseEnter={() => logger.log("INFO", "SKILL_HOVER", { skill: skill.name })}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${skill.color}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Micro-indicador sobrio */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-sky-600 dark:text-sky-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Aplicado en Proyectos Reales</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
