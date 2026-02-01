"use client";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";

const experiences = [
    {
        company: "Vasco Technologies",
        role: "Practicante de TI",
        period: "Agosto 2025 - Diciembre 2025",
        description: "Planteamiento de soluciones informáticas y desarrollo de publicidad con IA para redes sociales.",
        color: "border-purple-500"
    },
    {
        company: "Jhardsystex",
        role: "Practicante de Desarrollo",
        period: "Feb 2025 - Junio 2025",
        description: "Diseño de interfaces web y creación de sistemas internos. Apoyo en análisis de requerimientos.",
        color: "border-blue-500"
    },
];
export default function ExperienceTimeline() {
    return (
        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12 py-4">
            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* PUNTO EN LA LÍNEA DE TIEMPO */}
                    <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 bg-slate-950 ${exp.color} shadow-[0_0_10px_currentColor]`} style={{ color: exp.color.replace('border-', 'text-') }}></div>

                    {/* TARJETA DE EXPERIENCIA */}
                    <div className={`bg-slate-900/50 p-6 rounded-2xl border ${exp.color} border-opacity-30 hover:border-opacity-100 transition-all hover:bg-slate-800/50 group`}>
                        <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                            <FaBriefcase className="text-slate-500 group-hover:text-white transition-colors" />
                            {exp.role}
                        </h4>
                        <h5 className="text-lg text-blue-400 font-semibold mb-2">{exp.company}</h5>

                        <span className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-4 bg-slate-950/50 w-fit px-3 py-1 rounded-full border border-slate-800">
                            <FaCalendarAlt /> {exp.period}
                        </span>

                        <p className="text-slate-400 text-sm leading-relaxed">
                            {exp.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}