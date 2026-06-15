"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import SkillChart from "./components/SkillChart";
import TechTabs from "./components/TechTabs";
import ProjectCard from "./components/ProjectCard";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollToTop from "./components/ScrollToTop";
import ExperienceTimeline from "./components/ExperienceTimeline";
import HolographicTechCard from "./components/HolographicTechCard";
import InteractiveNetworkBackground from "./components/InteractiveNetworkBackground";

// Icons
import { FaLaptopCode, FaServer, FaClipboardList, FaDownload, FaSun, FaMoon, FaGlobe } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiMysql,
  SiGit,
  SiFigma,
} from "react-icons/si";
import { FaGithub, FaWhatsapp, FaFilePdf, FaGraduationCap, FaCertificate, FaEnvelope, FaLinkedin } from "react-icons/fa";

// Translation dictionary
const translations = {
  es: {
    status: "ESTADO DEL SISTEMA: ACTIVO // OMAR_DEV",
    tagline: "EGRESADO DE DESARROLLO DE SOFTWARE",
    title: "Omar Augusto",
    surname: "Enriquez Señas",
    description: "Egresado de **SENATI** en Desarrollo de Software. Cuento con sólida formación técnica y experiencia práctica en soporte técnico, resolución de incidencias, optimización de infraestructura y gestión de activos TI.",
    contactBtn: "CONTACTAR",
    downloadCv: "DESCARGAR CV",
    dashboardTitle: "Dashboard Profesional",
    profileTitle: "Perfil Profesional",
    profileText: "Egresado calificado para el despliegue de sistemas, configuración de equipos y optimización de infraestructura tecnológica mediante proyectos de mejora. Proactivo, con alta orientación al trabajo en equipo y adaptabilidad para asimilar nuevas metodologías informáticas y optimizar la operatividad corporativa.",
    skillsTitle: "Radar de Competencias",
    expTitle: "Historial de Operaciones (Experiencia)",
    tabsTitle: "Filtro de Habilidades Técnicas",
    projectsTitle: "Proyectos Implementados",
    projectsSub: "// APLICACIONES DE ESCRITORIO, SOLUCIONES TI Y DESARROLLOS WEB",
    eduTitle: "Formación Académica",
    eduRole: "Desarrollo de Software (Egresado)",
    eduText: "Formación técnica y práctica enfocada en lenguajes de programación, diseño y modelado de bases de datos SQL, análisis de requerimientos e infraestructura de TI.",
    certTitle: "Certificaciones",
    footerText: "// INFRASTRUCTURE DEV & DESIGNED BY OMAR ENRÍQUEZ 🚀 2026",
    
    // Project details
    p1Title: "Proyecto de Mejora SENATI (Egresado - 2026)",
    p1Type: "Eficiencia e Infraestructura",
    p1Desc: "Implementación de una solución técnica optimizada para un entorno real de operaciones, aprobada satisfactoriamente con enfoque en la eficiencia de sistemas informáticos.",
    p1Role: "Diseño técnico, modelado de procesos, análisis de cuellos de botella y despliegue del sistema operativo corporativo.",
    
    p2Title: "Omster - E-commerce Gaming Premium",
    p2Type: "Desarrollo Web Full Stack (Astro + React)",
    p2Desc: "Plataforma de comercio electrónico moderna orientada a la venta de periféricos y equipos gaming de alta gama. Cuenta con un panel de administración para gestionar productos, reseñas y almacenamiento de imágenes.",
    p2Role: "Arquitectura de islas (Astro) para rendimiento y SEO óptimo, componentes interactivos en React, base de datos y autenticación con Supabase.",

    p3Title: "Sistema de Tickets para Soporte (UI/UX)",
    p3Type: "Prototipado en Figma",
    p3Desc: "Diseño del flujo completo y la interfaz gráfica para la gestión, seguimiento y resolución de incidencias tecnológicas, adaptada para administradores de TI.",
    p3Role: "Prototipado de alta fidelidad, user flow, interacciones dinámicas de tickets en Figma.",

    p4Title: "Sistema de Control Logístico y Transporte",
    p4Type: "Escritorio (Java + MySQL)",
    p4Desc: "Desarrollo de una aplicación con arquitectura N-capas para el control de transporte y logística corporativa, integrando seguridad por roles de usuario y reportes automatizados.",
    p4Role: "Lógica de negocio en Java, programación de bases de datos relacionales en MySQL con Stored Procedures, e integración de reportes PDF con iText.",
  },
  en: {
    status: "SYSTEM STATUS: ACTIVE // OMAR_DEV",
    tagline: "SOFTWARE DEVELOPMENT GRADUATE",
    title: "Omar Augusto",
    surname: "Enriquez Senas",
    description: "Software Development graduate from **SENATI**. Solid technical background and hands-on experience in technical support, troubleshooting, infrastructure optimization, and IT asset management.",
    contactBtn: "CONTACT ME",
    downloadCv: "DOWNLOAD CV",
    dashboardTitle: "Professional Dashboard",
    profileTitle: "Professional Profile",
    profileText: "Graduate qualified for systems deployment, equipment configuration, and IT infrastructure optimization through improvement projects. Proactive, team-oriented, and highly adaptable to master new methodologies and improve corporate operations.",
    skillsTitle: "Competency Radar",
    expTitle: "Operations Log (Experience)",
    tabsTitle: "Technical Skills Filter",
    projectsTitle: "Implemented Projects",
    projectsSub: "// DESKTOP APPLICATIONS, IT SOLUTIONS & WEB DEVELOPMENTS",
    eduTitle: "Academic Education",
    eduRole: "Software Development (Graduate)",
    eduText: "Technical and practical training focused on programming languages, SQL database design and modeling, requirements analysis, and IT infrastructure.",
    certTitle: "Certifications",
    footerText: "// INFRASTRUCTURE DEV & DESIGNED BY OMAR ENRÍQUEZ 🚀 2026",
    
    // Project details
    p1Title: "SENATI Improvement Project (Graduate - 2026)",
    p1Type: "Efficiency & Infrastructure",
    p1Desc: "Implementation of an optimized technical solution for a real operations environment, successfully approved with a focus on IT system efficiency.",
    p1Role: "Technical design, process modeling, bottleneck analysis, and deployment of the corporate operating system.",

    p2Title: "Omster - Premium Gaming E-commerce",
    p2Type: "Full Stack Web Development (Astro + React)",
    p2Desc: "Modern e-commerce platform for high-end gaming peripherals and equipment. Features an admin panel to manage products, user reviews, and cloud image storage.",
    p2Role: "Astro island architecture for performance and SEO, interactive React components, database, and auth integration via Supabase.",

    p3Title: "Support Ticketing System (UI/UX)",
    p3Type: "Figma Prototyping",
    p3Desc: "Design of the complete user flow and graphical interface for IT incident management, tracking, and resolution, customized for IT administrators.",
    p3Role: "High fidelity prototyping, user flow, and dynamic ticket interactions in Figma.",

    p4Title: "Logistic & Transport Control System",
    p4Type: "Desktop (Java + MySQL)",
    p4Desc: "N-layer desktop application for transport and corporate logistics management, integrating user role security and automated reports.",
    p4Role: "Java business logic, MySQL relational database programming with Stored Procedures, and iText PDF report integration.",
  }
};

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    if (typeof document !== "undefined") {
      if (nextMode) {
        document.documentElement.classList.add("light-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
      }
    }
  };

  const t = isEnglish ? translations.en : translations.es;


  return (
    <main className="min-h-screen bg-dark-bg text-text-muted transition-colors duration-300 flex flex-col items-center p-4 md:p-12 relative overflow-hidden">
      
      {/* Animated network grid background */}
      <InteractiveNetworkBackground />
      
      {/* Background decoration (IT Infrastructure Dashboard atmosphere) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-20 bg-[linear-gradient(to_right,#1B243140_1px,transparent_1px),linear-gradient(to_bottom,#1B243140_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Ambient decorative terminal-style blurred accent line */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[40%] bg-primary-cyan/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] bg-accent-amber/5 rounded-full blur-[120px] -z-10"></div>

      {/* --- CABECERA DE OPERACIONES / NAVIGATION --- */}
      <header className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between py-6 border-b border-dark-border mb-16 relative z-10 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-primary-cyan animate-pulse"></div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted">
            {t.status}
          </span>
        </div>
        
        {/* Nav Links & Controls */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider uppercase">
          <div className="flex gap-4">
            <a href="#inicio" className="text-text-muted hover:text-primary-cyan transition-colors">.home</a>
            <a href="#perfil" className="text-text-muted hover:text-primary-cyan transition-colors">.profile</a>
            <a href="#proyectos" className="text-text-muted hover:text-primary-cyan transition-colors">.projects</a>
            <a href="#certificaciones" className="text-text-muted hover:text-primary-cyan transition-colors">.certifications</a>
          </div>

          <div className="h-4 w-px bg-dark-border hidden sm:block"></div>

          {/* Bilingual & Theme Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dark-border bg-dark-surface/40 hover:border-primary-cyan text-text-muted hover:text-primary-cyan transition-all"
            >
              <FaGlobe />
              <span>{isEnglish ? "ESP" : "ENG"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2.5 rounded-xl border border-dark-border bg-dark-surface/40 hover:border-primary-cyan text-text-muted hover:text-primary-cyan transition-all"
              title={isLightMode ? "Modo Oscuro" : "Modo Claro"}
            >
              {isLightMode ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div id="inicio" className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-28 relative z-10">
        
        {/* Columna Izquierda: Introducción de Infraestructura */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dark-surface/80 border border-dark-border rounded-lg font-mono text-xs text-primary-cyan">
            <span className="w-2 h-2 rounded-full bg-primary-cyan animate-ping"></span>
            {t.tagline}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-text-title leading-none">
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-accent-amber">
              {t.surname}
            </span>
          </h1>

          <p className="text-base text-text-muted leading-relaxed max-w-lg">
            {t.description}
          </p>


          {/* Botones de acción directos */}
          <div className="flex flex-wrap gap-3.5 pt-4">
            <a
              href="https://wa.me/51984932392?text=Hola%20Omar,%20vi%20tu%20portafolio%20y%20me%20gustaría%20contactarte."
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/20 font-mono text-sm hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-lg" /> {t.contactBtn}
            </a>

            <a
              href="https://github.com/omarrrr-web"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-5 py-3 bg-dark-surface hover:bg-dark-surface/80 text-white border border-dark-border rounded-xl font-medium transition-all flex items-center gap-2 font-mono text-sm hover:-translate-y-0.5 hover:border-slate-600"
            >
              <FaGithub className="text-lg" /> GITHUB
            </a>

            <a
              href="/CVOMAR.pdf"
              download="CV_Omar_Enriquez.pdf"
              className="cursor-pointer px-5 py-3 bg-dark-surface hover:bg-dark-surface/80 text-[#FF9E00] border border-[#FF9E00]/30 rounded-xl font-medium transition-all flex items-center gap-2 font-mono text-sm hover:-translate-y-0.5 hover:border-[#FF9E00]/60"
            >
              <FaDownload className="text-sm" /> {t.downloadCv}
            </a>
          </div>
        </div>

        {/* Columna Derecha: Tarjetas 3D Holográficas */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <HolographicTechCard isEnglish={isEnglish} />
        </div>
      </div>

      {/* --- TECNOLOGÍAS INFRASTRUCTURE BAR (CARRUSEL AUTOMÁTICO) --- */}
      <div className="w-full max-w-full overflow-hidden relative z-10 mb-28">
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-dark-bg to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-dark-bg to-transparent"></div>

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: "-33.33%" }}
            initial={{ x: "0%" }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
                  { name: "React / Next.js", icon: <SiNextdotjs className="text-white" /> },
                  { name: "SQL Server", icon: <SiMysql className="text-[#CC2927]" /> },
                  { name: "MySQL / Supabase", icon: <SiMysql className="text-[#00758F]" /> },
                  { name: "C# .NET", icon: <SiTypescript className="text-purple-500" /> },
                  { name: "Git & GitHub", icon: <SiGit className="text-orange-500" /> },
                  { name: "Figma UI", icon: <SiFigma className="text-pink-500" /> },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-5 py-3 bg-dark-surface/60 rounded-xl border border-dark-border backdrop-blur-sm shrink-0"
                  >
                    <div className="text-xl">{tech.icon}</div>
                    <span className="text-xs text-text-title font-mono uppercase tracking-wider">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- SECCIÓN BENTO-GRID DE PERFIL & TRAYECTORIA --- */}
      <div id="perfil" className="w-full max-w-7xl px-2 z-10 mb-28">
        <h2 className="text-3xl font-bold font-display tracking-tight text-text-title mb-10 text-center md:text-left">
          {t.dashboardTitle}
        </h2>

        {/* Estructura Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Cell 1: Perfil Resumen */}
          <div className="lg:col-span-7 bg-dark-surface/50 border border-dark-border rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between hover:border-primary-cyan/40 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary-cyan/10 rounded-lg text-primary-cyan">
                  <FaLaptopCode className="text-lg" />
                </div>
                <h3 className="text-lg font-bold text-text-title font-display">{t.profileTitle}</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                {t.profileText}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { title: isEnglish ? "Agile Learning" : "Aprendizaje Ágil", color: "border-primary-cyan/20 hover:border-primary-cyan text-primary-cyan" },
                { title: isEnglish ? "Proactive" : "Proactivo", color: "border-accent-amber/20 hover:border-accent-amber text-accent-amber" },
                { title: isEnglish ? "Adaptability" : "Adaptabilidad", color: "border-emerald-500/20 hover:border-emerald-500 text-emerald-400" },
                { title: isEnglish ? "Collaboration" : "Colaboración", color: "border-purple-500/20 hover:border-purple-500 text-purple-400" },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-3 bg-dark-bg/80 rounded-xl border ${skill.color} text-center text-xs font-mono tracking-wider uppercase transition-colors duration-300`}
                >
                  {skill.title}
                </div>
              ))}
            </div>
          </div>

          {/* Bento Cell 2: Radar de Competencias */}
          <div className="lg:col-span-5 bg-dark-surface/50 border border-dark-border rounded-3xl p-6 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden hover:border-primary-cyan/40 transition-colors">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="p-1.5 bg-accent-amber/10 rounded-md text-accent-amber">
                <FaServer className="text-sm" />
              </div>
              <h3 className="text-xs font-bold text-text-muted font-mono tracking-wider uppercase">{t.skillsTitle}</h3>
            </div>
            <div className="w-full flex items-center justify-center mt-6">
              <SkillChart isEnglish={isEnglish} />
            </div>
          </div>

          {/* Bento Cell 3: Trayectoria Timeline */}
          <div className="lg:col-span-12 bg-dark-surface/50 border border-dark-border rounded-3xl p-8 backdrop-blur-sm hover:border-primary-cyan/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <FaClipboardList className="text-lg" />
              </div>
              <h3 className="text-lg font-bold text-text-title font-display">{t.expTitle}</h3>
            </div>
            <ExperienceTimeline isEnglish={isEnglish} />
          </div>

          {/* Bento Cell 4: Detalle de Habilidades Filtrable */}
          <div className="lg:col-span-12 bg-dark-surface/50 border border-dark-border rounded-3xl p-8 backdrop-blur-sm hover:border-primary-cyan/40 transition-colors">
            <h3 className="text-lg font-bold text-text-title font-display mb-8 text-center md:text-left">
              {t.tabsTitle}
            </h3>
            <TechTabs isEnglish={isEnglish} />
          </div>

        </div>
      </div>

      {/* --- SECCIÓN DE PROYECTOS DESTACADOS --- */}
      <div id="proyectos" className="w-full max-w-5xl px-4 mb-28 z-10">
        <h2 className="text-3xl font-bold font-display tracking-tight text-text-title mb-4 text-center">
          {t.projectsTitle}
        </h2>
        <p className="text-text-muted text-sm text-center max-w-lg mx-auto mb-12 font-mono">
          {t.projectsSub}
        </p>

        <div className="space-y-6">
          <ProjectCard
            title={t.p1Title}
            type={t.p1Type}
            description={t.p1Desc}
            role={t.p1Role}
            techStack={["Optimización", "Análisis TI", "Sistemas Operativos", "Procesos"]}
          />

          <ProjectCard
            title={t.p2Title}
            type={t.p2Type}
            description={t.p2Desc}
            role={t.p2Role}
            techStack={["Astro", "React", "Tailwind CSS", "Framer Motion", "Supabase"]}
            link="https://omster.vercel.app"
          />


          <ProjectCard
            title={t.p3Title}
            type={t.p3Type}
            description={t.p3Desc}
            role={t.p3Role}
            techStack={["Figma", "User Flow", "Prototipado interactivo", "Wireframes"]}
          />

          <ProjectCard
            title={t.p4Title}
            type={t.p4Type}
            description={t.p4Desc}
            role={t.p4Role}
            techStack={["Java", "MySQL", "MVC Architecture", "Stored Procedures", "iText PDF"]}
          />
        </div>
      </div>

      {/* --- SECCIÓN DE FORMACIÓN Y CERTIFICACIONES --- */}
      <div id="certificaciones" className="w-full max-w-5xl mb-28 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 z-10">

        {/* Columna Formación */}
        <div className="bg-dark-surface/50 border border-dark-border rounded-3xl p-8 backdrop-blur-sm hover:border-primary-cyan/40 transition-colors">
          <h3 className="text-xl font-bold font-display text-text-title mb-6 flex items-center gap-3">
            <FaGraduationCap className="text-primary-cyan text-2xl" /> {t.eduTitle}
          </h3>
          <div className="relative border-l-2 border-dark-border ml-3 pl-8 pb-2 space-y-6">
            <div className="relative">
              <div className="absolute -left-[41px] top-1.5 h-4.5 w-4.5 rounded-full border-4 border-dark-bg bg-primary-cyan"></div>
              <h4 className="text-md font-bold text-text-title">{t.eduRole}</h4>
              <span className="text-xs text-primary-cyan font-mono mb-2 block">SENATI • 2022 - 2026</span>
              <p className="text-text-muted text-sm leading-relaxed">
                {t.eduText}
              </p>
            </div>
          </div>
        </div>

        {/* Columna Certificaciones */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold font-display text-text-title mb-2 flex items-center gap-3">
            <FaCertificate className="text-accent-amber text-2xl" /> {t.certTitle}
          </h3>

          <div className="flex items-center gap-4 p-4 bg-dark-surface/80 border border-dark-border rounded-2xl hover:border-primary-cyan/40 hover:shadow-lg hover:shadow-primary-cyan/5 transition-all cursor-default group">
            <div className="p-3 bg-dark-bg rounded-xl group-hover:text-primary-cyan transition-colors text-text-muted"><FaCertificate /></div>
            <div className="flex-1">
              <h4 className="text-text-title font-bold text-sm">Arquitectura y Servicios de Azure</h4>
              <p className="text-xs text-text-muted/70 font-mono">Microsoft Azure</p>
            </div>
            <a href="Azure1.png" target="_blank" rel="noopener noreferrer" className="cursor-pointer px-3 py-1.5 text-xs font-mono font-medium text-primary-cyan bg-primary-cyan/10 rounded-lg hover:bg-primary-cyan/20 border border-primary-cyan/20 transition-colors">VER</a>
          </div>

          <div className="flex items-center gap-4 p-4 bg-dark-surface/80 border border-dark-border rounded-2xl hover:border-[#8A2BE2]/40 hover:shadow-lg hover:shadow-[#8A2BE2]/5 transition-all cursor-default group">
            <div className="p-3 bg-dark-bg rounded-xl group-hover:text-[#8A2BE2] transition-colors text-text-muted"><FaCertificate /></div>
            <div className="flex-1">
              <h4 className="text-text-title font-bold text-sm">CPA: Programming Essentials in C++</h4>
              <p className="text-xs text-text-muted/70 font-mono">Cisco Networking Academy®</p>
            </div>
            <a href="OMAR AUGUSTOENRIQUEZ SEÑAS-PROGRAMMING ESSE-certificate.pdf" target="_blank" rel="noopener noreferrer" className="cursor-pointer px-3 py-1.5 text-xs font-mono font-medium text-[#8A2BE2] bg-[#8A2BE2]/10 rounded-lg hover:bg-[#8A2BE2]/20 border border-[#8A2BE2]/20 transition-colors">VER</a>
          </div>

          <div className="flex items-center gap-4 p-4 bg-dark-surface/80 border border-dark-border rounded-2xl hover:border-accent-amber/40 hover:shadow-lg hover:shadow-accent-amber/5 transition-all cursor-default group">
            <div className="p-3 bg-dark-bg rounded-xl group-hover:text-accent-amber transition-colors text-text-muted"><FaCertificate /></div>
            <div className="flex-1">
              <h4 className="text-text-title font-bold text-sm">Database Programming with SQL</h4>
              <p className="text-xs text-text-muted/70 font-mono">Oracle Academy</p>
            </div>
            <a href="clmsCertificate.pdf" target="_blank" rel="noopener noreferrer" className="cursor-pointer px-3 py-1.5 text-xs font-mono font-medium text-accent-amber bg-accent-amber/10 rounded-lg hover:bg-accent-amber/20 border border-accent-amber/20 transition-colors">VER</a>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="w-full py-8 border-t border-dark-border text-center z-10">
        <p className="text-text-muted/50 text-xs font-mono mb-4">
          {t.footerText}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 font-mono text-xs">
          <a href="mailto:enriquezomar22@outlook.es" className="text-text-muted hover:text-text-title transition-colors flex items-center justify-center gap-2">
            <FaEnvelope className="text-primary-cyan" /> enriquezomar22@outlook.es
          </a>
          <a href="https://pe.linkedin.com/in/omar-enriquez-320542241" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-title transition-colors flex items-center justify-center gap-2">
            <FaLinkedin className="text-primary-cyan" /> LINKEDIN
          </a>
        </div>
      </footer>
      <ScrollToTop />
    </main>
  );
}