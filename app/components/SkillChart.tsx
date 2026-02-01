"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

const data = [
    { subject: "Frontend", A: 120, fullMark: 150 },
    { subject: "Backend", A: 98, fullMark: 150 },
    { subject: "Base de Datos", A: 86, fullMark: 150 },
    { subject: "Diseño UI", A: 99, fullMark: 150 },
    { subject: "Herramientas", A: 85, fullMark: 150 },
    { subject: "Lógica", A: 110, fullMark: 150 },
];

export default function SkillChart() {
    return (
        <div className="w-full h-[350px] md:h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    cx="50%"
                    cy="40%"
                    outerRadius="65%"
                    data={data}
                    margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                >
                    {/* Malla de fondo más sutil */}
                    <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />

                    {/* Textos: Color blanco y fuente un poco más pequeña para que encajen */}
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#e2e8f0", fontSize: 13, fontWeight: "600" }}
                    />

                    <Radar
                        name="Mis Habilidades"
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.2}

                        dot={{
                            r: 6,
                            fill: "white",
                            stroke: "#10b981",
                            strokeWidth: 2
                        }}

                        activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}