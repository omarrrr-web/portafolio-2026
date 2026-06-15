import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
