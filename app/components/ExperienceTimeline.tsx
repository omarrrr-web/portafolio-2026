"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";

interface ExperienceTimelineProps {
    isEnglish: boolean;
}

const ExperienceTimeline = memo(function ExperienceTimeline({ isEnglish }: ExperienceTimelineProps) {
    const experiences = [
        {
            company: "Vasco Technologies",
            role: isEnglish ? "IT Intern" : "Practicante de TI",
            period: isEnglish ? "August 2025 - December 2025" : "Agosto 2025 - Diciembre 2025",
            achievements: isEnglish ? [
                "Analyzed and proposed viable computer solutions to mitigate internal company incidents.",
                "Assisted in monitoring digital tools and implementing AI-based technology solutions."
            ] : [
                "Análisis y planteamiento de soluciones informáticas viables para mitigar incidencias internas de la empresa.",
                "Apoyo en el monitoreo de herramientas digitales e implementación de soluciones tecnológicas basadas en IA."
            ],
            color: "border-primary-cyan",
            textColor: "text-primary-cyan"
        },
        {
            company: "Jhardsystex",
            role: isEnglish ? "Development Intern" : "Practicante de Desarrollo",
            period: isEnglish ? "February 2025 - June 2025" : "Febrero 2025 - Junio 2025",
            achievements: isEnglish ? [
                "Designed and developed web interfaces and created internal systems in various programming languages.",
                "Assisted in analyzing and documenting software requirements."
            ] : [
                "Diseño y desarrollo de interfaces web y creación de sistemas internos en diversos lenguajes de programación.",
                "Apoyo en el análisis y documentación de requerimientos de software."
            ],
            color: "border-[#8A2BE2]", // Purple
            textColor: "text-[#8A2BE2]"
        },
        {
            company: "Compañía Food Retail S.A.C",
            role: isEnglish ? "Inventory & Services Assistant" : "Auxiliar de Inventarios / Servicios",
            period: isEnglish ? "July 2023 - March 2025" : "Julio 2023 - Marzo 2025",
            achievements: isEnglish ? [
                "Control, physical counting, and reconciliation of IT inventories under strict schedules, analyzing hardware asset discrepancies.",
                "Direct support and communication with users and suppliers, ensuring resolution of daily requirements."
            ] : [
                "Control, conteo físico y conciliación de inventarios de TI bajo cronogramas estrictos, analizando desviaciones de activos de hardware.",
                "Soporte y comunicación directa con usuarios y proveedores para resolver requerimientos cotidianos."
            ],
            color: "border-accent-amber",
            textColor: "text-accent-amber"
        }
    ];

    return (
        <div className="relative border-l-2 border-dark-border ml-3 md:ml-6 space-y-10 py-4">
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="relative pl-8 md:pl-10"
                >
                    {/* PUNTO DE TIMELINE */}
                    <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 bg-dark-bg ${exp.color} shadow-[0_0_8px_currentColor]`} style={{ color: exp.textColor === "text-primary-cyan" ? "#00E5FF" : exp.textColor === "text-accent-amber" ? "#FF9E00" : "#8A2BE2" }}></div>

                    {/* TARJETA */}
                    <div className={`bg-dark-surface/60 p-6 rounded-2xl border ${exp.color} border-opacity-20 hover:border-opacity-60 transition-all hover:bg-dark-surface/80 group`}>
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <div>
                                <h4 className="text-lg font-bold text-text-title flex items-center gap-2 font-display">
                                    <FaBriefcase className="text-text-muted group-hover:text-primary-cyan transition-colors text-sm" />
                                    {exp.role}
                                </h4>
                                <h5 className={`text-md font-semibold ${exp.textColor}`}>{exp.company}</h5>
                            </div>
                            <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono bg-dark-bg/80 px-2.5 py-1 rounded-full border border-dark-border">
                                <FaCalendarAlt /> {exp.period}
                            </span>
                        </div>

                        <ul className="text-text-muted text-sm leading-relaxed space-y-2 list-disc list-inside mt-4">
                            {exp.achievements.map((item, idx) => (
                                <li key={idx} className="marker:text-text-muted/40">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>
    );
});

export default ExperienceTimeline;