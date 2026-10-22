import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Función utilitaria para combinar clases de Tailwind de forma limpia y sin colisiones.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
