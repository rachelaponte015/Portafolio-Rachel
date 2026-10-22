/**
 * @file security.ts
 * @description Módulo de utilidades de seguridad basadas en pautas de OWASP Top 10:
 * - Sanitización de entradas para prevenir Cross-Site Scripting (XSS).
 * - Algoritmo de limitación de tasa (Rate Limiting) con Token Bucket en memoria para mitigar abusos y DoS en componentes interactivos.
 * - Validación y sanitización estricta de formularios y correos electrónicos.
 */

import { logger } from "./telemetry/logger";

/**
 * Sanitiza texto para evitar inyecciones XSS convirtiendo caracteres peligrosos a entidades seguras.
 * @param input Cadena sin depurar proveniente del usuario
 * @returns Cadena neutralizada
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Validador estricto de formato de email según RFC 5322 simplificado.
 * @param email Correo electrónico a evaluar
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

/**
 * Parámetros de configuración del simulador de limitación de tasa.
 */
export interface RateLimitOptions {
  windowMs: number; // Ventana de tiempo en milisegundos
  maxRequests: number; // Número máximo de peticiones permitidas en la ventana
}

/**
 * Gestor de Limitación de Tasa (Rate Limiter) en el cliente.
 * Diseñado bajo SOLID (SRP - Single Responsibility Principle).
 */
export class ClientRateLimiter {
  private requests: Map<string, number[]> = new Map();

  /**
   * Evalúa si una clave identificadora (por ejemplo: "contact-form", "theme-toggle") ha excedido el límite.
   * @param key Identificador de la acción o recurso
   * @param options Configuración de tiempo y cantidad
   * @returns { allowed: boolean, remaining: number, resetInMs: number }
   */
  public checkLimit(
    key: string,
    options: RateLimitOptions = { windowMs: 60000, maxRequests: 5 }
  ): { allowed: boolean; remaining: number; resetInMs: number } {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];

    // Descartar marcas de tiempo que cayeron fuera de la ventana deslizante actual
    const validTimestamps = timestamps.filter((t) => now - t < options.windowMs);

    if (validTimestamps.length >= options.maxRequests) {
      const oldest = validTimestamps[0];
      const resetInMs = Math.max(0, options.windowMs - (now - oldest));

      logger.log("SECURITY", "RATE_LIMIT_EXCEEDED", {
        key,
        attempts: validTimestamps.length,
        limit: options.maxRequests,
        resetInMs,
      });

      this.requests.set(key, validTimestamps);
      return { allowed: false, remaining: 0, resetInMs };
    }

    // Registrar la solicitud actual
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);

    const remaining = options.maxRequests - validTimestamps.length;
    return { allowed: true, remaining, resetInMs: options.windowMs };
  }

  /**
   * Resetea el contador para una clave específica (útil para tests o limpiezas manuales).
   */
  public reset(key?: string): void {
    if (key) {
      this.requests.delete(key);
    } else {
      this.requests.clear();
    }
  }
}

export const rateLimiter = new ClientRateLimiter();
