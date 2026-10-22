import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";

/**
 * Tipografía principal limpia y moderna: Inter de Google Fonts.
 * Garantiza legibilidad óptima y estética premium.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rachelaponte015.github.io/Portafolio-Rachel/"),
  title: "Rachel Sánchez | Programadora Web Full-Stack",
  description:
    "Portafolio profesional de Rachel Sánchez, Programadora Web Full-Stack especializada en React, Next.js, Node.js, Clean Code, TDD y estándares de seguridad OWASP.",
  keywords: [
    "Rachel Sánchez",
    "Full-Stack Developer",
    "Programadora Web",
    "React",
    "Next.js",
    "Tailwind CSS",
    "JavaScript",
    "TDD",
    "Clean Code",
  ],
  authors: [{ name: "Rachel Sánchez" }],
  creator: "Rachel Sánchez",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://rachelaponte015.github.io/Portafolio-Rachel/",
    title: "Rachel Sánchez | Programadora Web Full-Stack",
    description:
      "Explora los proyectos, trayectoria y habilidades técnicas de Rachel Sánchez en desarrollo web Full-Stack.",
    siteName: "Portafolio de Rachel Sánchez",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 1000,
        alt: "Rachel Sánchez - Programadora Web Full-Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rachel Sánchez | Programadora Web Full-Stack",
    description:
      "Portafolio profesional de Rachel Sánchez, Programadora Web Full-Stack.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
