/**
 * @file logger.ts
 * @description Sistema de observabilidad, telemetría y logs estructurados en tiempo real.
 * Proporciona trazabilidad según directrices de confiabilidad y seguridad (OWASP).
 */

export type LogLevel = "INFO" | "WARN" | "ERROR" | "SECURITY";

export interface StructuredLog {
  timestamp: string;
  level: LogLevel;
  action: string;
  details?: Record<string, unknown>;
  userAgent?: string;
}

/**
 * Servicio de Telemetría y Logging Estructurado.
 * Implementa el principio de Responsabilidad Única (SRP - SOLID).
 */
export class TelemetryService {
  private static instance: TelemetryService;
  private logs: StructuredLog[] = [];
  private listeners: ((log: StructuredLog) => void)[] = [];

  private constructor() {}

  /**
   * Obtiene la instancia única (Patrón Singleton).
   */
  public static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  /**
   * Emite un log estructurado con metadatos contextuales.
   */
  public log(level: LogLevel, action: string, details?: Record<string, unknown>): StructuredLog {
    const entry: StructuredLog = {
      timestamp: new Date().toISOString(),
      level,
      action,
      details,
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "server-side",
    };

    this.logs.unshift(entry);
    // Limitar el buffer en memoria a los últimos 100 eventos
    if (this.logs.length > 100) {
      this.logs.pop();
    }

    // Notificar a los observadores suscritos (Patrón Observer)
    this.listeners.forEach((listener) => {
      try {
        listener(entry);
      } catch (err) {
        console.error("Error en listener de telemetría:", err);
      }
    });

    // Salida por consola estructurada
    const prefix = `[TELEMETRY][${entry.level}][${entry.action}]`;
    if (level === "ERROR" || level === "SECURITY") {
      console.error(prefix, entry);
    } else if (level === "WARN") {
      console.warn(prefix, entry);
    } else {
      console.log(prefix, entry);
    }

    return entry;
  }

  /**
   * Suscribe un callback para recibir logs en tiempo real.
   */
  public subscribe(listener: (log: StructuredLog) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Obtiene el historial reciente de logs.
   */
  public getRecentLogs(): StructuredLog[] {
    return [...this.logs];
  }

  /**
   * Limpia logs en memoria (útil para pruebas).
   */
  public clear(): void {
    this.logs = [];
  }
}

export const logger = TelemetryService.getInstance();
