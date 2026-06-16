"use client";

import { memo } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

interface SkillChartProps {
    isEnglish: boolean;
}

const SkillChart = memo(function SkillChart({ isEnglish }: SkillChartProps) {
    const data = [
        { subject: isEnglish ? "Development" : "Desarrollo", A: 125, fullMark: 150 },
        { subject: isEnglish ? "Tech Support" : "Soporte Técnico", A: 115, fullMark: 150 },
        { subject: isEnglish ? "Databases" : "Bases de Datos", A: 105, fullMark: 150 },
        { subject: isEnglish ? "Cloud (Azure)" : "Cloud (Azure)", A: 85, fullMark: 150 },
        { subject: isEnglish ? "Network & Security" : "Redes & Seguridad", A: 90, fullMark: 150 },
        { subject: isEnglish ? "Logistics & Inv" : "Gestión & Inventarios", A: 100, fullMark: 150 },
    ];

    return (
        <div className="w-full h-[320px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    data={data}
                >
                    {/* Malla de fondo más sutil */}
                    <PolarGrid stroke="rgba(27, 36, 49, 0.6)" />

                    {/* Textos: Color blanco y fuente un poco más pequeña para que encajen */}
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: "600", fontFamily: "var(--font-space-grotesk)" }}
                    />

                    <Radar
                        name={isEnglish ? "My Skills" : "Mis Habilidades"}
                        dataKey="A"
                        stroke="#00E5FF"
                        strokeWidth={2}
                        fill="#00E5FF"
                        fillOpacity={0.15}

                        dot={{
                            r: 4,
                            fill: "#FF9E00",
                            stroke: "#00E5FF",
                            strokeWidth: 1.5
                        }}

                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
});

export default SkillChart;