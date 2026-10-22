"use client";

/**
 * @file ContactSection.tsx
 * @description Sección 5 Obligatoria: Contacto.
 * - Medios de contacto profesionales: Correo, LinkedIn, GitHub.
 * - Botón destacado de llamada a la acción ("Contáctame").
 * - Formulario interactivo con sanitización OWASP contra XSS y simulación de rate limiting.
 * - Consola interactiva de telemetría y logs estructurados para observabilidad en vivo.
 */

import React, { useState } from "react";
import { CONTACT_DATA } from "@/data/portfolio-data";
import {
  Mail,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { sanitizeHtml, isValidEmail, rateLimiter } from "@/lib/security";
import { logger } from "@/lib/telemetry/logger";
import confetti from "canvas-confetti";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "rate_limited">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.log("INFO", "CONTACT_FORM_SUBMIT_ATTEMPT", { emailCandidate: formData.email });

    // 1. Verificación de Limitación de Tasa (Rate Limiting)
    const rateCheck = rateLimiter.checkLimit("contact_form", { windowMs: 30000, maxRequests: 3 });
    if (!rateCheck.allowed) {
      setStatus("rate_limited");
      setErrorMessage(
        `Límite de solicitudes alcanzado. Por favor, espera ${Math.ceil(
          rateCheck.resetInMs / 1000
        )} segundos antes de reintentar.`
      );
      logger.log("SECURITY", "CONTACT_RATE_LIMIT_HIT", { resetInMs: rateCheck.resetInMs });
      return;
    }

    // 2. Sanitización estricta de entradas (OWASP XSS Prevention)
    const cleanName = sanitizeHtml(formData.name);
    const cleanEmail = sanitizeHtml(formData.email);
    const cleanMessage = sanitizeHtml(formData.message);

    // 3. Validaciones de integridad
    if (!cleanName || cleanName.length < 2) {
      setStatus("error");
      setErrorMessage("Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setStatus("error");
      setErrorMessage("Por favor, proporciona un correo electrónico válido.");
      logger.log("WARN", "INVALID_EMAIL_ATTEMPT", { rawEmail: formData.email });
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      setStatus("error");
      setErrorMessage("El mensaje debe contener al menos 10 caracteres explicativos.");
      return;
    }

    // 4. Procesamiento y apertura directa del cliente de correo
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");

      // Construcción del enlace mailto con datos del remitente
      const subject = encodeURIComponent(`Nuevo mensaje de ${cleanName} - Portafolio`);
      const body = encodeURIComponent(
        `Nombre: ${cleanName}\nCorreo de contacto: ${cleanEmail}\n\nMensaje:\n${cleanMessage}`
      );
      const mailtoUrl = `mailto:${CONTACT_DATA.email}?subject=${subject}&body=${body}`;

      // Abrir cliente de correo del usuario hacia tu dirección
      window.location.href = mailtoUrl;

      setFormData({ name: "", email: "", message: "" });

      logger.log("INFO", "MESSAGE_DISPATCHED_SUCCESSFULLY", {
        from: cleanName,
        email: cleanEmail,
      });

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#0284c7", "#10b981", "#ffffff"],
      });
    }, 400);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-slate-950 text-white border-t border-sky-500/20"
    >
      {/* Luces y texturas de fondo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border border-sky-500/20 bg-sky-500/5 text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            Hablemos de Proyectos
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Medios de Contacto Profesional
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            ¿Tienes en mente una vacante, un proyecto freelance o una idea innovadora?
            Escríbeme o conéctate directamente a través de mis canales profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Información de Contacto y Enlaces */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl glass-panel bg-slate-900/80 border border-slate-800 space-y-5">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Información Directa
              </h3>

              {/* Lista de Medios */}
              <div className="space-y-3 pt-1">
                {/* Email */}
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  onClick={() => logger.log("INFO", "CONTACT_EMAIL_CLICK")}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 hover:bg-sky-500/10 border border-slate-700/60 hover:border-sky-400/50 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Correo Electrónico</p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                      {CONTACT_DATA.email}
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={CONTACT_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logger.log("INFO", "CONTACT_LINKEDIN_CLICK")}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 hover:bg-sky-500/10 border border-slate-700/60 hover:border-sky-400/50 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">LinkedIn Profesional</p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                      Rachel Aponte
                    </p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={CONTACT_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logger.log("INFO", "CONTACT_GITHUB_CLICK")}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 hover:bg-sky-500/10 border border-slate-700/60 hover:border-sky-400/50 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-slate-700 text-slate-200 group-hover:scale-105 transition-transform">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Perfil de GitHub</p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                      github.com/rachelaponte015
                    </p>
                  </div>
                </a>
              </div>

              {/* Botón Destacado de Llamada a la Acción ("Contáctame") */}
              <div className="pt-2">
                <a
                  href={`mailto:${CONTACT_DATA.email}?subject=Propuesta%20de%20Trabajo%20-%20Portafolio%20Rachel%20Sánchez`}
                  onClick={() => logger.log("INFO", "CTA_CONTACTAME_BUTTON_CLICK")}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contáctame Directamente</span>
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel bg-slate-900/90 border border-slate-800 shadow-xl relative">
              
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Envíame un Mensaje
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Feedback States */}
              {status === "success" && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium">
                    ¡Mensaje recibido con éxito! Te responderé a la brevedad posible.
                  </p>
                </div>
              )}

              {(status === "error" || status === "rate_limited") && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20 text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Tu Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20 text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Mensaje o Propuesta
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntame sobre tu proyecto, metas o requerimientos..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20 text-white placeholder-slate-500 text-xs sm:text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 rounded-xl font-semibold text-xs tracking-wider uppercase text-white bg-sky-600 hover:bg-sky-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === "submitting" ? "Enviando mensaje..." : "Enviar Mensaje"}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer simple y limpio */}
        <div className="mt-16 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center">
          <p>© 2026 Rachel Sánchez — Desarrollado con Next.js</p>
        </div>

      </div>
    </section>
  );
};

