import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space",
  weight: "300 700",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omar Enríquez | Portafolio Profesional",
  description: "Portafolio profesional de Omar Augusto Enríquez Señas, egresado en Desarrollo de Software y Especialista en Soporte, Sistemas e Infraestructura TI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased`}
      >

        {children}
      </body>
    </html>
  );
}
