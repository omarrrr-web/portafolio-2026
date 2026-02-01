"use client";
import { useState } from "react";
import { SiSharp, SiPython, SiPhp, SiHtml5, SiCss3, SiJavascript, SiMysql, SiGit, SiGithub, SiFigma } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from "react-icons/fa";

// Definimos tus habilidades reales del CV
const allSkills = [
    // Backend
    { name: "C# .NET", category: "Backend", icon: <SiSharp className="text-purple-500" /> },
    { name: "Java", category: "Backend", icon: <FaJava className="text-red-500" /> },
    { name: "Python", category: "Backend", icon: <SiPython className="text-yellow-400" /> },
    { name: "PHP", category: "Backend", icon: <SiPhp className="text-indigo-400" /> },

    // Frontend
    { name: "JavaScript", category: "Frontend", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "HTML5", category: "Frontend", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS3", category: "Frontend", icon: <SiCss3 className="text-blue-500" /> },
    { name: "Figma", category: "Frontend", icon: <SiFigma className="text-pink-500" /> },

    // Base de Datos & Cloud
    { name: "SQL Server", category: "Database", icon: <DiMsqlServer className="text-red-600" /> },
    { name: "MySQL", category: "Database", icon: <SiMysql className="text-blue-400" /> },
    { name: "Azure", category: "Database", icon: <VscAzure className="text-blue-500" /> },
    // Herramientas
    { name: "Git", category: "Herramientas", icon: <SiGit className="text-orange-600" /> },
    { name: "GitHub", category: "Herramientas", icon: <SiGithub className="text-white" /> },
];

export default function TechTabs() {
    const [activeTab, setActiveTab] = useState("Todos");

    // Filtramos las habilidades según la pestaña activa
    const filteredSkills = activeTab === "Todos"
        ? allSkills
        : allSkills.filter(skill => skill.category === activeTab);

    const tabs = ["Todos", "Backend", "Frontend", "Database", "Herramientas"];

    return (
        <div className="w-full">
            {/* Botones de las pestañas */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {tabs.map((tab) => (
                    <button
                        
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
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
                        className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/50 hover:bg-slate-800 transition-all group animate-fadeIn"
                    >
                        <div className="text-2xl group-hover:scale-110 transition-transform">
                            {skill.icon}
                        </div>
                        <div>
                            <h4 className="text-slate-200 font-medium text-sm">{skill.name}</h4>
                            <span className="text-slate-500 text-xs">{skill.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}