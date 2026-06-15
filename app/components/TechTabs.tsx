"use client";
import { useState } from "react";
import { 
  SiSharp, SiPython, SiPhp, SiHtml5, SiCss3, SiJavascript, SiMysql, 
  SiGit, SiGithub, SiFigma 
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";
import { FaJava, FaWindows, FaNetworkWired, FaShieldAlt, FaClipboardList, FaTools, FaChartBar, FaMicrosoft } from "react-icons/fa";

interface TechTabsProps {
  isEnglish: boolean;
}

export default function TechTabs({ isEnglish }: TechTabsProps) {
  const allSkills = [
    // Soporte y Sistemas
    { name: isEnglish ? "Tech Support" : "Soporte Técnico", category: "Soporte y Sistemas", categoryEn: "Support & Systems", icon: <FaTools className="text-primary-cyan" /> },
    { name: "Windows OS", category: "Soporte y Sistemas", categoryEn: "Support & Systems", icon: <FaWindows className="text-[#0078D6]" /> },
    { name: isEnglish ? "Networks & Connectivity" : "Redes & Conectividad", category: "Soporte y Sistemas", categoryEn: "Support & Systems", icon: <FaNetworkWired className="text-emerald-400" /> },
    { name: isEnglish ? "Security & Patches" : "Seguridad & Parches", category: "Soporte y Sistemas", categoryEn: "Support & Systems", icon: <FaShieldAlt className="text-red-400" /> },

    // Herramientas y Gestión
    { name: "Microsoft 365", category: "Gestión y Herramientas", categoryEn: "Management & Tools", icon: <FaMicrosoft className="text-[#F25F22]" /> },
    { name: "Power BI", category: "Gestión y Herramientas", categoryEn: "Management & Tools", icon: <FaChartBar className="text-[#F2C811]" /> },
    { name: isEnglish ? "IT Inventories" : "Inventarios TI", category: "Gestión y Herramientas", categoryEn: "Management & Tools", icon: <FaClipboardList className="text-accent-amber" /> },
    { name: isEnglish ? "Technical Documentation" : "Documentación Técnica", category: "Gestión y Herramientas", categoryEn: "Management & Tools", icon: <FaClipboardList className="text-blue-400" /> },

    // Bases de Datos & Cloud
    { name: "SQL Server", category: "Bases de Datos", categoryEn: "Databases", icon: <DiMsqlServer className="text-red-600" /> },
    { name: "MySQL", category: "Bases de Datos", categoryEn: "Databases", icon: <SiMysql className="text-[#00758F]" /> },
    { name: "Supabase", category: "Bases de Datos", categoryEn: "Databases", icon: <SiMysql className="text-emerald-500" /> },
    { name: isEnglish ? "Azure Cloud" : "Azure Cloud", category: "Bases de Datos", categoryEn: "Databases", icon: <VscAzure className="text-[#0089D6]" /> },

    // Desarrollo & Automatización
    { name: "C# .NET", category: "Desarrollo", categoryEn: "Development", icon: <SiSharp className="text-purple-600" /> },
    { name: "Java", category: "Desarrollo", categoryEn: "Development", icon: <FaJava className="text-red-500" /> },
    { name: "Python", category: "Desarrollo", categoryEn: "Development", icon: <SiPython className="text-yellow-400" /> },
    { name: "JavaScript", category: "Desarrollo", categoryEn: "Development", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "TypeScript", category: "Desarrollo", categoryEn: "Development", icon: <SiJavascript className="text-blue-500" /> },
    { name: "PHP", category: "Desarrollo", categoryEn: "Development", icon: <SiPhp className="text-indigo-400" /> },
    { name: "HTML5 & CSS3", category: "Desarrollo", categoryEn: "Development", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "Git & GitHub", category: "Desarrollo", categoryEn: "Development", icon: <SiGithub className="text-text-title" /> },
  ];

  const [activeTab, setActiveTab] = useState("Todos");

  const tabs = isEnglish
    ? ["All", "Support & Systems", "Management & Tools", "Databases", "Development"]
    : ["Todos", "Soporte y Sistemas", "Gestión y Herramientas", "Bases de Datos", "Desarrollo"];

  // Mapping to filter keys
  const getFilterKey = (tabName: string) => {
    if (tabName === "Todos" || tabName === "All") return "Todos";
    if (tabName === "Soporte y Sistemas" || tabName === "Support & Systems") return "Soporte y Sistemas";
    if (tabName === "Gestión y Herramientas" || tabName === "Management & Tools") return "Gestión y Herramientas";
    if (tabName === "Bases de Datos" || tabName === "Databases") return "Bases de Datos";
    if (tabName === "Desarrollo" || tabName === "Development") return "Desarrollo";
    return "Todos";
  };

  const activeFilterKey = getFilterKey(activeTab);

  const filteredSkills = activeFilterKey === "Todos"
    ? allSkills
    : allSkills.filter(skill => skill.category === activeFilterKey);

  return (
    <div className="w-full">
      {/* Botones de las pestañas */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
              activeTab === tab
                ? "bg-dark-surface border-primary-cyan text-primary-cyan shadow-[0_0_12px_rgba(0,229,255,0.15)] scale-105"
                : "bg-dark-surface/60 border-dark-border text-text-muted hover:border-primary-cyan hover:text-text-title"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3.5 p-4 bg-dark-surface/60 border border-dark-border rounded-xl hover:border-primary-cyan/40 hover:bg-dark-surface/80 transition-all group duration-300"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <div>
              <h4 className="text-text-title font-bold text-sm tracking-tight">{skill.name}</h4>
              <span className="text-text-muted/70 text-[10px] font-mono uppercase tracking-wider">
                {isEnglish ? skill.categoryEn : skill.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}