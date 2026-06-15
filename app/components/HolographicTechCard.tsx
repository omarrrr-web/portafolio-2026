"use client";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { FaLaptopCode, FaServer, FaDatabase } from "react-icons/fa";

interface CardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  gradient: string;
  textColor: string;
  borderColor: string;
}

function Card({ title, subtitle, icon, tags, gradient, textColor, borderColor }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mapear el movimiento a la rotación 3D (tilt)
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  // Efecto de brillo de lente (glare)
  const glareX = useTransform(x, [-150, 150], [0, 100]);
  const glareY = useTransform(y, [-150, 150], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calcular posición del mouse respecto al centro de la tarjeta
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full max-w-[280px] h-[360px] rounded-3xl p-6 border ${borderColor} bg-dark-surface/40 backdrop-blur-md overflow-hidden cursor-pointer select-none transition-shadow hover:shadow-2xl`}
    >
      {/* Efecto Glare de brillo holográfico */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Gradiente sutil de fondo */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.03]`} />

      {/* Contenido con perspectiva 3D */}
      <div className="h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div>
          {/* Cabecera / Icono */}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-dark-bg/60 border ${borderColor} ${textColor} text-xl mb-6`}>
            {icon}
          </div>
          
          <h4 className="text-xs font-mono tracking-widest uppercase text-text-muted mb-1">{subtitle}</h4>
          <h3 className="text-xl font-bold font-display text-text-title">{title}</h3>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-[10px] font-mono text-text-muted uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


interface HolographicTechCardProps {
  isEnglish: boolean;
}

export default function HolographicTechCard({ isEnglish }: HolographicTechCardProps) {
  const cards = [
    {
      title: isEnglish ? "Software Development" : "Desarrollo de Software",
      subtitle: "DEV // INFRA",
      icon: <FaLaptopCode />,
      tags: ["Next.js", "React", "TypeScript", "C# .NET", "Java", "Python"],
      gradient: "from-primary-cyan to-blue-600",
      textColor: "text-primary-cyan",
      borderColor: "border-primary-cyan/20 hover:border-primary-cyan/50",
    },
    {
      title: isEnglish ? "Systems & Support" : "Soporte y Sistemas",
      subtitle: "SYS // NET",
      icon: <FaServer />,
      tags: ["Redes", "Windows OS", "Seguridad", "Hardware & SW", "Monitoreo"],
      gradient: "from-accent-amber to-orange-600",
      textColor: "text-accent-amber",
      borderColor: "border-accent-amber/20 hover:border-accent-amber/50",
    },
    {
      title: isEnglish ? "Data & Cloud" : "Bases de Datos & Cloud",
      subtitle: "DB // CLOUD",
      icon: <FaDatabase />,
      tags: ["SQL Server", "MySQL", "Azure Cloud", "Supabase", "Inventario TI"],
      gradient: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/20 hover:border-emerald-500/50",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 w-full py-4 group">
      {cards.map((card, idx) => (
        <Card key={idx} {...card} />
      ))}
    </div>
  );
}
