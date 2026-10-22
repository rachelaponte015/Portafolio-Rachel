import { describe, it, expect, beforeEach } from "vitest";
import { sanitizeHtml, isValidEmail, ClientRateLimiter } from "./security";
import { TelemetryService } from "./telemetry/logger";

describe("TDD - Security and OWASP sanitization suite", () => {
  it("debe sanitizar caracteres maliciosos de inyección XSS", () => {
    const malicious = `<script>alert('xss')</script><img src="x" onerror="evil()"/>`;
    const sanitized = sanitizeHtml(malicious);

    expect(sanitized).not.toContain("<script>");
    expect(sanitized).toContain("&lt;script&gt;");
    expect(sanitized).toContain("&quot;");
    expect(sanitized).toContain("&#x27;");
  });

  it("debe validar correctamente correos válidos e invalidar entradas maliciosas", () => {
    expect(isValidEmail("rachel@example.com")).toBe(true);
    expect(isValidEmail("rachel.sanchez@tech.io")).toBe(true);
    expect(isValidEmail("usuario_invalido@")).toBe(false);
    expect(isValidEmail("<script>@evil.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("TDD - Rate Limiter (Token Bucket / Sliding Window)", () => {
  let limiter: ClientRateLimiter;

  beforeEach(() => {
    limiter = new ClientRateLimiter();
  });

  it("debe permitir solicitudes dentro del límite configurado", () => {
    const result1 = limiter.checkLimit("test-action", { windowMs: 5000, maxRequests: 2 });
    expect(result1.allowed).toBe(true);
    expect(result1.remaining).toBe(1);

    const result2 = limiter.checkLimit("test-action", { windowMs: 5000, maxRequests: 2 });
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(0);
  });

  it("debe bloquear y simular rate limiting al sobrepasar el límite permitido", () => {
    limiter.checkLimit("test-action", { windowMs: 5000, maxRequests: 2 });
    limiter.checkLimit("test-action", { windowMs: 5000, maxRequests: 2 });

    const blocked = limiter.checkLimit("test-action", { windowMs: 5000, maxRequests: 2 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInMs).toBeGreaterThan(0);
  });
});

describe("TDD - Observabilidad y Telemetría Estructurada", () => {
  it("debe registrar eventos con timestamps y estructura adecuada", () => {
    const telemetry = TelemetryService.getInstance();
    telemetry.clear();

    const logEntry = telemetry.log("INFO", "TEST_EVENT", { detail: "prueba exitosa" });
    expect(logEntry.level).toBe("INFO");
    expect(logEntry.action).toBe("TEST_EVENT");
    expect(logEntry.timestamp).toBeDefined();

    const recent = telemetry.getRecentLogs();
    expect(recent.length).toBe(1);
    expect(recent[0].action).toBe("TEST_EVENT");
  });
});
