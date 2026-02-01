"use client";
import Link from "next/link";
import SkillChart from "./components/SkillChart";
import TechTabs from "./components/TechTabs";
import ProjectCard from "./components/ProjectCard";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollToTop from "./components/ScrollToTop";
import { TypeAnimation } from "react-type-animation";
import ExperienceTimeline from "./components/ExperienceTimeline";

// Icons
import { FaLightbulb, FaHandsHelping, FaRocket, FaUserCheck } from "react-icons/fa";
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

// --- CONSTANTS & DATA ---

const SOFT_SKILLS = [
  { name: "Aprendizaje Ágil", icon: FaRocket, color: "text-yellow-500", borderHover: "hover:border-yellow-500" },
  { name: "Proactivo", icon: FaLightbulb, color: "text-blue-500", borderHover: "hover:border-blue-500" },
  { name: "Adaptable", icon: FaUserCheck, color: "text-green-500", borderHover: "hover:border-green-500" },
  { name: "Colaborativo", icon: FaHandsHelping, color: "text-purple-500", borderHover: "hover:border-purple-500" },
];

export default function Home() {
  return (
    // CAMBIO 1: Agregué un fondo de cuadrícula "Cyber Grid" en el className del main
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center p-4 md:p-24 relative overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">

      {/* SECCIÓN PRINCIPAL: HERO (TEXTO + FOTO) */}
      <div id="inicio" className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 relative z-10">

        {/* Columna Izquierda: Introducción */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Omar Augusto <br />
            <span className="text-blue-500">Enriquez Señas</span>
          </h1>

          {/* TEXTO ANIMADO (TYPEWRITER) */}
          <div className="text-2xl md:text-3xl font-semibold text-slate-400 min-h-[40px] flex items-center gap-2">
            <span>Soy</span>
            <TypeAnimation
              sequence={[
                "Desarrollador Full-Stack",
                1500,
                "Experto en Bases de Datos",
                1500,
                "Diseñador de Interfaces",
                1500,
                "Estudiante en SENATI",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-blue-400 font-bold"
            />
          </div>

          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Desarrollador de software en formación con enfoque Full-Stack.
            Experto en gestión de bases de datos y diseño de interfaces.
          </p>

          {/* Botones de acción FUNCIONALES */}
          <div className="flex gap-4 pt-4 flex-wrap">
            <a
              href="https://wa.me/51984932392?text=Hola%20Omar,%20vi%20tu%20portafolio%20y%20me%20gustaría%20contactarte."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-green-500/20 flex items-center gap-2 hover:-translate-y-1"
            >
              <FaWhatsapp className="text-xl" /> Contactar
            </a>

            <a
              href="https://github.com/omarrrr-web"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-medium border border-gray-700 transition-all shadow-lg shadow-gray-500/20 flex items-center gap-2 hover:-translate-y-1"
            >
              GitHub<FaGithub className="text-xl" />
            </a>

            <a
              href="/CVOMAR.pdf"
              download="CV_Omar_Enriquez.pdf"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-red-500/20 flex items-center gap-2 hover:-translate-y-1"
            >
              <FaFilePdf className="text-xl" /> Descargar CV
            </a>
          </div>
        </div>

        {/* Columna Derecha: FOTO DE PERFIL */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* CAMBIO 2: ORBE ANIMADO MÁS INTENSO */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-80 h-80 bg-blue-600/30 rounded-full blur-[60px] -z-10"
          ></motion.div>

          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[4px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
            <div className="rounded-full overflow-hidden w-full h-full bg-slate-900 relative">
              <Image
                src="/perfil.png"
                alt="Foto de Omar Enríquez"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>

      </div>

      {/* --- SECCIÓN DE STACK TECNOLÓGICO (CARRUSEL MÁS RÁPIDO) --- */}
      <div className="mt-12 w-full max-w-full overflow-hidden relative z-10">
        <h3 className="text-2xl font-semibold text-slate-400 mb-8 text-center max-w-6xl mx-auto px-4">
          Stack Tecnológico
        </h3>

        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-950 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent"></div>

          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: "-33.33%" }}
            initial={{ x: "0%" }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8">
                {[
                  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, color: "border-yellow-400/20" },
                  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, color: "border-blue-500/20" },
                  { name: "React", icon: <SiReact className="text-cyan-400" />, color: "border-cyan-400/20" },
                  { name: "Next.js", icon: <SiNextdotjs className="text-white" />, color: "border-white/20" },
                  { name: "MySQL", icon: <SiMysql className="text-orange-400" />, color: "border-orange-400/20" },
                  { name: "Git", icon: <SiGit className="text-red-500" />, color: "border-red-500/20" },
                  { name: "Figma", icon: <SiFigma className="text-pink-500" />, color: "border-pink-500/20" },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center w-32 h-32 bg-slate-900/50 rounded-2xl border ${tech.color} backdrop-blur-sm shrink-0`}
                  >
                    <div className="text-4xl mb-3">{tech.icon}</div>
                    <span className="text-xs text-slate-400 font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* --- SECCIÓN: PERFIL, TRAYECTORIA Y RADAR --- */}
      <div id="perfil" className="mt-32 w-full max-w-7xl px-4 mb-24 z-10">

        {/* Usamos items-start para que Perfil y Trayectoria empiecen alineados arriba */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* 1. Columna Izquierda: PERFIL PROFESIONAL */}
          <div className="flex flex-col h-full">
            <h3 className="text-3xl font-bold text-slate-200 mb-6 text-center md:text-left">
              Perfil Profesional
            </h3>
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm mb-6">
              <p className="text-lg text-slate-400 leading-relaxed">
                Soy un <span className="text-blue-400 font-semibold">Desarrollador de Software en formación</span> caracterizado por mi
                capacidad de aprendizaje ágil y adaptación rápida a nuevas tecnologías. Me apasiona aportar
                <span className="text-blue-400 font-semibold"> soluciones eficaces a problemas reales</span>.
              </p>
            </div>

            {/* Soft Skills */}
            <div className="grid grid-cols-2 gap-4">
              {SOFT_SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className={`p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3 ${skill.borderHover} transition-colors group`}
                >
                  <skill.icon className={`text-2xl group-hover:scale-110 transition-transform ${skill.color}`} />
                  <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Columna Derecha: TRAYECTORIA PROFESIONAL */}
          <div className="w-full z-10 flex flex-col h-full">
            <h3 className="text-3xl font-bold text-slate-200 mb-6 text-center md:text-left">
              Trayectoria Profesional
            </h3>
            {/* Contenedor con altura mínima para alinearse visualmente */}
            <div className="flex-grow">
              <ExperienceTimeline />
            </div>
          </div>

          {/* 3. Fila Inferior (Centrada): RADAR */}
          <div className="md:col-span-2 flex justify-center w-full mt-12">
            <div className="w-full max-w-[500px] bg-slate-800/50 rounded-3xl border border-slate-800 p-8 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">

              {/* Orbe animado */}
              <motion.div
                animate={{
                  x: [0, 80, -80, 0],
                  y: [0, -50, 50, 0],
                  rotate: [0, 180, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 bg-purple-600/30 rounded-full blur-[60px] -z-10"
              ></motion.div>

              <h3 className="text-xl text-slate-200 font-bold mb-6 tracking-wide">
                Competencias Clave
              </h3>
              <div className="w-full h-[350px] flex justify-center">
                <SkillChart />
              </div>
            </div>
          </div>

        </div>
      </div >
      {/* --- SECCIÓN: DETALLE DE HABILIDADES --- */}
      < div className="w-full max-w-6xl mb-12 z-10" >
        <h3 className="text-3xl font-bold text-center text-slate-200 mb-8">
          Detalle de Habilidades
        </h3>
        <TechTabs />
      </div >

      {/* --- SECCIÓN DE PROYECTOS DESTACADOS --- */}
      < div className="mt-32 w-full max-w-5xl mb-24 z-10" >
        <h3 className="text-3xl font-bold text-center text-slate-200 mb-12">
          Proyectos Destacados
        </h3>
        <div className="space-y-8">
          <ProjectCard
            title="TechZone Store - E-commerce"
            type="Full Stack Web App"
            description="Plataforma de comercio electrónico con gestión de inventario en tiempo real. Incluye panel de administración protegido, carrito de compras persistente, filtros dinámicos y checkout integrado con WhatsApp."
            role="Arquitectura completa: Desarrollo del Frontend, diseño de Base de Datos en Supabase, autenticación y lógica de negocio (CRUD)."
            techStack={["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS", "Zustand"]}
            link="https://techzone-store-i2bm.vercel.app/"
          />
          <ProjectCard
            title="Sistema de Ventas N-Capas"
            type="Escritorio (.NET)"
            description="Sistema integral para la gestión comercial que incluye módulos de clientes, inventario y facturación."
            role="Implementé la lógica de negocio y la capa de datos usando ADO.NET."
            techStack={["C#", "SQL Server", "WinForms", "ADO.NET", "N-Capas"]}
          />
          <ProjectCard
            title="Sistema de Control Logístico"
            type="Escritorio (Java)"
            description="Aplicación para la gestión de transporte y rutas. Utiliza el patrón MVC y autenticación basada en roles."
            role="Desarrollé el módulo de seguridad con validación de roles de usuario e integré iText para reportes."
            techStack={["Java", "MySQL", "MVC", "iText PDF", "Stored Procedures"]}
          />
          <ProjectCard
            title="Sistema de Tickets de Soporte"
            type="Diseño UI/UX"
            description="Prototipo de alta fidelidad para una plataforma de gestión de incidencias técnicas."
            role="Diseñé el flujo completo de usuario y la interfaz visual en Figma."
            techStack={["Figma", "Prototipado", "User Flow", "Wireframing"]}
          />
        </div>
      </div >

      {/* --- SECCIÓN DE FORMACIÓN Y CERTIFICACIONES --- */}
      < div className="w-full max-w-5xl mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 z-10" >

        {/* Columna 1 */}
        < motion.div
          initial={{ opacity: 0, x: -50 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm h-full hover:border-blue-500/30 transition-colors"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaGraduationCap className="text-blue-500" /> Formación Académica
          </h3>
          <div className="relative border-l-2 border-slate-800 ml-3 pl-8 pb-2 space-y-8">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-900 bg-blue-500"></div>
              <h4 className="text-lg font-semibold text-slate-200">Desarrollo de Software</h4>
              <span className="text-sm text-blue-400 font-medium mb-2 block">SENATI • 2022 - Actualidad</span>
              <p className="text-slate-400 text-sm">
                Formación técnica profesional enfocada en ingeniería de software, bases de datos y metodologías ágiles.
              </p>
            </div>
          </div>
        </motion.div >

        {/* Columna 2 */}
        < div className="flex flex-col gap-4" >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mb-2 flex items-center gap-3"
          >
            <FaCertificate className="text-green-500" /> Certificaciones
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all cursor-default group"
          >
            <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors text-slate-400"><FaCertificate /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-medium text-sm">Arquitectura y Servicios de Azure</h4>
              <p className="text-xs text-slate-500">Microsoft Azure</p>
            </div>
            <a href="Azure1.png/" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs font-medium text-green-400 bg-green-400/10 rounded-lg hover:bg-green-400/20 border border-green-400/20 transition-colors">Ver</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-default group"
          >
            <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors text-slate-400"><FaCertificate /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-medium text-sm">CPA: Programming Essentials in C++</h4>
              <p className="text-xs text-slate-500">Cisco Networking Academy®</p>
            </div>
            <a href="OMAR AUGUSTOENRIQUEZ SEÑAS-PROGRAMMING ESSE-certificate.pdf" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs font-medium text-purple-400 bg-purple-400/10 rounded-lg hover:bg-purple-400/20 border border-purple-400/20 transition-colors">Ver</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all cursor-default group"
          >
            <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-yellow-500/20 group-hover:text-yellow-400 transition-colors text-slate-400"><FaCertificate /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-medium text-sm">Database Programming with SQL</h4>
              <p className="text-xs text-slate-500">Oracle Academy</p>
            </div>
            <a href="clmsCertificate.pdf" target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs font-medium text-yellow-400 bg-yellow-400/10 rounded-lg hover:bg-yellow-400/20 border border-yellow-400/20 transition-colors">Ver</a>
          </motion.div>

        </div >
      </div >

      <footer className="w-full py-8 border-t border-slate-800 text-center z-10">
        <p className="text-slate-500 text-sm mb-4">
          Diseñado y Desarrollado por <span className="text-slate-300 font-medium">Omar Enríquez</span> 🚀
        </p>
        <div className="flex justify-center gap-6">
          <a href="mailto:enriquezomar22@outlook.es" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <FaEnvelope /> enriquezomar22@outlook.es
          </a>
          <a href="https://pe.linkedin.com/in/omar-enriquez-320542241" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </footer>
      <ScrollToTop />
    </main >
  );
}