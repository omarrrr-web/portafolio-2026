"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTerminal, FaPlay, FaWhatsapp, FaGithub, FaFilePdf, FaWindowMinimize, FaWindowMaximize, FaTimes } from "react-icons/fa";
import { SiTypescript, SiReact, SiMysql, SiGit } from "react-icons/si";

interface LogLine {
  text: string;
  type: "input" | "system" | "success" | "warning";
  timestamp: string;
}

export default function TerminalHero() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "systemctl start omar-profile.service", type: "input", timestamp: "15:40:02" },
    { text: "Servicio inicializado con éxito. Omar Augusto Enríquez Señas ONLINE.", type: "success", timestamp: "15:40:03" },
    { text: "Escribe o haz clic en un comando para iniciar diagnóstico.", type: "system", timestamp: "15:40:03" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    { cmd: "help", desc: "Listar comandos disponibles" },
    { cmd: "diagnostico", desc: "Escanear perfil y aptitudes" },
    { cmd: "experiencia", desc: "Listar trayectoria laboral" },
    { cmd: "contacto", desc: "Ver canales de comunicación" },
    { cmd: "clear", desc: "Limpiar consola" }
  ];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString("es-PE", { hour12: false });
    
    let response: LogLine[] = [];

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    response.push({ text: `omar-cli:~$ ${cmd}`, type: "input", timestamp });

    switch (cleanCmd) {
      case "help":
        response.push({ text: "Comandos disponibles en el sistema:", type: "system", timestamp });
        availableCommands.forEach(c => {
          response.push({ text: `  ${c.cmd.padEnd(14)} - ${c.desc}`, type: "system", timestamp });
        });
        break;
      case "diagnostico":
        response.push({ text: "[RUNNING] Escaneo de competencias...", type: "system", timestamp });
        response.push({ text: "✔ [Desarrollo]: C#, .NET, Java, Python, TypeScript, React, Next.js, PHP", type: "success", timestamp });
        response.push({ text: "✔ [Infraestructura]: Redes, soporte técnico integral, Windows OS, seguridad", type: "success", timestamp });
        response.push({ text: "✔ [Bases de Datos]: SQL Server, MySQL, Supabase, Azure Cloud", type: "success", timestamp });
        response.push({ text: "✔ [Inventarios]: Manejo y conciliación de activos TI en Food Retail S.A.C.", type: "success", timestamp });
        response.push({ text: "Aptitudes del Sistema: Aprendizaje Ágil, Proactivo, Adaptable, Colaborador.", type: "warning", timestamp });
        break;
      case "experiencia":
        response.push({ text: "[LOGS] Consultando historial laboral...", type: "system", timestamp });
        response.push({ text: "• Vasco Technologies (Practicante TI) [Ago 2025 - Dic 2025]: Mitigación de incidencias internas, herramientas IA.", type: "success", timestamp });
        response.push({ text: "• Jhardsystex (Practicante Desarrollo) [Feb 2025 - Jun 2025]: Diseño de interfaces y sistemas internos.", type: "success", timestamp });
        response.push({ text: "• Cía Food Retail S.A.C (Auxiliar de Inventarios TI) [Jul 2023 - Mar 2025]: Control de activos y soporte.", type: "success", timestamp });
        break;
      case "contacto":
        response.push({ text: "Canales de comunicación activos:", type: "system", timestamp });
        response.push({ text: "  Email: enriquezomar22@outlook.es", type: "success", timestamp });
        response.push({ text: "  WhatsApp: +51 984 932 392", type: "success", timestamp });
        response.push({ text: "  LinkedIn: omar-enriquez-320542241", type: "success", timestamp });
        break;
      default:
        response.push({ text: `Comando no reconocido: "${cmd}". Escribe 'help' para ver los comandos.`, type: "warning", timestamp });
        break;
    }

    setHistory(prev => [...prev, ...response]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue) {
      executeCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-dark-surface/90 rounded-2xl border border-dark-border shadow-2xl overflow-hidden font-mono text-sm backdrop-blur-md">
      {/* Barra superior de ventana de terminal */}
      <div className="bg-dark-surface border-b border-dark-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaTerminal className="text-primary-cyan text-sm" />
          <span className="text-text-muted font-bold text-xs select-none">infra-diagnose-v1.0.sh</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-dark-border flex items-center justify-center hover:bg-dark-surface cursor-pointer">
            <FaWindowMinimize className="text-[6px] text-text-muted" />
          </div>
          <div className="w-3 h-3 rounded-full bg-dark-border flex items-center justify-center hover:bg-dark-surface cursor-pointer">
            <FaWindowMaximize className="text-[6px] text-text-muted" />
          </div>
          <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center cursor-pointer group">
            <FaTimes className="text-[6px] text-transparent group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Pantalla de Terminal */}
      <div className="p-4 h-80 overflow-y-auto space-y-2 select-text scrollbar-thin scrollbar-thumb-dark-border">
        <AnimatePresence>
          {history.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-start gap-2 leading-relaxed"
            >
              <span className="text-text-muted/50 text-xs mt-0.5 select-none">{line.timestamp}</span>
              {line.type === "input" ? (
                <span className="text-primary-cyan font-semibold">{line.text}</span>
              ) : line.type === "success" ? (
                <span className="text-emerald-500 font-medium">{line.text}</span>
              ) : line.type === "warning" ? (
                <span className="text-accent-amber font-medium">{line.text}</span>
              ) : (
                <span className="text-text-title">{line.text}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={terminalEndRef} />
      </div>

      {/* Panel de comandos rápidos */}
      <div className="bg-dark-surface/80 border-t border-dark-border p-3 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {availableCommands.map(c => (
            <button
              key={c.cmd}
              onClick={() => executeCommand(c.cmd)}
              className="cursor-pointer px-2.5 py-1 rounded bg-dark-bg hover:bg-dark-surface border border-dark-border hover:border-primary-cyan/40 text-xs text-text-muted hover:text-text-title transition-all font-mono"
            >
              .{c.cmd}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-text-muted/60 hidden sm:block">Status: READY</span>
      </div>

      {/* Input de Comandos */}
      <div className="bg-dark-bg p-3 flex items-center gap-2 border-t border-dark-border">
        <span className="text-primary-cyan font-bold select-none">omar-cli:~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe 'help' o haz clic arriba..."
          className="flex-1 bg-transparent border-none outline-none text-text-title placeholder-text-muted/40 font-mono text-sm focus:ring-0 focus:outline-none"
        />
        <button
          onClick={() => {
            if (inputValue) {
              executeCommand(inputValue);
              setInputValue("");
            }
          }}
          className="cursor-pointer p-2 bg-dark-border hover:bg-primary-cyan/10 hover:text-primary-cyan text-text-muted rounded-lg transition-colors"
        >
          <FaPlay className="text-xs" />
        </button>
      </div>
    </div>
  );
}
