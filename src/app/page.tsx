import { Header } from "@/components/Header";
import { IntroSection } from "@/components/IntroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

/**
 * @file page.tsx
 * @description Página principal del portafolio de Rachel Sánchez.
 * Estructura estrictamente ordenada según los requisitos:
 * 1. Header (Nombre, Profesión, Barra de navegación y Botón Claro/Oscuro)
 * 2. Intro sobre tu persona (Presentación, motivaciones, foto en public/profile.jpg)
 * 3. Conocimientos Técnicos (Tarjetas interactivas de habilidades y herramientas)
 * 4. Proyectos (Los 5 proyectos del curso con enlaces a Demo y Repositorio)
 * 5. Sección de Contacto (Medios de contacto y botón destacado "Contáctame")
 */
export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full relative">
      {/* 1. Header */}
      <Header />

      {/* 2. Intro sobre tu persona */}
      <IntroSection />

      {/* 3. Conocimientos Técnicos */}
      <SkillsSection />

      {/* 4. Proyectos */}
      <ProjectsSection />

      {/* 5. Sección de Contacto */}
      <ContactSection />
    </main>
  );
}
