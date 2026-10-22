/**
 * @file portfolio-data.ts
 * @description Fuente única de verdad (Single Source of Truth) para la información del portafolio.
 * Cumple con el principio Open/Closed (OCP - SOLID) permitiendo extender proyectos o habilidades
 * sin modificar la lógica interna de los componentes.
 */

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  demoUrl: string;
  repoUrl: string;
  image: string;
  stats?: {
    stars?: number;
    badge?: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string; // ej: "Avanzado", "Intermedio", "Experto"
    icon: string;
    color: string;
    description: string;
  }[];
}

/**
 * Los 5 proyectos obligatorios del curso con sus enlaces exactos
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "rick-and-morty-api",
    title: "Proyecto Rick and Morty API",
    description:
      "Plataforma web dinámica que consume la API REST de Rick and Morty. Integra módulos de autenticación local, catálogo de personajes con filtrado dinámico, paginación y vista de detalle.",
    category: "Full-Stack / REST API",
    technologies: ["JavaScript ES6+", "HTML5 Semántico", "CSS3 Moderno", "Tailwind CSS", "REST API", "LocalStorage"],
    demoUrl: "https://rachelaponte015.github.io/Proyecto-RickandMorty-Api-Rachel/",
    repoUrl: "https://github.com/rachelaponte015/Proyecto-RickandMorty-Api-Rachel.git",
    image: "/projects/rickandmorty.jpg",
    stats: {
      badge: "REST API & Auth",
    },
  },
  {
    id: "formulario-js",
    title: "Proyecto Formulario JS",
    description:
      "Formulario interactivo y estructurado con validación en tiempo real. Diseñado para ofrecer una experiencia de usuario clara, detección de errores y diseño adaptable.",
    category: "DOM & Data Validation",
    technologies: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "RegEx", "UX Validation"],
    demoUrl: "https://rachelaponte015.github.io/FormularioJS-Rachel/",
    repoUrl: "https://github.com/rachelaponte015/Proyecto-FormularioJS-Rachel.git",
    image: "/projects/formulario.png",
    stats: {
      badge: "Data Integrity & UX",
    },
  },
  {
    id: "cinex",
    title: "Proyecto Cinex",
    description:
      "Portal cinematográfico interactivo inspirado en la cadena de cines Cinex. Incluye cartelera de estrenos, selección de formatos (VIP, 4DX), detalle de películas y diseño responsive vanguardista.",
    category: "Responsive Web / Entertainment",
    technologies: ["HTML5", "CSS3 Grid & Flexbox", "Tailwind CSS", "Responsive Design", "UI Design"],
    demoUrl: "https://rachelaponte015.github.io/Proyecto-Cinex-Rachel/",
    repoUrl: "https://github.com/rachelaponte015/Proyecto-Cinex-Rachel.git",
    image: "/projects/cinex.jpg",
    stats: {
      badge: "Multimedia & Grid",
    },
  },
  {
    id: "youtube-clone",
    title: "Proyecto YouTube Clone",
    description:
      "Recreación de la interfaz de YouTube con reproducción de video embebido, barra de búsqueda interactiva, sidebar colapsable, diseño adaptable y panel de videos recomendados.",
    category: "Modern UI / Video Streaming Clone",
    technologies: ["HTML5", "CSS3 Avanzado", "SVG Icons", "Responsive UI"],
    demoUrl: "https://rachelaponte015.github.io/Proyecto-Youtube-Rachel/",
    repoUrl: "https://github.com/rachelaponte015/Proyecto-Youtube-Rachel.git",
    image: "/projects/youtube.png",
    stats: {
      badge: "Streaming Layout",
    },
  },
  {
    id: "starlink-portal",
    title: "Proyecto Starlink",
    description:
      "Landing page de alta fidelidad tecnológica inspirada en la red satelital Starlink. Efectos visuales espaciales, tipografía minimalista, secciones inmersivas y navegación fluida.",
    category: "Tech Landing / Aerospace",
    technologies: ["HTML5 Semántico", "CSS3 Animations", "Minimalist Design"],
    demoUrl: "https://rachelaponte015.github.io/Proyecto-Starlink-Rachel/",
    repoUrl: "https://github.com/rachelaponte015/Proyecto-Starlink-Rachel.git",
    image: "/projects/starlink.png",
    stats: {
      badge: "High-Tech Aesthetics",
    },
  },
];

/**
 * Conocimientos técnicos y herramientas categorizadas
 */
export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend Core & Frameworks",
    skills: [
      {
        name: "HTML5 & Semántica",
        level: "Avanzado",
        icon: "Code2",
        color: "text-amber-400 border-amber-500/20 bg-amber-500/10",
        description: "Estructuras accesibles (WCAG), SEO semántico y optimización de carga.",
      },
      {
        name: "CSS3 & Tailwind CSS",
        level: "Avanzado",
        icon: "Palette",
        color: "text-sky-400 border-sky-500/20 bg-sky-500/10",
        description: "Layouts fluidos, diseño responsivo, CSS Grid, Flexbox y temas dinámicos.",
      },
      {
        name: "JavaScript (ES6+)",
        level: "Avanzado",
        icon: "FileCode2",
        color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
        description: "Asincronía (Async/Await), manipulación del DOM, closures y Clean Code.",
      },
      {
        name: "React.js",
        level: "Avanzado",
        icon: "Atom",
        color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
        description: "Hooks, arquitectura por componentes reutilizables, Context API y optimización.",
      },
      {
        name: "Next.js (App Router)",
        level: "Competente",
        icon: "Layers",
        color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
        description: "Server/Client Components, rutas dinámicas, optimización de imágenes y SEO.",
      },
    ],
  },
  {
    category: "Backend, Datos & Herramientas",
    skills: [
      {
        name: "Node.js",
        level: "Intermedio",
        icon: "Server",
        color: "text-green-400 border-green-500/20 bg-green-500/10",
        description: "Construcción de servidores ligeros, manejo de APIs REST y NPM/PNPM scripts.",
      },
      {
        name: "SQL & Bases de Datos",
        level: "Intermedio",
        icon: "Database",
        color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
        description: "Modelado relacional, consultas estructuradas, integridad de datos y normalización.",
      },
      {
        name: "Git & GitHub",
        level: "Avanzado",
        icon: "GitBranch",
        color: "text-rose-400 border-rose-500/20 bg-rose-500/10",
        description: "Control de versiones, ramas, despliegues continuos y GitHub Pages.",
      },
      {
        name: "Seguridad OWASP & TDD",
        level: "Avanzado",
        icon: "ShieldCheck",
        color: "text-teal-400 border-teal-500/20 bg-teal-500/10",
        description: "Sanitización XSS, Rate Limiting, pruebas unitarias y principios SOLID.",
      },
    ],
  },
];

/**
 * Información de contacto y redes profesionales
 */
export const CONTACT_DATA = {
  name: "Rachel Sánchez",
  role: "Programadora Web Full-Stack",
  email: "rachelaponte015@gmail.com",
  github: "https://github.com/rachelaponte015",
  linkedin: "https://www.linkedin.com/in/rachel-sanchez-aponte-b23548325/",
  location: "Disponible para proyectos Remotos e Híbridos",
  bio: "Soy una programadora apasionada por diseñar y construir soluciones web de alto impacto, combinando un diseño frontend exquisito con una arquitectura backend sólida, segura y eficiente.",
};
